import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Register from './Component/Register';
import Dashboard from './Component/Dashboard';
import Customer from './Component/Customer';
import './App.css';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </Router>
  );
};
export default App;