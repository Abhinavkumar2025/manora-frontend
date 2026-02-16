import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./Slider.css";

import img1 from "../../assets/images/intro_section_bg_1.png";
import img2 from "../../assets/images/intro_section_bg_2.png";
import img3 from "../../assets/images/intro_section_bg_3.png";
import img4 from "../../assets/images/intro_section_bg_4.png";
import img5 from "../../assets/images/intro_section_bg_5.png";
import img6 from "../../assets/images/intro_section_bg_6.png";

const Slider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [img1, img2, img3, img4, img5, img6];

  // Auto play
  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  // Detect active slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);

    onSelect(); // initial active slide
  }, [emblaApi]);

  return (
    <div className="fade-slider">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {images.map((img, index) => (
            <div
              className={`embla__slide ${selectedIndex === index ? "is-selected" : ""
                }`}
              key={index}
            >
              <img src={img} alt={`slide-${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
