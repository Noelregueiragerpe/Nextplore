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
    // Validación previa: Verifica que los campos no estén vacíos
    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return; // Detener la ejecución si los campos están vacíos
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: email,
          contrasena: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        localStorage.setItem("token", token);
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
        setShowRegister(false); // Cerrar formulario de registro si es exitoso
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setError(""); // Limpiar mensaje de error si la solicitud es exitosa
      } else {
        setError("Error al registrarse. Intenta nuevamente.");
        setSuccess(""); // Limpiar mensaje de éxito si hubo un error
      }
    } catch (error) {
      setError("No se pudo conectar con el servidor.");
      setSuccess(""); // Limpiar mensaje de éxito si hubo un error de conexión
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      showRegister ? handleRegister() : handleLogin();
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
          // Formulario de inicio de sesión
          <div className="login-form">
            <div className="inputs-containers">
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Usuario o email"
                />
              </div>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  onKeyDown={handleKeyDown}
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
          // Formulario de registro
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
                  onKeyDown={handleKeyDown}
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
        <footer className="login-footer">
          <p>
            Nextplore pretende dar al usuario una "gamificación" de las visitas
            a lugares cinematográficos.
          </p>
        </footer>
      </div>

      {/* POPUP DE ÉXITO */}
      {success && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup success-popup">
            <p>{success}</p>
            <button onClick={() => setSuccess("")}>Cerrar</button>
          </div>
        </>
      )}

      {/* POPUP DE ERROR */}
      {error && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup error-popup">
            <p>{error}</p>
            <button onClick={() => setError("")}>Cerrar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
