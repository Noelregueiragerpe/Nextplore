/* eslint-disable jsx-a11y/anchor-is-valid */
// src/components/Login.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección
import "./login.css";
import logo from "../icons/logo.png";
        

const Login = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogin = () => {
    // Aquí puedes agregar validación de usuario si es necesario
    navigate("./dashboard"); // Redirige a la página de dashboard
  };

  return (
    <div>
      <div className="login-header">
        <div className="login-title">Nextplore</div>
        <img src={logo} alt="logo" className="login-logo" />
      </div>
      <div className="login-container">
        <div className="login-form">
          <div className="inputs-containers">
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input type="text" placeholder="Usuario o email" />
            </div>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input type="password" placeholder="Contraseña" />
            </div>
          </div>
          <button onClick={handleLogin} className="login-button">
            {" "}
            {/* Añade onClick para redirigir */}
            Iniciar sesión
          </button>
          <a href="#" className="forgot-password">
            Olvidé la contraseña
          </a>
        </div>
        <div className="signup-section">
          <p className="pColor">¿Aún no tienes cuenta de usuario?</p>
          <button className="signup-button">Regístrate ya</button>
        </div>
        <footer className="login-footer">
          <p>
            Nextplore pretende dar al usuario una "gamificación" de las visitas
            a lugares cinematográficos.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
