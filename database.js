const mongoose = require('mongoose');
require('dotenv').config(); 
const connectToDatabase = async () => {
  try {
    //use the MONGODB_URI env variable
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas'); // console log if the connection is success.
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Ensure the app doesn't start if the DB fails
  }
};

//export the function to use it in index.js
module.exports = connectToDatabase;
