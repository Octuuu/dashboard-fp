const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

const register = (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  userModel.getUserByUsername(username, (err, user) => {
    if (user) {
      return res.status(400).json({ message: 'Usuario ya existe' });
    }

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar usuario' });
      }

      // Almacenar el usuario
      userModel.createUser(username, hashedPassword, (err, newUser) => {
        if (err) {
          return res.status(500).json({ message: 'Error al crear usuario' });
        }
        res.status(201).json({ message: 'Usuario registrado con éxito' });
      });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  userModel.getUserByUsername(username, (err, user) => {
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error al iniciar sesión' });
      }

      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    });
  });
};

module.exports = { register, login };
