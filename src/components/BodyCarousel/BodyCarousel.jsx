import { Carousel } from "antd";
import "./BodyCarousel.css";
import { useEffect, useRef, useState } from "react";

const BodyCarousel = ({ onChange }) => {
  const [savedBodyId, setSavedBodyId] = useState(null);
  const [bodies, setBodies] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchSavedBody = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("idUsuario");
        const response = await fetch(
          `http://localhost:8080/api/avatar/${userId}`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Error al obtener avatar");
        const avatar = await response.json();
        setSavedBodyId(avatar.cuerpo.id);
      } catch (error) {
        console.error("Error al obtener cuerpo del avatar:", error);
      }
    };

    fetchSavedBody();
  }, []);

  useEffect(() => {
    const fetchBodies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/cuerpos", {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los cuerpos");
        }
        let data = await response.json();

        if (savedBodyId) {
          const index = data.findIndex((b) => b.id === savedBodyId);
          if (index > 0) {
            const [match] = data.splice(index, 1);
            data.unshift(match);
          }
        }

        setBodies(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    if (savedBodyId !== null) {
      fetchBodies();
    }
  }, [savedBodyId]);

  useEffect(() => {
    if (carouselRef.current && bodies.length > 0) {
      carouselRef.current.goTo(0, false);
    }
  }, [bodies]);

  const handleBodyChange = (current) => {
    const selectedBody = bodies[current];
    if (selectedBody) {
      onChange(selectedBody.id);
    }
  };

  return (
    <div className="body-wrapper">
      <Carousel
        arrows
        dots={false}
        ref={carouselRef}
        afterChange={handleBodyChange}
        draggable={true}
        speed={200}
      >
        {bodies.map((body) => (
          <div className="body-carousel-img" key={body.id}>
            <img src={`/accesories/${body.nombre}.svg`} alt={body.nombre} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BodyCarousel;
