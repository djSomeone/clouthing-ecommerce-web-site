import React from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css'; // Import the Product.css file

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/product-details'); // Replace with actual product details URL
  };

  return (
    <div className="product" onClick={handleClick}>
      <div className="product-image-container">
        <div 
          className="product-image" 
          style={{ backgroundImage: `url(${product.image})` }} 
        />
      </div>
      <div className="product-details">
        <div className="product-name">{product.name}</div>
        <div className="current-price">{product.price}₹</div>
         
        
      </div>
    </div>
  );
};

export default Product;