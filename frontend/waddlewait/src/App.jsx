import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StaffLogin from './Screens/Accounts/Login';
import CustomerTableSelection from './Screens/Customer/TableSelection';
import CustomerHomeMenu from './Screens/Customer/HomeMenu';
import StaffForgotPassword from './Screens/Accounts/ForgotPasswordAccount';
import Home from './Screens/Home';
import KitchenMain from './Screens/Kitchen/KitchenMain';
import WaiterMain from './Screens/Waiter/WaiterMain';
import ManagerMain from './Screens/Manager/ManagerMain';
import CreateStaffAccount from './Screens/Accounts/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />

        {/* Staff login/creation */}
        <Route path="/staff/login" element={<StaffLogin/>} />
        <Route path="/staff/forgot-password" element={<StaffForgotPassword/>} />
        <Route path="/staff/create-account" element={<CreateStaffAccount/>} />

        {/* Customer Routes */}
        <Route path="/customer/table-selection" element={<CustomerTableSelection/>} />
        <Route path="/customer/home-menu" element={<CustomerHomeMenu/>} />

        {/* Kitchen Routes */}
        <Route path="/kitchen/main" element={<KitchenMain/>} />

        {/* Waiter Routes */}
        <Route path="/waiter/main" element={<WaiterMain/>} />

        {/* Manager Routes */}
        <Route path="/manager/main" element={<ManagerMain/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
