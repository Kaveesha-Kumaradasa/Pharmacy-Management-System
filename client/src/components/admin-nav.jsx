import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard"; 
import Users from "../pages/users";
import SupplierList from "../pages/suppliers";
import OrdersAdmin from "../pages/orders-admin";
import MedicineAdmin from "../pages/medicine-admin";  
import ExpMed from "../pages/notification";
import Reports from "../pages/Reports";




function AdminNav() {
  return (
    <React.Fragment>
      <section>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/medicine-admin" element={<MedicineAdmin />} />
          <Route path="/orders-admin" element={<OrdersAdmin />} />
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/notification" element={<ExpMed />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </section>
    </React.Fragment>
  );
}

export default AdminNav;