const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB Connection URL
// const mongoURL = MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
})

const db = mongoose.connection;


db.on('connected', () => {
    console.log('Connect to MongoDB Server');
})
db.on('error', (err) => {
    console.log('MongoDB Connection Error', err);
})
db.on('disconnected', () => {
    console.log('MongoDB Disconnected');
})


// Export the dabase  connection
module.exports = db;

