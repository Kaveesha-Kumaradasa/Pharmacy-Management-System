// App.js
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import AdminPg from './pages/admin-pg';
import CashierPg from './pages/cashier-pg';
import SupplierPg from './pages/supplier-pg';
//import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminPg />} />
        <Route path="/cashier/*" element={<CashierPg />} />
        <Route path="/supplier/*" element={<SupplierPg />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
