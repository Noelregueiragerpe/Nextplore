import { Carousel } from "antd";
import "./BodyCarousel.css";
import { useEffect, useRef, useState } from "react";

const BodyCarousel = ({ onChange }) => {
  const [savedBody, setSavedBody] = useState(0);
  const [currentBody, setCurrentBody] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(savedBody, false);
    }
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
          <div className="body-carousel-img">
            <img src="/accesories/body1.svg" alt="body1" />
          </div>
          <div className="body-carousel-img">
            <img src="/accesories/body2.svg" alt="body2" />
          </div>
          <div className="body-carousel-img">
            <img src="/accesories/body3.svg" alt="body3" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default BodyCarousel;
