// import React from 'react';
// import './ProductGrid.css'; // Import the ProductGrid.css file
// import Product from '../../../../component/product/product.jsx'; // Import the Product component
// import { useNavigate } from 'react-router-dom';

// const dummyProducts = [
//   {
//     id: 1, // Add unique IDs for products (recommended)
//     image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
//     name: 'Brown Floral Printed Ku...',
//     price: 2145,
//     originalPrice: 4200,
//   },
//   {
//     id: 2,
//     image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
//     name: 'Brown Floral Printed Ku...',
//     price: 2145,
//     originalPrice: 4200,
//   },
//   {
//     id: 3,
//     image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p2_yvzi4c.png',
//     name: 'Brown Floral Printed Ku...',
//     price: 2145,
//     originalPrice: 4200,
//   },
//   {
//     id: 4,
//     image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
//     name: 'Brown Floral Printed Ku...',
//     price: 2145,
//     originalPrice: 4200,
//   },
//   {
//     id: 5,
//     image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
//     name: 'Brown Floral Printed Ku...',
//     price: 2145,
//     originalPrice: 4200,
//   },
// ];

// const ProductGrid = ({ title, description, products = dummyProducts }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/product-details'); // Replace with actual product details URL
//   };

//   return (
//     <div className="product-grid-container">
//       <div className="product-grid-header">
//         <h2>{title}</h2>
//         <p>{description}</p>
//       </div>
//       <br />
//       <div className="product-grid">
//         {products.map((product) => (
//           <Product key={product.id} product={product} onClick={handleClick} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;


import React, { useEffect, useState } from 'react';
import './ProductGrid.css'; 
import Product from '../../../../component/product/product.jsx';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../../../api.service'; // Adjust the import path if needed
import axios from 'axios';

const ProductGrid = ({ title, description,path }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${domain}${path}`);
      if (response.data.status === 200) {
        setProducts(response.data.data);
      } else {
        setError('Failed to fetch products.');
      }
    } catch (err) {
      setError('Error fetching products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = (productId) => {
    navigate(`/product-details/${productId}`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="product-grid-container">
      <div className="product-grid-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <br />
      <div className="product-grid">
        {products.map((product) => (
          <Product 
            key={product._id} 
            product={{
              id: product._id,
              name: product.name,
              price: product.price,
              images: product.images, // Display the first image
            }} 
            onClick={() => handleClick(product._id)} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
