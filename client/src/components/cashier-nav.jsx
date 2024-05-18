import React from "react";
import { Routes, Route } from "react-router-dom";
import Bill from "../pages/bill"; 
import MedCashier from "../pages/medicine-cashier";

const CashierNav = () => {
  return (
    <React.Fragment>
      <section>
        <Routes>
        <Route path="/bill" element={<Bill />} />
        <Route path="/medicine-cashier" element={<MedCashier />} />
        </Routes>
      </section>
    </React.Fragment>
  );
};

export default CashierNav;