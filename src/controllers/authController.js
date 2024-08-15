const User = require('../models/User'); // Asegúrate de que la ruta sea correcta
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error registering user:', error); // Agrega esto para depuración
    res.status(500).send('Error registering user');
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { email: user.email } });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error); // Agrega esto para depuración
    res.status(500).send('Error logging in');
  }
};

// Obtener datos del usuario autenticado
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error); // Agrega esto para depuración
    res.status(500).json({ message: 'Error fetching user' });
  }
};
