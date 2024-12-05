import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Dashboard from './Dashboard/dashboard';
import Travel from './Travel/travel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/travel" element={<Travel />} />
      </Routes>
    </Router>
  );
}

export default App;
