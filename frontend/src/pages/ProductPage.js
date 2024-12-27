import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductPage.css";
import RelatedProducts from "../components/RelatedProducts";
import LoadingComponent from "../components/LoadingComponent";

const ProductPage = () => {
  const { category, id } = useParams();
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5432/api/${category}/${id}`);
        const { product, sizes } = response.data;
        console.log("Product data:", product);
        setProduct(product);
        setSizes(sizes || []);
        if (product.tags) {
          console.log("Tags:", product.tags); // Check tags before fetching
          const relatedResponse = await axios.get(
            `http://127.0.0.1:5432/api/related-products?category=${category}&productId=${id}&tags=${product.tags}`
          );
          console.log("Related products:", relatedResponse.data); // Check response
          setRelatedProducts(relatedResponse.data.relatedProducts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.response?.data?.error || "Failed to fetch product data");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, id]);

  if (loading) return <LoadingComponent />;
  if (error) return <div className="product-not-found">{error}</div>;
  if (!product) return <div className="product-not-found">Product not found</div>;

  const images = [
    product.image_url_1, 
    product.image_url_2, 
    product.image_url_3, 
    product.image_url_4
  ].filter(Boolean);

  const handleClickToChat = () => {
    if (sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size before contacting us.", {
        position: "top-right",
      });
      return;
    }

    toast.info("Redirecting to Instagram...", {
      position: "top-right",
    });

    const instagramUsername = "unds.in";
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${product.name}${selectedSize ? `, size ${selectedSize.size}` : ''}. Can you provide more information?`
    );

    const instagramAppUrl = `instagram://user?username=${instagramUsername}`;
    window.location.href = instagramAppUrl;

    setTimeout(() => {
      if (document.hidden === false) {
        window.open(
          `https://ig.me/m/${instagramUsername}?message=${message}`,
          "_blank"
        );
      }
    }, 2000);
  };

  return (
    <div className="main">
      <div className="product-page">
      <div className="product-gallery">
        <img
          src={images[currentImageIndex]}
          alt={product.name}
          className="main-image"
        />
        <div className="thumbnail-container">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} thumbnail ${index + 1}`}
              className={`thumbnail ${currentImageIndex === index ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-brand">Brand: {product.brand}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-price">
          Price: ₹{selectedSize ? selectedSize.price : product.min_price}
        </p>
        {sizes.length > 0 && (
          <div className="size-selection">
            <h3>Select Size:</h3>
            <div className="size-buttons">
              {sizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  className={`size-button ${selectedSize === sizeObj ? "selected" : ""}`}
                  onClick={() => setSelectedSize(sizeObj)}
                  disabled={sizeObj.stock_quantity === 0}
                >
                  {sizeObj.size}
                  {sizeObj.stock_quantity === 0 && " (Out of Stock)"}
                </button>
              ))}
            </div>
          </div>
        )}
        <button className="click-to-chat-button" onClick={handleClickToChat}>
          Click to Chat
        </button>
      </div>
      <ToastContainer />
    </div>
    <RelatedProducts products={relatedProducts} category={category} />
    </div>
    
  );
};

export default ProductPage;