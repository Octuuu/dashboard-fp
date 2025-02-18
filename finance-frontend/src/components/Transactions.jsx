import React, { useState } from 'react';
import { createTransaction } from '../services/api';
import '../styles/forms.css';

const Transactions = ({ fetchTransactions }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTransaction(name, amount);
    fetchTransactions();
    setName('');
    setAmount('');
  };

  return (
    <div className="form-container">
      <h2>Añadir transacción</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la transacción"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Añadir</button>
      </form>
    </div>
  );
};

export default Transactions;
