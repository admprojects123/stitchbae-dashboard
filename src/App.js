import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 // Adjust the import path as needed
// Adjust the import path as needed

//import LoginPage from './Component/login/login';
import Login from './Component/Login/login';
import Dashboard from './Component/Dashboard/dashboard';
import AddProduct from './Component/employee/AddProduct';
function App() {
  return (
    <Router>

          <Routes>
            {/* <Route path="/userlist" element={<DashboardPage />} /> */}
            <Route path="/" element={<Login />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
           
     
          </Routes>

    </Router>
  );
}

export default App;
