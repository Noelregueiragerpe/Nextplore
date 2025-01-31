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
        <Route path="/documentacion" element={<iframe src="/documentation/html/Manual Ayuda Nextplore.html" width="100%" height="1000px" title="Documentación"></iframe>} />
      </Routes>
    </Router>
  );
}

export default App;
