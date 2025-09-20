//ensure do not use var that not declare
"use strict";

require("dotenv").config();

const express = require("express");
const app = express();
const cloudinary = require("cloudinary").v2;
const expressHandlebars = require("express-handlebars");
const morgan = require("morgan");
const session = require("express-session");
const models = require("./database/models");
const { specs, swaggerUi } = require("./config/swagger");
const {
  timeExpectation,
  formatDate,
  arrayInclude,
  eq,
} = require("./controllers/handlebarsHelper");
const passport = require("./controllers/passport");
const flash = require("connect-flash");

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));
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
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      timeExpectation,
      formatDate,
      arrayInclude,
      eq,
    },
  })
);

app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    //store: redisStore, // Disabled for development
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 20 * 60 * 1000, //20min
      secure: false, // Set to true in production with HTTPS
    },
  })
);

//passport configuration
app.use(passport.initialize());
app.use(passport.session());

//connect flash configuration
app.use(flash());

//middleware for session
app.use(async (req, res, next) => {
  //console.log("Session ID:", req.session ? req.session.ID : null);
  //console.log("Is Authenticated:", req.isAuthenticated());
  res.locals.isLoggedIn = req.isAuthenticated();
  res.locals.hasnoti = false;
  if (res.locals.isLoggedIn) {
    const ID = req.user ? req.user.id : null;
    if (ID) {
      const notificationExists = await models.Notification.findOne({
        where: { userId: ID, isSeen: false },
      });
      res.locals.hasnoti = !!notificationExists;
    }
  }
  next();
});

// Cloudinary API
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Health check endpoint for development
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    environment: "development",
    timestamp: new Date().toISOString(),
  });
});

// Swagger API documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Thread Mini Website API Documentation (Development)",
  })
);

app.use("/", require("./routes/authRouter"));
app.use("/", require("./routes/indexRouter"));

app.use((req, res, next) => {
  res.status(404).render("error", { message: "FILE NOT FOUND" });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render("error", { message: "Internal Server Error" });
});

//start server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
