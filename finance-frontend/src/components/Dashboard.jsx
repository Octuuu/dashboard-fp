import React, { useEffect, useState } from 'react';
import { getTransactions } from '../services/api';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions when component is mounted
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };
    
    fetchTransactions();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard de Finanzas</h1>
      <div className="transactions">
        <h2>Transacciones</h2>
        {transactions.length === 0 ? (
          <p>No tienes transacciones registradas.</p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <span>{transaction.name}</span>
                <span>{transaction.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
