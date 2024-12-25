'use strict';

const controller= {};
const passport = require('./passport');
const models= require('../database/models');

controller.show= (req,res) => {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('login',{loginMessage:req.flash('loginMessage'),reqUrl: req.query.reqUrl,registerMessage:req.flash('registerMessage')});    
};
// Login controller function
controller.login = (req, res, next) => {
    // Extracting the 'keepSignedIn' value from the request body
    let keepSignedIn = req.body.keepSignedIn;
    let reqUrl= req.body.reqUrl ? req.body.reqUrl : '/home';
    // Authenticate using the 'local-login' strategy
    passport.authenticate('local-login', (error, user) => {
        // If there is an error during authentication, pass it to the next middleware
        if (error) {
            console.log('Error during login:', error);
            return next(error);
        }

        // If no user is found, redirect to the login page
        if (!user) {
            console.log('No user found');
            //return res.redirect('/login');
            return res.redirect(`/login?reqUrl=${reqUrl}`);
        }

        // Log in the user using req.logIn provided by Passport.js
        req.logIn(user, (error) => {
            // Handle login errors
            if (error) {
                return next(error);
            }
            console.log("hihi"+user.id);

            // Store user ID in the session
            req.session.ID = user.id;

            // Set the session cookie expiration based on 'keepSignedIn'
            req.session.cookie.maxAge = keepSignedIn ? (24 * 60 * 60 * 1000) : null;

            // Redirect the user to their account page after successful login
            //return res.redirect('/home');
            return res.redirect(reqUrl);
        });
    })(req, res, next); // Passing req, res, and next to the authenticate middleware
};
controller.start = (req,res)=>{
    res.render('startPage');
}
controller.logout = (req, res, next) => {
    // Check if a session exists
    if (!req.session) {
        console.log('No session to destroy');
        return res.redirect('/');
    }

    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        console.log('User is not authenticated');
        return res.redirect('/');
    }

    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return next(err);
        }

        // Clear the cookie manually
        res.clearCookie('connect.sid', { path: '/' });

        console.log('User logged out and session destroyed');
        res.redirect('/startPage');
    });
};

//middleware for loggin checking
controller.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect(`/start?reqUrl=${req.originalUrl}`);
}

controller.signup = (req,res) => {
    res.render('signup');
}

controller.tokenRegister = (req, res) => {
    const email = req.query.email;
    const token = req.query.token;
    const userName= req.query.userName;
    const { verify } = require('./jwt');

    console.log("Received token:", token);
    console.log("Received email:", email);

    if (!token) {
        console.error("Token is missing.");
        return res.render('signup', { expired: true, email, token ,userName});
    }

    const isTokenValid = verify(token);
    if (!isTokenValid) {
        console.error("Token is invalid or expired.");
        return res.render('signup', { expired: true, email, token, userName });
    }

    console.log("Token is valid. Rendering reset password page.");
    return res.render('signup', { expired: false, email, token , userName});
}
controller.register = (req, res, next) => {
    let reqUrl = req.body.reqUrl ? req.body.reqUrl : '/';
    passport.authenticate('local-register', (error, user) => {
        if (error) { return next(error); }
        if (!user) { return res.redirect(`/login?reqUrl=${reqUrl}`); }
        req.logIn(user, (error) => {
            if (error) { return next(error); }
            res.redirect(reqUrl);
        });
    })(req, res, next);
};

controller.showForgotPassword = (req, res) => {
    res.render('forgotPassword');
}

controller.forgotPassword = async (req, res) => {
    let email = req.body.email;
    // kiem tra neu email ton tai
    let user = await models.User.findOne({ where: { email } });
    if (user) {
        // Tao link
        const {sign} = require('./jwt');
        const host = req.header('host');
        const resetLink = `${req.protocol}://${host}/reset?token=${sign(email)}&email=${email}`;
        console.log("resetlink"+resetLink);
        // Gui mail
        const {sendForgotPasswordMail} = require('./mail');
        sendForgotPasswordMail(user, host, resetLink)
            .then((result) => {
                console.log('email has been sent');
                return res.render('forgotPassword', { done: true });
            })
            .catch(error =>{
                console.log(error.statusCode);
                return res.render('forgotPassword', { message: 'Error occur , Failed to send email!, check your mail address' });
            })
    } else {
        // nguoc lai, thong bao email ko ton tai
        return res.render('forgotPassword', { message: 'Email does not exist!' });
    }
};


//reset pass
controller.showResetPassword = (req, res) => {
    const email = req.query.email;
    const token = req.query.token;
    const { verify } = require('./jwt');

    console.log("Received token:", token);
    console.log("Received email:", email);

    if (!token) {
        console.error("Token is missing.");
        return res.render('changePassword', { expired: true, email, token });
    }

    const isTokenValid = verify(token);
    if (!isTokenValid) {
        console.error("Token is invalid or expired.");
        return res.render('changePassword', { expired: true, email, token });
    }

    console.log("Token is valid. Rendering reset password page.");
    return res.render('changePassword', { expired: false, email, token });
};


controller.resetPassword= async (req, res) => {
    console.log("In controller, req.body:", req.body); // Debugging
    let email = req.body.email;
    let token = req.body.token;

    if (!email || !token ) {
        console.error("Missing data in req.body:", req.body);
    }

    let bcrypt= require('bcrypt');
    console.log(email);
    let password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

    console.log("Updating user:", { email, password });

    try {
        await models.User.update({ password: password }, { where: { email } });
        return res.render('changePassword', { done: true });
      } catch (err) {
        console.error("Database update failed:", err);
        return res.status(500).send('An error occurred.');
      }
}

controller.showRegisterEmail= (req, res) => {
    res.render('signupEmail');
}
controller.registerEmail= (req, res) => {
    // Tao link
    let email = req.body.email;
    let userName= req.body.username;
    const {sign} = require('./jwt');
    const host = req.header('host');
    const resetLink = `${req.protocol}://${host}/register?token=${sign(email)}&email=${email}&userName=${userName}`;
    console.log("resetlink"+resetLink);
    // Gui mail
    const {sendRegisterMail} = require('./mail');
    sendRegisterMail(userName,email, host, resetLink)
        .then((result) => {
            console.log('email has been sent');
            return res.render('signupEmail', { done: true });
        })
        .catch(error =>{
            console.log(error.statusCode);
            return res.render('signupEmail', { message: 'Error occur , Failed to send email!, check your mail address' });
        })
}

module.exports= controller;