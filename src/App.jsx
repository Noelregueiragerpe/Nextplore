import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Dashboard from "./Dashboard/dashboard";
import Travel from "../src/Travel/travel";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/travel"
          element={
            <PrivateRoute>
              <Travel />
            </PrivateRoute>
          }
        />
            <Route path="/documentacion" element={<iframe src="/documentation/html/Manual Ayuda Nextplore.html" width="100%" height="1000px" title="Documentación"></iframe>} />
      </Routes>
    </Router>
  );
}

export default App;
