import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Verificar si el token existe y tiene el prefijo "Bearer "
  if (!token || !token.startsWith("Bearer ")) {
    return <Navigate to="/" />;
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");

  try {
    const decodedToken = jwtDecode(tokenWithoutBearer); // Decodificamos el token
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos

    if (decodedToken.exp < currentTime) {
      // Si el token ha expirado, lo eliminamos y redirigimos al login
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
    
    return children; // Si el token es válido, renderiza la ruta protegida
  } catch (error) {
    console.error("Error decodificando el token:", error);
    localStorage.removeItem("token"); // Si el token no es válido, lo eliminamos
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
