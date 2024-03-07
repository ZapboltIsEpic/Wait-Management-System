import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StaffLogin from './Screens/Accounts/Login';
import CustomerTableSelection from './Screens/Customer/TableSelection';
import CustomerHomeMenu from './Screens/Customer/HomeMenu';
import StaffAccountCreation from './Screens/Accounts/CreateAccount';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />

        {/* Staff login/creation */}
        <Route path="/staff/login" element={<StaffLogin/>} />
        <Route path="/staff/creation" elemnt={<StaffAccountCreation/>} />

        {/* Customer Routes */}
        <Route path="/customer/table-selection" element={<CustomerTableSelection/>} />
        <Route path="/customer/home-menu" element={<CustomerHomeMenu/>} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          EditT <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
