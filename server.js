require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importa el middleware CORS
const connectDB = require('./src/config/db'); // Asegúrate de que esta ruta sea correcta
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permite solicitudes desde el frontend en localhost:3000
  credentials: true // Si estás utilizando cookies o tokens en encabezados de autorización
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
