import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SneakerCard from '../components/sneakers/SneakerCard';
import ProductCard from '../components/ProductCard';
import './ViewAllSneakers.css';
import LoadingComponent from '../components/LoadingComponent';

const ViewAll = () => {
  const [sneakers, setSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sneakersPerPage] = useState(9);
  const [sortOption, setSortOption] = useState('name');
  const [filterBrand, setFilterBrand] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sneakers from the backend when the component mounts
  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5432/api/sneakers');
        setSneakers(response.data);
        setFilteredSneakers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch sneakers from the server');
        setLoading(false);
      }
    };

    fetchSneakers();
  }, []);

  // Filter and sort sneakers whenever filters or sorting options change
  useEffect(() => {
    let result = [...sneakers];

    // Apply brand filter
    if (filterBrand !== 'All') {
      result = result.filter(sneaker => sneaker.brand === filterBrand);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price_asc') {
        return Math.min(...a.sizes.map(s => s.price)) - Math.min(...b.sizes.map(s => s.price));
      } else {
        return Math.max(...b.sizes.map(s => s.price)) - Math.max(...a.sizes.map(s => s.price));
      }
    });

    setFilteredSneakers(result);
    setCurrentPage(1);
  }, [sneakers, sortOption, filterBrand]);

  const indexOfLastSneaker = currentPage * sneakersPerPage;
  const indexOfFirstSneaker = indexOfLastSneaker - sneakersPerPage;
  const currentSneakers = filteredSneakers.slice(indexOfFirstSneaker, indexOfLastSneaker);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <LoadingComponent /> ;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-all-page">
      <h2 className="view-all-title">OUR SNEAKER COLLECTION</h2>

      <div className="filters">
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className="filter-select sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <select 
          value={filterBrand} 
          onChange={(e) => setFilterBrand(e.target.value)}
          className="filter-select brand-select"
        >
          <option value="All">All Brands</option>
          <option value="Adidas">Adidas</option>
          <option value="Nike">Nike</option>
        </select>
      </div>

      <div className="sneaker-grid">
        {currentSneakers.length > 0 ? (
          currentSneakers.map((sneaker) => (
            <Link to={`/product/sneakers/${sneaker.id}`} key={sneaker.id} className="sneaker-link">
              <ProductCard
                name = {sneaker.name}
                price = {`From ₹${sneaker.min_price.toLocaleString()}`}
                image = {sneaker.image_url_1} 
              />
            </Link>
          ))
        ) : (
          <div>No sneakers found.</div>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredSneakers.length / sneakersPerPage) }, (_, i) => (
          <button 
            key={i} 
            onClick={() => paginate(i + 1)} 
            className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewAll;