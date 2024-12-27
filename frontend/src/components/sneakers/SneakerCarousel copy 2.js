import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './SneakerCarousel.css';

const SneakerCarousel = () => {
  const [sneakers, setSneakers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5432/api/sneakers');
        setSneakers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch sneakers');
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []);

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

  if (loading) {
    return <div>Loading sneakers...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                      src={sneaker.image_url_1} 
                      alt={sneaker.name} 
                      className="sneaker-image"
                    />
                    <div className="sneaker-info">
                      <h3 className="sneaker-name">{sneaker.name}</h3>
                      <p className="sneaker-price">From ₹{sneaker.min_price.toLocaleString()}</p>
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
            <button className="view-button">VIEW ALL</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SneakerCarousel;