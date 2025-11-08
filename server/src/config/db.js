const mongoose = require('mongoose');

async function connectDB(uri) {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { dbName: 'zeroghost' });
    console.log(' MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

module.exports = { connectDB };
