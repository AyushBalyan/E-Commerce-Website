import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SneakerCarousel.css';
import Pic1 from '/Users/lkbalyan/Desktop/UNDS Website/nike-shoe-store/src/assets/carouslePics/ADIDASYEEZYBOOST350V2BONE_2dcc6331-a75b-4eab-8c85-b73c384e999d copy.png';
import Pic2 from '/Users/lkbalyan/Desktop/UNDS Website/nike-shoe-store/src/assets/carouslePics/AdidaSamba copy.png';
import Pic3 from '/Users/lkbalyan/Desktop/UNDS Website/nike-shoe-store/src/assets/carouslePics/Jordan1RetroLow copy.png';
import Pic4 from '/Users/lkbalyan/Desktop/UNDS Website/nike-shoe-store/src/assets/carouslePics/AdidasYeez350 copy.png';
import Pic5 from '/Users/lkbalyan/Desktop/UNDS Website/nike-shoe-store/src/assets/carouslePics/Jordan1LowWolf copy.png';
import Pic6 from '/Users/lkbalyan/Desktop/UNDS Website/nike-shoe-store/src/assets/carouslePics/AdidasSambaOG copy.png';

const sneakers = [
  {
    id: 1,
    name: "ADIDAS YEEZY BOOST 350 V2 BONE",
    price: "From ₹18,000.00",
    image: Pic1,
    brand: "Adidas"
  },
  {
    id: 2,
    name: "ADIDAS SAMBA OG MAROON GOLD METALLIC (W)",
    price: "₹10,000.00",
    image: Pic2,
    brand: "Adidas"
  },
  {
    id: 3,
    name: "JORDAN 1 RETRO LOW OG MOCHA",
    price: "From ₹17,000.00",
    image: Pic3,
    brand: "Nike"
  },
  {
    id: 4,
    name: "ADIDAS YEEZY 350 V2 CARBON BELUGA",
    price: "From ₹13,500.00",
    image: Pic4,
    brand: "Adidas"
  },
  {
    id: 5,
    name: "JORDAN 1 LOW WOLF GREY MIDNIGHT NAVY",
    price: "From ₹11,000.00",
    image: Pic5,
    brand: "Nike"
  },
  {
    id: 6,
    name: "ADIDAS SAMBA OG CLOUD WHITE CORE BLACK",
    price: "From ₹8,500.00",
    image: Pic6,
    brand: "Adidas"
  }
];

const SneakerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const scrollAmount = index * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(currentIndex + 1, sneakers.length - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <div className="sneaker-carousel">
      <div className="carousel-inner-container">
        <h2 className="carousel-title">SNEAKERS</h2>
        <div className="carousel-container">
          <div ref={carouselRef} className="carousel">
            {sneakers.map((sneaker) => (
              <Link to={`/product/${sneaker.id}`} key={sneaker.id} className="sneaker-link">
                <div className="carousel-item">
                  <div className="sneaker-card">
                    <img 
                      src={sneaker.image} 
                      alt={sneaker.name} 
                      className="sneaker-image"
                    />
                    <div className="sneaker-info">
                      <h3 className="sneaker-name">{sneaker.name}</h3>
                      <p className="sneaker-price">{sneaker.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <button 
            onClick={handlePrev}
            className="nav-button prev"
            aria-label="Previous sneaker"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            className="nav-button next"
            aria-label="Next sneaker"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="view-all-container">
          <Link to="/view-all">
            <button className="nike-button">VIEW ALL</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SneakerCarousel;