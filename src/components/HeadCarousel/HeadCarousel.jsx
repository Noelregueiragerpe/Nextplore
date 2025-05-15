import { useEffect, useRef, useState } from "react";
import "./HeadCarousel.css";
import { Carousel } from "antd";

const HeadCarousel = ({ onChange }) => {
  const [savedHead, setSavedHead] = useState(0);
  const [currentHead, setcurrentHead] = useState(0);
  const [heads, setHeads] = useState([]);
  const token = localStorage.getItem("token");
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(savedHead, false);
    }
    const fetchHeads = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/cabezas", {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las cabezas");
        }
        const data = await response.json();
        setHeads(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchHeads();
  }, []);

  const handleHeadChange = (current) => {
    onChange(current);
  };

  return (
    <>
      <div className="head-wrapper">
        <Carousel
          ref={carouselRef}
          arrows
          dots={false}
          afterChange={handleHeadChange}
          draggable={true}
        >
          {heads.map((head, index) => (
            <div
              className="head-carousel-image"
              dangerouslySetInnerHTML={{ __html: head.codigo }}
              key={index}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HeadCarousel;
