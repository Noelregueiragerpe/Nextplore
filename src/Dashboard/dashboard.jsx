import React, { useState, useEffect } from "react";
import "./dashboard.css";
import logo from "../icons/logo.png";
import spainFlag from "../icons/spain.png";
import trophy from "../icons/trophy.png";
import settings from "../icons/settings.png";
import shirt from "../icons/shirt.png";
import place1 from "../places/place1.jpg";
import place2 from "../places/place2.jpg";
import place3 from "../places/place3.jpg";
import place4 from "../places/place4.jpg";
import avatar from "../avatar/avatar.png";
import suit1 from "../avatar/avatar_ninja.png";
import suit2 from "../avatar/avatar_ironman.png";
import suit3 from "../avatar/avatar_lotr.png";
import HelpButton from "../components/HelpButton/HelpButton";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [currentSuitIndex, setCurrentSuitIndex] = useState(0);
  const suits = [avatar, suit1, suit2, suit3];
  const [selectedSuit, setSelectedSuit] = useState(avatar);
  const [nombreUsuario, setNombreUsuario] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Leer el índice guardado en localStorage
    const savedSuitIndex = localStorage.getItem("selectedSuitIndex");
    if (savedSuitIndex !== null) {
      const index = parseInt(savedSuitIndex, 10);
      setCurrentSuitIndex(index);
      setSelectedSuit(suits[index]);
    }
  }, []);

  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    if (nombreGuardado) {
      setNombreUsuario(nombreGuardado);
    }
  });

  const openAvatarModal = () => setIsAvatarModalOpen(true);
  const closeAvatarModal = () => setIsAvatarModalOpen(false);

  const handleNextSuit = () => {
    setCurrentSuitIndex((prevIndex) => (prevIndex + 1) % suits.length);
  };

  const handlePreviousSuit = () => {
    setCurrentSuitIndex(
      (prevIndex) => (prevIndex - 1 + suits.length) % suits.length
    );
  };

  const handleSelectSuit = () => {
    const selectedSuitIndex = currentSuitIndex;
    setSelectedSuit(suits[selectedSuitIndex]);
    localStorage.setItem("selectedSuitIndex", selectedSuitIndex); // Guardar en localStorage
    closeAvatarModal();
  };

  const places = [
    { name: "Lugar 1", image: place1 },
    { name: "Lugar 2", image: place2 },
    { name: "Lugar 3", image: place3 },
    { name: "Lugar 4", image: place4 },
  ];

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("../notifications.json");
        if (!response.ok) {
          throw new Error("Error al cargar las notificaciones");
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleClick = (image) => {
    setSelectedImage(image);
  };

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const handleLogin = () => {
    navigate("../travel");
  };

  const handle = () => {
    navigate("../");
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    const idUsuario = localStorage.getItem("idUsuario");

    try {
      const response = await fetch(`http://localhost:8080/api/usuario/logout/${idUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta de la API:", errorText);
        throw new Error("Error al cerrar sesión");
      }
      localStorage.clear(); // Elimina todos los datos de sesión
      navigate("../");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className={`overlay ${isMenuExpanded ? "active" : ""}`}></div>

      <header className="header">
        <div className="header-content">
          <div className="title">Nextplore</div>
          <img src={logo} alt="logo" className="header-image" />
        </div>
      </header>
      <div className="container">
        <div className={`expandable-menu ${isMenuExpanded ? "expanded" : ""}`}>
          <div
            className="menu-toggle"
            onClick={toggleMenu}
            data-testid="menu-toggle"
          >
            {isMenuExpanded ? "⟨" : "⟩"}
          </div>
          <div className="menu-options">
            <button onClick={handleLogin} className="menu-button">
              Iniciar trayecto
            </button>
            <button className="menu-button">Historial de trayectos</button>
            <button className="menu-button">Favoritos</button>
          </div>
        </div>

        <section className="profile">
          <div className="profile-card">
            <img className="avatar" alt="avatar" src={selectedSuit} />
            {isAvatarModalOpen && (
              <div className="modal-overlay" onClick={closeAvatarModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <div style={{ position: "relative" }}>
                    <button
                      className="arrow-button arrow-left"
                      onClick={handlePreviousSuit}
                    >
                      {"<"}
                    </button>
                    <img
                      src={suits[currentSuitIndex]}
                      alt="Avatar seleccionado"
                      className="avatar-preview"
                    />
                    <button
                      className="arrow-button arrow-right"
                      onClick={handleNextSuit}
                    >
                      {">"}
                    </button>
                  </div>
                  <button
                    onClick={handleSelectSuit}
                    className="menu-button"
                    style={{ marginTop: "10px" }}
                  >
                    Seleccionar
                  </button>
                  <button
                    onClick={closeAvatarModal}
                    className="modal-close-button"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}

            <div className="info">
              <p className="info">{nombreUsuario || "NombreUsuario"}</p>
              <p className="info">Nivel 1</p>
              <img src={spainFlag} alt="País" className="country-flag" />
            </div>
          </div>
          <div className="profile-icons">
            <img
              src={shirt}
              alt="clothes"
              className="icon"
              onClick={openAvatarModal}
            />

            <img src={trophy} alt="trophy" className="icon" />
            <img src={settings} alt="settings" className="icon" />
          </div>
        </section>
        <section className="notifications">
          <div className="notifications-container">
            {notifications.map((note) => (
              <div className="notification" key={note.id}>
                {note.message}
                {note.badge && <span className="badge">{note.badge}</span>}
              </div>
            ))}
          </div>
        </section>
        <section className="s">
          <section className="recommendations">
            <h2 className="title">RECOMENDACIÓN DEL MES</h2>
            <div className="recommendation-content">
              <img
                src={selectedImage || place1}
                alt="Lugar recomendado"
                className="recommendation-image"
              />
            </div>
            <div className="recommendation-list">
              {places.map((place, index) => (
                <p
                  className="place"
                  key={index}
                  onClick={() => handleClick(place.image)}
                >
                  {place.name}
                </p>
              ))}
            </div>
          </section>
        </section>
        <div className="help-button-component">
          <HelpButton />
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
