import { Carousel } from "antd";
import "./BodyCarousel.css";
import { useEffect, useRef, useState } from "react";

const BodyCarousel = ({ onChange }) => {
  const [savedBody, setSavedBody] = useState(0);
  const [currentBody, setCurrentBody] = useState(0);
  const [bodies, setBodies] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(savedBody, false);
    }

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
        const data = await response.json();
        setBodies(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchBodies();
  }, []);

  const handleBodyChange = (current) => {
    onChange(current);
  };

  return (
    <>
      <div className="body-wrapper">
        <Carousel
          arrows
          dots={false}
          ref={carouselRef}
          afterChange={handleBodyChange}
          draggable={true}
        >
          {bodies.map((body, index) => (
            <div
              className="body-carousel-img"
              dangerouslySetInnerHTML={{ __html: body.codigo }}
              key={index}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default BodyCarousel;
