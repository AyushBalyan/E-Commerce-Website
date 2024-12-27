import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './SneakerCarousel.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from '../LoadingComponent';

const SneakerCarousel = () => {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const scrollAmount = containerWidth / 3;
      const newScrollPosition = 
        containerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      containerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Update scroll position for button visibility
  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5432/api/sneakers');
        // Limit to maximum 6 sneakers
        setProducts(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch sneakers');
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error: {error}</div>;

  // Calculate if we should show navigation buttons
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current && 
    scrollPosition < (containerRef.current.scrollWidth - containerRef.current.clientWidth);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>SNEAKERS</h2>
      <div className={styles.carouselContainer}>
        {canScrollLeft && (
          <button 
            className={`${styles.navigationButton} ${styles.prevButton}`}
            onClick={() => scroll('left')}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
        )}
        
        <div 
          className={styles.cardContainer} 
          ref={containerRef}
          onScroll={handleScroll}
        >
          {products.map((sneaker) => (
            <Link 
              to={`/product/sneakers/${sneaker.id}`} 
              key={sneaker.id} 
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={sneaker.image_url_1} 
                  alt={sneaker.name} 
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className={styles.productTitle}>{sneaker.name}</h3>
                <p className={styles.price}>From ₹{sneaker.min_price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button 
            className={`${styles.navigationButton} ${styles.nextButton}`}
            onClick={() => scroll('right')}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        )}
      </div>
      <Link to="/view-all-sneakers">
        <button className={styles.viewAllButton}>VIEW ALL</button>
      </Link>
    </div>
  );
};

export default SneakerCarousel;