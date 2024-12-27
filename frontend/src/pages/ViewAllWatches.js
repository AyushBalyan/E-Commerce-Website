import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Create a WatchCard component similar to SneakerCard
import './ViewAllSneakers.css';
import LoadingComponent from '../components/LoadingComponent';

const ViewAllWatches = () => {
  const [watches, setWatches] = useState([]);
  const [filteredWatches, setFilteredWatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [watchesPerPage] = useState(9);
  const [sortOption, setSortOption] = useState('name');
  const [filterBrand, setFilterBrand] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch watches from the backend when the component mounts
  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5432/api/watches'); // Update endpoint
        setWatches(response.data);
        setFilteredWatches(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch watches from the server');
        setLoading(false);
      }
    };

    fetchWatches();
  }, []);

  // Filter and sort watches whenever filters or sorting options change
  useEffect(() => {
    let result = [...watches];

    // Apply brand filter
    if (filterBrand !== 'All') {
      result = result.filter((watch) => watch.brand === filterBrand);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price_asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredWatches(result);
    setCurrentPage(1);
  }, [watches, sortOption, filterBrand]);

  const indexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = indexOfLastWatch - watchesPerPage;
  const currentWatches = filteredWatches.slice(indexOfFirstWatch, indexOfLastWatch);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-all-page">
      <h2 className="view-all-title">OUR WATCH COLLECTION</h2>

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
          <option value="Citizen">Citizen</option>
          <option value="Police">Police</option>
          <option value="Tommy Hilfiger">Tommy Hilfiger</option>
        </select>
      </div>

      <div className="sneaker-grid">
        {currentWatches.length > 0 ? (
          currentWatches.map((watch) => (
            <Link to={`/product/watches/${watch.id}`} key={watch.id} className="sneaker-link">
              <ProductCard
                name={watch.name}
                price={`From ₹${watch.min_price}`}
                image={watch.image_url_1}
              />
            </Link>
          ))
        ) : (
          <div>No watches found.</div>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredWatches.length / watchesPerPage) }, (_, i) => (
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

export default ViewAllWatches;