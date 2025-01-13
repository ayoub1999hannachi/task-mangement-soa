const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('User Service connected to MongoDB');
  } catch (error) {
    console.error('User Service MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

module.exports = connectMongoDB;
