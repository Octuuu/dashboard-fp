const transactionModel = require('../models/transactionModel');

const getFinance = (req, res) => {
  transactionModel.getTransactions((err, transactions) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener transacciones', error: err });
    } else {
      res.status(200).json(transactions);
    }
  });
};

const addTransaction = (req, res) => {
  const { name, amount } = req.body;
  transactionModel.createTransaction(name, amount, (err, transaction) => {
    if (err) {
      res.status(500).json({ message: 'Error al crear transacción', error: err });
    } else {
      res.status(201).json(transaction);
    }
  });
};

module.exports = { getFinance, addTransaction };
