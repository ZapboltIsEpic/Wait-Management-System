import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StaffLogin from './Screens/Accounts/Login';
import CustomerHomeMenu from './Screens/Customer/HomeMenu';
import StaffForgotPassword from './Screens/Accounts/ForgotPasswordAccount';
import Home from './Screens/Home';
import KitchenMain from './Screens/Kitchen/KitchenMain';
import WaiterMain from './Screens/Waiter/WaiterMain';
import ManagerMain from './Screens/Manager/ManagerMain';
import CreateStaffAccount from './Screens/Accounts/CreateAccount';
import KitchenOrderRequests from './Screens/Kitchen/KitchenOrderRequests';
import KitchenOrderRequestsCompleted from './Screens/Kitchen/KitchenOrderRequestsCompleted';
import WaiterOrderRequests from './Screens/Waiter/WaiterOrderRequests';
import WaiterAssistanceRequests from './Screens/Waiter/WaiterAssistanceRequests';

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
        <Route path="/customer" element={<CustomerHomeMenu/>} />

        {/* Kitchen Routes */}
        <Route path="/kitchen/main" element={<KitchenMain/>} />
        <Route path="/kitchen/order-requests" element={<KitchenOrderRequests/>} />
        <Route path="/kitchen/completed-requests" element={<KitchenOrderRequestsCompleted/>} />

        {/* Waiter Routes */}
        <Route path="/waiter/main" element={<WaiterMain/>} />
        <Route path="/waiter/order-requests" element={<WaiterOrderRequests/>} />
        <Route path="/waiter/assistance-requests" element={<WaiterAssistanceRequests/>} />

        {/* Manager Routes */}
        <Route path="/manager/main" element={<ManagerMain/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
