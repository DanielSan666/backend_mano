const jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'some secret key'; // Reemplaza esto con tu secreto

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
};

module.exports = authMiddleware;
