const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
    res.send('Welcome to our Hotel.')
})



// Import the Router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// Use the Routes
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
});


// app.listen(PORT, () => {
//     console.log("listening on port 3000");
// })