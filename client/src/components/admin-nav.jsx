import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard"; 
import Users from "../pages/users";
import Suppliers from "../pages/suppliers";
import OrdersAdmin from "../pages/orders-admin";
import MedicineAdmin from "../pages/medicine-admin";  


const AdminNav = () => {
  return (
    <React.Fragment>
      <section>
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicine-admin" element={<MedicineAdmin />} />
        <Route path="/orders-admin" element={<OrdersAdmin />} />
        <Route path="/pages/supplier" element={<Suppliers />} />
        <Route path="/users" element={<Users />} /> 
        </Routes>
      </section>
    </React.Fragment>
  );
};

export default AdminNav;