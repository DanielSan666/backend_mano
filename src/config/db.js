const mongoose = require('mongoose');

// Reemplaza `process.env.MONGO_URI` con tu cadena de conexión directamente
const MONGO_URI = 'mongodb+srv://danielsanchez170298:1234@escuela.swndr.mongodb.net/?retryWrites=true&w=majority&appName=escuela';

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error('MongoDB URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      // Opciones adicionales si es necesario
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
