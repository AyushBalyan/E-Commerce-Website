// src/components/SneakerCard.js
import React from 'react';
import './SneakerCard.css'; // Import the CSS for SneakerCard

const SneakerCard = ({ name, price, image }) => {
  return (
    <div className="sneaker-card">
      <img src={image} alt={name} className="sneaker-image" />
      <div className="sneaker-info">
        <h3 className="sneaker-name">{name}</h3>
        <p className="sneaker-price">{price}</p>
      </div>
    </div>
  );
};

export default SneakerCard;