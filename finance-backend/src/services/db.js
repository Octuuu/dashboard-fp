const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta de la base de datos
const dbPath = path.resolve(__dirname, 'database.db');

// Conectar a la base de datos SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
    // Crear las tablas si no existen
    db.run(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount REAL NOT NULL
      );
    `, (err) => {
      if (err) {
        console.error('Error al crear la tabla de transacciones:', err);
      } else {
        console.log('Tabla de transacciones creada o ya existe');
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `, (err) => {
      if (err) {
        console.error('Error al crear la tabla de usuarios:', err);
      } else {
        console.log('Tabla de usuarios creada o ya existe');
      }
    });
  }
});

// Función para obtener las transacciones
const getTransactions = (callback) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Función para crear una transacción
const createTransaction = (name, amount, callback) => {
  const query = 'INSERT INTO transactions (name, amount) VALUES (?, ?)';
  db.run(query, [name, amount], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: this.lastID, name, amount });
    }
  });
};

// Función para crear un usuario
const createUser = (username, password, callback) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(query, [username, password], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { id: this.lastID, username });
    }
  });
};

// Función para obtener un usuario por su nombre de usuario
const getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

module.exports = {
  db,
  getTransactions,
  createTransaction,
  createUser,
  getUserByUsername,
};
