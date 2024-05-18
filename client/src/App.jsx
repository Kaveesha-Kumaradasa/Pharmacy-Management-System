import './App.css';
import Login from './pages/login.jsx';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './pages/register.jsx';
import Dashboard from './pages/dashboard.jsx';
import MedicineAdmin from './pages/medicine-admin.jsx';   
import SupplierList from './pages/suppliers.jsx' ;
import CashierMedTable from './pages/medicine-cashier.jsx';

//import AdminPg from './pages/admin-pg.jsx';
//import React from 'react';
//import CashierPg from './pages/cashier-pg.jsx';
// import SupplierPg from './pages/supplier-pg.jsx';




function App() {
  return ( 

      <BrowserRouter>
    <Routes>       
        <Route exact path="/pages/login" element={<Login />} />
        <Route exact path="/pages/register" element={<Register />} />
        <Route exact path="/pages/dashboard" element={<Dashboard />} />
        <Route exact path="/pages/medicine-admin" element={<MedicineAdmin/>} />
        <Route exact path="/pages/suppliers" element={<SupplierList/>} />
        <Route exact path="/pages/medicine-cashier" element={<CashierMedTable/>} />
  </Routes>

            {/*<React.Fragment>

                <CashierPg />

                <AdminPg />
      
                <SupplierPg />

  </React.Fragment>*/}

        </BrowserRouter>
 




  );
}



export default App;

