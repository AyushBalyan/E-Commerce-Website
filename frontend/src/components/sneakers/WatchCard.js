// src/components/SneakerCard.js
import React from 'react';
import './SneakerCard.css'; // Import the CSS for SneakerCard

const WatchCard = ({ name, price, image }) => {
  return (
    <div className="watch-card">
      <img src={image} alt={name} className="watch-image" />
      <div className="watch-info">
        <h3 className="watch-name">{name}</h3>
        <p className="watch-price">{price}</p>
      </div>
    </div>
  );
};

export default SneakerCard;