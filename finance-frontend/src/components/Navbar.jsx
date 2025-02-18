import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/login">Iniciar sesión</Link>
      <Link to="/register">Registrarse</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
};

export default Navbar;
