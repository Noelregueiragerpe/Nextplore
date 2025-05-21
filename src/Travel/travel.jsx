import React, { useState, useRef, useEffect } from "react";
import "./travel.css";
import "./LeafletMap.css";
import logo from "../icons/logo.png";
import locate from "../icons/locate.png";
import search from "../icons/search.png";
import home from "../icons/home.png";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import HelpButton from "../components/HelpButton/HelpButton";
import { Checkbox } from "antd";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Dashboard from "../Dashboard/dashboard";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const Travel = () => {
  const navigate = useNavigate(); // Hook para la navegación

  const handleLogin = () => {
    // Aquí puedes agregar validación de usuario si es necesario
    navigate("../dashboard"); // Redirige a la página de dashboard
  };
  const position = [0.0, -0.0];
  const [locations, setLocations] = useState([]);
  const [visibleLocations, setVisibleLocations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mapStyle, setMapStyle] = useState("voyager");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isUserCentered, setIsUserCentered] = useState(false);
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [lugaresVisitados, setLugaresVisitados] = useState([]);

  useEffect(() => {
    // fetch("../locations.json")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setLocations(data);
    //     if (mapRef.current) {
    //       const bounds = mapRef.current.getBounds();
    //       const visible = data.filter((location) =>
    //         bounds.contains([location.lat, location.lng])
    //       );
    //       setVisibleLocations(visible);
    //     }
    //   })
    //   .catch((error) => console.error("Error cargando el JSON:", error));
    getLocations();
    getLugaresVisitados();
  }, []);

  async function getLocations() {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/lugar", {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los lugares");
      }

      const data = await response.json();
      const formattedLocations = data.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        lat: item.coordenadasx,
        lng: item.coordenadasy,
        imagen: item.imagen,
        pelicula: item.pelicula?.nombre || "Sin título",
      }));

      setLocations(formattedLocations);

      if (mapRef.current) {
        const bounds = mapRef.current.getBounds();
        const visible = formattedLocations.filter((location) =>
          bounds.contains([location.lat, location.lng])
        );
        setVisibleLocations(visible);
      }
    } catch (error) {
      console.error("Error al cargar los lugares desde la API:", error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setVisibleLocations(locations); // Restablece los lugares si no hay búsqueda
    } else {
      const filtered = locations.filter(
        (location) =>
          location.nombre
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          location.pelicula.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setVisibleLocations(filtered); // Solo los lugares que cumplen con la búsqueda
    }
  };

  const closeSearch = () => {
    setIsSearchActive(false); // Cierra la barra de búsqueda
    setSearchQuery(""); // Limpia el término de búsqueda
    setVisibleLocations(locations); // Restaura los lugares visibles
  };

  const MapWatcher = () => {
    const map = useMap();
    const previousBoundsRef = useRef(null);

    useEffect(() => {
      const updateVisibleLocations = () => {
        if (isSearchActive) return; // Si la búsqueda está activa, no actualices las ubicaciones
        const bounds = map.getBounds();
        if (
          !previousBoundsRef.current ||
          !bounds.equals(previousBoundsRef.current)
        ) {
          const visible = locations.filter((location) =>
            bounds.contains([location.lat, location.lng])
          );
          setVisibleLocations(visible);
          previousBoundsRef.current = bounds;
        }
      };

      const handleMapMove = () => {
        if (selectedLocation) {
          setSelectedLocation(null); // Resetea la selección al mover el mapa
        }
        setIsUserCentered(false); // Reactiva los círculos al mover el mapa
      };

      if (map && !mapRef.current) {
        mapRef.current = map;
        updateVisibleLocations();
      }

      map.on("move", updateVisibleLocations);
      map.on("zoomend", () => setZoomLevel(map.getZoom()));
      map.on("moveend", handleMapMove); // Detecta cuando el mapa termina de moverse

      return () => {
        map.off("move", updateVisibleLocations);
        map.off("zoomend", () => setZoomLevel(map.getZoom()));
        map.off("moveend", handleMapMove);
      };
    }, [map]);

    return null;
  };

  const styles = {
    voyager:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    positron:
      "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png",
    street: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };

  const centerMapOnCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current.flyTo([latitude, longitude], 12);
          setIsUserCentered(true); // Desactiva los círculos al centrarse en la ubicación
        },
        (error) => {
          console.error("Error al obtener la ubicación: ", error);
          alert(
            "No se pudo obtener la ubicación. Por favor, verifica los permisos de ubicación en tu navegador."
          );
        }
      );
    } else {
      alert("Geolocalización no es soportada en este navegador.");
    }
  };
  const moveToLocation = (lat, lng, location) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 12);
      setSelectedLocation(location); // Marca el lugar como seleccionado
      setIsUserCentered(true); // Desactiva los círculos al seleccionar un lugar

      // Encuentra el popup del marcador o círculo seleccionado y ábrelo
      const marker = L.marker([lat, lng], { icon: defaultIcon }).bindPopup(
        `<div>
          <strong>${location.nombre}</strong>
          <p>${location.pelicula}</p>
          <img src="/imagenesLugares/${location.imagen}" style="width:100%; height:auto; border-radius:10px;" />
          
        </div>`
      );
      marker.addTo(mapRef.current).openPopup();
    }
  };
  const moveToLocationNoZoom = (lat, lng, location) => {
    if (mapRef.current) {
      // Sólo centramos el mapa si no estamos haciendo clic en un círculo
      setSelectedLocation(location); // Marca el lugar como seleccionado
      setIsUserCentered(true); // Desactiva los círculos al seleccionar un lugar

      // Encuentra el popup del marcador o círculo seleccionado y ábrelo
      const marker = L.marker([lat, lng], { icon: defaultIcon }).bindPopup(
        `<div>
          <strong>${location.nombre}</strong>
          <p>${location.pelicula}</p>
          <img src="/imagenesLugares/${location.imagen}" style="width:100%; height:auto; border-radius:10px;" />
          
        </div>`
      );
      marker.addTo(mapRef.current).openPopup();
    }
  };

  const handleMapStyleChange = (event) => {
    setMapStyle(event.target.value); // Cambia el estilo cuando el usuario seleccione una opción
  };

  // Función para resetear el mapa a las coordenadas 0, 0
  const resetMapToZeroZero = () => {
    if (mapRef.current) {
      mapRef.current.flyTo([0.0, 0.0], 1); // Vuela el mapa a (0,0) con zoom 2
      setIsUserCentered(false); // Reactiva los círculos al resetear el mapa
      setSelectedLocation(null); // Resetea la selección del lugar
    }
  };

  const handleVisitedChange = async (checked, locationId) => {
  const idUsuario = localStorage.getItem("idUsuario");
  const token = localStorage.getItem("token");

  if (checked) {
    // Si está chequeado, crear la relación explorado
    try {
      const response = await fetch("http://localhost:8080/api/explorado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          id: {
            idUsuario: parseInt(idUsuario),
            idLugar: locationId,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Error al marcar como visitado");
      }

      console.log("Lugar marcado como visitado correctamente");
      // Actualiza el estado para reflejar el cambio
      setLugaresVisitados((prev) => [...prev, locationId]);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  } else {
    // Si se desmarca, eliminar la relación
    try {
      const response = await fetch(
        `http://localhost:8080/api/explorado/${idUsuario}/${locationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al desmarcar como visitado");
      }

      console.log("Lugar desmarcado como visitado correctamente");
      // Elimina el ID del estado local
      setLugaresVisitados((prev) =>
        prev.filter((id) => id !== locationId)
      );
    } catch (error) {
      console.error("Error al eliminar la relación explorado:", error);
    }
  }
};


  async function getLugaresVisitados() {
    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");
    try {
      const response = await fetch(
        `http://localhost:8080/api/explorado/usuario/${idUsuario}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener lugares visitados");
      }

      const data = await response.json();
      const ids = data.map(item => item.lugarEntidad.id);
      setLugaresVisitados(ids);
    } catch (error) {
      console.error("Error al cargar lugares visitados:", error);
    }
  }

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="title">Nextplore</div>
          <img src={logo} alt="logo" className="header-image" />
        </div>
      </header>
      <nav className="top-bar">
        <button
          className="nav-button"
          onClick={() => {
            if (isSearchActive) {
              closeSearch(); // Llama a closeSearch cuando se cierre la búsqueda
            } else {
              setIsSearchActive(true); // Abre la barra de búsqueda
            }
          }}
        >
          <img
            className={isSearchActive ? "fas fa-times" : "fas fa-filter"}
            src={search}
            alt="search"
          />
        </button>

        <button className="nav-button" onClick={resetMapToZeroZero}>
          <i className="text">RESET</i>
        </button>
        <button className="nav-button" onClick={centerMapOnCurrentLocation}>
          <img src={locate} alt="locate"></img>
        </button>
        <button className="nav-button" onClick={handleLogin}>
          <img src={home} alt="home"></img>
        </button>
        <select value={mapStyle} onChange={handleMapStyleChange}>
          <option value="voyager">Voyager</option>
          <option value="positron">Positron</option>
          <option value="street">Street</option>
        </select>
      </nav>
      {isSearchActive && (
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery} // El valor del input es controlado por el estado `searchQuery`
            onChange={handleSearchChange}
            placeholder="Buscar por nombre o película..."
            className="search-input"
          />
        </div>
      )}

      <div className="container">
        <div className="map-container">
          <MapContainer
            data-testid="map-container"
            center={position}
            zoom={zoomLevel}
            style={{
              height: "400px",
              width: "auto",
              borderRadius: "15px",
              border: "10px solid #f4a01b",
              overflow: "hidden",
            }}
            maxBounds={[
              [-90, -180],
              [90, 180],
            ]} // Límites geográficos
            maxBoundsViscosity={1.0} // Evita que el mapa rebote al llegar a los límites
          >
            <TileLayer
              url={styles[mapStyle]}
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            <MapWatcher />
            {visibleLocations.map((location, index) =>
              selectedLocation &&
              selectedLocation.nombre === location.nombre ? (
                <Marker
                  key={index}
                  position={[location.lat, location.lng]}
                  icon={defaultIcon}
                  eventHandlers={{
                    click: () =>
                      moveToLocationNoZoom(
                        location.lat,
                        location.lng,
                        location
                      ), // Centra el mapa al hacer clic en el marcador
                  }}
                >
                  <Popup>
                    <div>
                      <strong>{location.nombre}</strong>
                      <p>{location.pelicula}</p>
                      <img
                        src={`/imagenesLugares/${location.imagen}`}
                        alt={location.nombre}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                  </Popup>
                </Marker>
              ) : (
                !selectedLocation &&
                !isUserCentered && // Mostrar círculos solo si no está centrado
                (zoomLevel > 5 ? (
                  <Marker
                    key={index}
                    position={[location.lat, location.lng]}
                    icon={defaultIcon}
                    eventHandlers={{
                      click: () =>
                        moveToLocation(location.lat, location.lng, location),
                    }}
                  >
                    <Popup>
                      <div>
                        <strong>{location.nombre}</strong>
                        <p>{location.pelicula}</p>
                        <img
                          src={`/imagenesLugares/${location.imagen}`}
                          alt={location.nombre}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </Popup>
                  </Marker>
                ) : (
                  <Circle
                    key={index}
                    center={[location.lat, location.lng]}
                    radius={20000}
                    color="blue"
                    fillColor="lightblue"
                    fillOpacity={0.5}
                    eventHandlers={{
                      click: () => {
                        // Al hacer clic en un círculo, solo se abre el popup sin mover el mapa
                        const circlePopup = L.popup()
                          .setLatLng([location.lat, location.lng])
                          .setContent(
                            `<div>
                <strong>${location.nombre}</strong>
                <p>${location.pelicula}</p>
                <img src="/imagenesLugares/${location.imagen}" style="width:100%; height:auto; border-radius:10px;" />
                
              </div>`
                          )
                          .openOn(mapRef.current);
                      },
                    }}
                  >
                    <Popup>
                      <div>
                        <strong>{location.nombre}</strong>
                        <p>{location.pelicula}</p>
                        <img
                          src={`/imagenesLugares/${location.imagen}`}
                          alt={location.nombre}
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </Popup>
                  </Circle>
                ))
              )
            )}
          </MapContainer>
        </div>
        <div className="notifications">
          <h3>Puntos visibles en el mapa:</h3>
          <div className="notifications-container">
            {visibleLocations.length > 0 ? (
              visibleLocations.map((location, index) => (
                <div
                  className="notification"
                  key={index}
                  onClick={() =>
                    moveToLocation(location.lat, location.lng, location)
                  }
                >
                  <strong>{location.nombre}</strong>
                  <p>{location.pelicula}</p>
                  <Checkbox
                    checked={lugaresVisitados.includes(location.id)}
                    onChange={(e) =>
                      handleVisitedChange(e.target.checked, location.id)
                    }
                  >
                    Visitado
                  </Checkbox>
                </div>
              ))
            ) : (
              <p>No hay puntos visibles en este momento.</p>
            )}
          </div>
        </div>
        <div className="help-button-component">
          <HelpButton />
        </div>
      </div>
    </div>
  );
};

export default Travel;
