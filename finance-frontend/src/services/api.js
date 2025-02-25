const API_URL = 'http://localhost:5000';

// Obtener transacciones
export const getTransactions = async () => {
  const response = await fetch(`${API_URL}/transactions`);
  const data = await response.json();
  return data;
};

// Crear una transacción
export const createTransaction = async (name, amount) => {
  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, amount }),
  });
  return await response.json();
};
// Registrar un nuevo usuario
export const registerUser = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};

// Iniciar sesión
export const loginUser = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return await response.json();
};
