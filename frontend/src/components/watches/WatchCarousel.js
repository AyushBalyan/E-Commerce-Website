import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './WatchCarousel.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from '../LoadingComponent';

const WatchCarousel = () => {
  const containerRef = useRef(null);
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') scroll('left');
      if (e.key === 'ArrowRight') scroll('right');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) scroll('right');
    if (isRightSwipe) scroll('left');

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5432/api/watches');
        // Limit to maximum 6 watches
        setWatches(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch watches');
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <div>Error: {error}</div>;

  // Calculate if we should show navigation buttons
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current && 
    scrollPosition < (containerRef.current.scrollWidth - containerRef.current.clientWidth);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>WATCHES</h2>
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
        >
          {watches.map((watch) => (
            <Link 
              to={`/product/watches/${watch.id}`} 
              key={watch.id}
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <img 
                  src={watch.image_url_1} 
                  alt={watch.name} 
                  className={styles.image}
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className={styles.productTitle}>{watch.name}</h3>
                <p className={styles.price}>From ₹{watch.min_price}</p>
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
      <Link to="/view-all-watches">
        <button className={styles.viewAllButton}>VIEW ALL</button>
      </Link>
    </div>
  );
};

export default WatchCarousel;