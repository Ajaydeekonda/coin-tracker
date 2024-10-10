const mongoose = require('mongoose');
require('dotenv').config(); // Import and configure dotenv

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Ensure the app doesn't start if the DB fails
  }
};

module.exports = connectToDatabase;
