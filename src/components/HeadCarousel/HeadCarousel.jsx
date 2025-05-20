import { useEffect, useRef, useState } from "react";
import "./HeadCarousel.css";
import { Carousel } from "antd";

const HeadCarousel = ({ onChange }) => {
  const [savedHeadId, setSavedHeadId] = useState(null);
  const [heads, setHeads] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchSavedHead = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("idUsuario");
        const response = await fetch(`http://localhost:8080/api/avatar/${userId}`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Error al obtener avatar");
        const avatar = await response.json();
        setSavedHeadId(avatar.cabeza.id);
      } catch (error) {
        console.error("Error al obtener cabeza del avatar:", error);
      }
    };

    fetchSavedHead();
  }, []);

  useEffect(() => {
    const fetchHeads = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/cabezas", {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Error al obtener las cabezas");

        let data = await response.json();

        if (savedHeadId) {
          const index = data.findIndex((h) => h.id === savedHeadId);
          if (index > 0) {
            const [match] = data.splice(index, 1);
            data.unshift(match);
          }
        }

        setHeads(data);
      } catch (error) {
        console.error("Error al cargar cabezas:", error);
      }
    };

    if (savedHeadId !== null) {
      fetchHeads();
    }
  }, [savedHeadId]);

  useEffect(() => {
    if (carouselRef.current && heads.length > 0) {
      carouselRef.current.goTo(0, false);
    }
  }, [heads]);

  const handleHeadChange = (current) => {
    const selectedHead = heads[current];
    if (selectedHead) {
      onChange(selectedHead.id);
    }
  };

  return (
    <div className="head-wrapper">
      <Carousel
        ref={carouselRef}
        arrows
        dots={false}
        afterChange={handleHeadChange}
        draggable={true}
        speed={200}
      >
        {heads.map((head) => (
          <div
            className="head-carousel-image"
            dangerouslySetInnerHTML={{ __html: head.codigo }}
            key={head.id}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeadCarousel;
