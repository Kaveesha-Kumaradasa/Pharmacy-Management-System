import React from "react";
import { Routes, Route } from "react-router-dom";
import SupOrder from "../pages/supplier-orders"; 



const SupplierNav = () => {
  return (
    <React.Fragment>
      <section>
        <Routes>
        <Route path="/supplier-orders" element={<SupOrder />} /> 
        </Routes>
      </section>
    </React.Fragment>
  );
};

export default SupplierNav;