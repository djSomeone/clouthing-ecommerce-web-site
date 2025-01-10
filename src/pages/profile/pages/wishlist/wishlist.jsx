import React from 'react';
import "./wishlist.css"
import WishlistProductCard from './component/wishlistCrad/wishlistCard';

const Wishlist = () => {
  const products = [
    {
      id: 1,
      name: "Product Name",
      color: "Teal Blue",
      size: "XS",
      quantity: 1,
      price: 2145,
      image: "https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png" 
    },
    {
      id: 2,
      name: "Product Name",
      color: "Teal Blue",
      size: "XS",
      quantity: 1,
      price: 2145,
      image: "https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png" 
    },
    {
        id: 1,
        name: "Product Name",
        color: "Teal Blue",
        size: "XS",
        quantity: 1,
        price: 2145,
        image: "https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png" 
      },
      {
        id: 2,
        name: "Product Name",
        color: "Teal Blue",
        size: "XS",
        quantity: 1,
        price: 2145,
        image: "https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png" 
      },
      {
        id: 1,
        name: "Product Name",
        color: "Teal Blue",
        size: "XS",
        quantity: 1,
        price: 2145,
        image: "https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png" 
      },
      {
        id: 2,
        name: "Product Name",
        color: "Teal Blue",
        size: "XS",
        quantity: 1,
        price: 2145,
        image: "https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png" 
      },
    // Add more products here
  ];

  return (
    <div className="wishlist-container">
        
      <div className="wishlist-header">
      <h2>Wishlist</h2>
      <div className='wishlist-header-name'>
        <div>Product</div>
        <div>Quantity</div>
        <div>Price</div>
      </div>
      </div>
      <hr color='#ccc'/>
      <div className="wishlist-items">
        {products.map((product) => (
          <WishlistProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;