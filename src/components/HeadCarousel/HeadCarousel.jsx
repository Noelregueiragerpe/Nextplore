import { useEffect, useRef, useState } from "react";
import "./HeadCarousel.css";
import { Carousel } from "antd";

const HeadCarousel = ({ onChange }) => {
  const [savedHead, setSavedHead] = useState(0);
  const [currentHead, setcurrentHead] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(savedHead, false);
    }
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
          <div className="head-carousel-img">
            <img src="/accesories/head1.svg" alt="head1" />
          </div>
          <div className="head-carousel-img">
            <img src="/accesories/head2.svg" alt="head2" />
          </div>
          <div className="head-carousel-img">
            <img src="/accesories/head3.svg" alt="head3" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default HeadCarousel;
