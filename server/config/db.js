const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diwalidhamaka11';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✨ [MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`🪔 [MongoDB] Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    console.warn(`⚠️ Please ensure MongoDB is running at ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diwalidhamaka11'}`);
    // Don't exit immediately in dev mode so API health can still be checked
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
