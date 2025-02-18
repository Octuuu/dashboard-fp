const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

// Obtener todas las transacciones
router.get('/', financeController.getFinance);

// Crear una nueva transacción
router.post('/', financeController.addTransaction);

module.exports = router;
