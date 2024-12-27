// RelatedProducts.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RelatedProducts.module.css';

const RelatedProducts = ({ products, category }) => {
    console.log("RelatedProducts props:", { products, category }); // Debug log
    
    if (!products) {
      console.log("No products data");
      return null;
    }
  
    if (products.length === 0) {
      console.log("Empty products array");
      return null;
    }
  
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>RELATED PRODUCTS</h2>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <Link 
              to={`/product/${category}/${product.id}`} 
              key={product.id} 
              className={styles.card}
            >
              <div className={styles.imageContainer}>
                <img
                  src={product.image_url_1}
                  alt={product.name}
                  className={styles.image}
                />
              </div>
              <div>
                <h3 className={styles.productTitle}>{product.name}</h3>
                <p className={styles.price}>From ₹{product.min_price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

export default RelatedProducts;