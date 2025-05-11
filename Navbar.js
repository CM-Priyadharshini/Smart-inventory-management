import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: 'bold',
  };

  return (
    <div style={navStyle}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Smart Inventory Management</div>
      <div>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/dashboard" style={linkStyle}>Smart StockBoard</Link>
        <Link to="/customer" style={linkStyle}>Transaction Hub</Link>
      </div>
    </div>
  );
};

export default Navbar;
