// ProductGrid.jsx
import React from 'react';
import './ProductGrid.css';

const dummyProducts = [
  {
    image: '/src/asset/test/product1.png', // Replace with actual image URLs
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
  {
    image: '/src/asset/test/product2.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
  {
    image: '/src/asset/test/product3.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
    {
    image: '/src/asset/test/product1.png', // Replace with actual image URLs
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
  {
    image: '/src/asset/test/product2.png',
    name: 'Brown Floral Printed Ku...',
    price: 2145,
    originalPrice: 4200,
  },
//   {
//     image: './../../asset/test/product1.png',
//     name: 'Brown Floral Printed Ku...',
//     price: 2145,
//     originalPrice: 4200,
//   },
];

const ProductGrid = ({ title, description, products=dummyProducts }) => {
return (
    <div className="product-grid-container">
        <div className="product-grid-header">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <br/>
        <div className="product-grid">
            {products.map((product, index) => (
                <div className="product" key={index}>
                    <div
                        className=" product-image" 
                        // style={{ backgroundImage: `url(${product.image})` }}
                    ></div>
                    <div className="product-details">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-price">
                            <span className="current-price">{product.price}₹</span>
                            {product.originalPrice && (
                                <span className="original-price">{product.originalPrice}₹</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};



export default ProductGrid;