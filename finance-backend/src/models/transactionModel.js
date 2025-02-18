const db = require('../services/db');

const getTransactions = (callback) => {
  db.all('SELECT * FROM transactions', [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

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

module.exports = { getTransactions, createTransaction };
