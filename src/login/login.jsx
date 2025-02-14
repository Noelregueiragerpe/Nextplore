import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../icons/logo.png";
import HelpButton from "../components/HelpButton/HelpButton";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
  });

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }
  
    try {
      const params = new URLSearchParams();
      params.append("correo", email);
      params.append("contrasena", password);
  
      const response = await fetch(
        `http://localhost:8080/api/usuario/login?${params.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombreUsuario", data.nombre);
        localStorage.setItem("idUsuario", data.id);
  
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Hubo un problema al conectar con el servidor.");
    }
  };
  

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        setShowRegister(false);
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setError("");
      } else {
        setError("Error al registrarse. Intenta nuevamente.");
        setSuccess("");
      }
    } catch (error) {
      setError("No se pudo conectar con el servidor.");
      setSuccess("");
    }
  };


  return (
    <div>
      <div className="login-header">
        <div className="login-title">Nextplore</div>
        <img src={logo} alt="logo" className="login-logo" />
      </div>

      <div className="login-container">
        {!showRegister ? (
          <div className="login-form">
            <div className="inputs-containers">
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <button onClick={handleLogin} className="login-button">
              Iniciar sesión
            </button>
            <a href="#" className="forgot-password">
              Olvidé la contraseña
            </a>

            <div className="signup-section">
              <p className="pColor">¿Aún no tienes cuenta de usuario?</p>
              <button
                className="signup-button"
                onClick={() => setShowRegister(true)}
              >
                Regístrate ya
              </button>
            </div>
          </div>
        ) : (
          <div className="register-form">
            <h2>Registro</h2>
            <div className="inputs-containers">
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  value={registerData.nombre}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, nombre: e.target.value })
                  }
                  placeholder="Nombre completo"
                />
              </div>
              <div className="input-container">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  value={registerData.correo}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, correo: e.target.value })
                  }
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  value={registerData.contrasena}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      contrasena: e.target.value,
                    })
                  }
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <button onClick={handleRegister} className="register-button">
              Registrarse
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowRegister(false)}
            >
              Volver
            </button>
          </div>
        )}
        <div className="help-button-component">
          <HelpButton />
        </div>
        <button><a href="/usersReport">INFORME</a></button>
      </div>
    </div>
  );
};

export default Login;
