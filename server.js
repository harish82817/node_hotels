const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();

const passport = require('./auth')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}

// to use on all routs
app.use(logRequest);


// Initialize Passport
app.use(passport.initialize());
// Authenticate Passport
const localAuthMiddleware = passport.authenticate('local', {session: false});

// Default Rout
app.get('/', function (req, res) {
    res.send('Hello, Welcome to our Hotel.')
})



// Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// Use the Routes
app.use('/person', localAuthMiddleware ,personRoutes);
app.use('/menu', menuItemRoutes);


app.listen(PORT, () => {
    console.log("listening on port 3000");
})