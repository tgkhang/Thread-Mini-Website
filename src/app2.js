//ensure do not use var that not declare
"use strict";

require('dotenv').config();

const express = require("express");
const app = express();
const cloudinary = require("cloudinary").v2;
//handlebar
const expressHandlebars = require("express-handlebars");
//port
const port = process.env.PORT || 4000;
//morgan
const morgan = require("morgan");
//session
const session=require('express-session');
const {timeExpectation, formatDate,arrayInclude,eq}= require('./controllers/handlebarsHelper');
const {checkImageExists,extractPublicIdFromUrl} = require('./controllers/image')

//redis
const {RedisStore} = require("connect-redis")
const {createClient}= require('redis');
// let redisClient= createClient({
//     //dotenv
//     //url : process.env.REDIS_URL
//     //internal link for server not run in local hosst any more
//     //url:'redis://red-ctjb25ggph6c738fkohg:6379'

//     //external link for local host
//     //url:'rediss://red-ctjb25ggph6c738fkohg:0H1wNB1TP1C2yBJ7di2bLMfvHzUJJvDl@singapore-redis.render.com:6379'

//     url: process.env.REDIS_URL
// })
// redisClient.connect().catch(console.error)


//passport
const passport = require('./controllers/passport');
const flash = require('connect-flash');


// let redisStore = new RedisStore({
//     client: redisClient,
//     prefix: "myapp:",
//   })


//static folder
app.use(express.static(__dirname +'/public'));
app.use(morgan("combined"));
app.set("views", __dirname + "/resources/views");
//handlebar
app.engine(
    "hbs",
    expressHandlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
        layoutsDir: __dirname + "/resources/views/layouts",
        partialsDir: __dirname + "/resources/views/partials",
        runtimeOptions: {
            allowProtoPropertiesByDefault:true,
        },
        helpers: {
            timeExpectation,
            formatDate,
            arrayInclude,
            eq
        },
    })
);

app.set("view engine", "hbs");

//cau hinh read post data form body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//session

app.use(session({
    secret:'S3cret',
    //secret:process.env.SESSION_SECRET,
    //store: redisStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 20*60 *1000 //20min
    }
}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());

//connect flash configuration
app.use(flash());

//middleware for session
app.use((req, res, next) => {
    console.log("Session ID:", req.session ? req.session.ID : null);
    console.log("Is Authenticated:", req.isAuthenticated());
    res.locals.isLoggedIn = req.isAuthenticated();
    next();
});
// Cloudinary API
cloudinary.config({ 
    cloud_name: 'dlilw5qcv', 
    api_key: '128934476692575', 
    api_secret: 'qQ9MyvKOZDOq-rpK4mwQ_-Sud7c' 
  });

// app.get("/createTable", (req, res) => {
//     let models = require("./database/models");
//     models.sequelize.sync().then(() => {
//         res.send("tables created");
//     });
// });


app.use('/',require('./routes/authRouter')); /// xác thực rồi mới xử lí user router
app.use('/',require('./routes/indexRouter'));
//app.use('/login',require('./routes/loginRouter'))


app.use((req,res,next)=>{
    res.status(404).render('error',{message: 'FILE NOT FOUND'});
})
//
app.use((error,req,res,next)=>{
    console.log(error);
    res.status(500).render('error',{message:'Internal Server Error'});
})



//start server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});

// const path = require("path");
// const { createPagination } = require("express-handlebars-paginate");