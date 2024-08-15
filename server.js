const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db'); // Asegúrate de que esta ruta sea correcta
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = 5000; // Puedes definir el puerto directamente aquí si no usas variables de entorno

// Conectar a la base de datos
connectDB();

// Configurar CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
