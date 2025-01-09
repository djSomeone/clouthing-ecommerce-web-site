import React from 'react';
import './ProductGrid.css'; // Import the ProductGrid.css file
import Product from '../../../../component/product/product.jsx'; // Import the Product component
import { useNavigate } from 'react-router-dom';

const dummyProducts = [
  {
    id: 1, // Add unique IDs for products (recommended)
    image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p2_yvzi4c.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
  {
    id: 5,
    image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
];

const ProductGrid = ({ title, description, products = dummyProducts }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/product-details'); // Replace with actual product details URL
  };

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <br />
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product.id} product={product} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;