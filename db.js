const mongoose = require('mongoose');
require('dotenv').config();
// Define the MongoDB URL
// const mongoURL = 'mongodb://127.0.0.1:27017/2000';
const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB server');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
