import React from 'react';
import './wishlistCard.css';

const WishlistProductCard = ({ product }) => {
  return (
    <div className="wishlistProductCard">
      <div className="wishlistProductCard-content">
        <div
          className="wishlistProductCard-image"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className="wishlistProductCard-details">
          <div className="wishlistProductCard-name"><strong>{product.name}</strong></div>
          <br/>
          <div className="wishlistProductCard-info">
            <div>Colour - {product.color}</div>
            <br/>
            <div>Size - {product.size}</div>
          </div>
          <div className="wishlistProductCard-remove">Remove</div>
        </div>
      </div>
      <div className="wishlistProductCard-actions">
        <div className="wishlistProductCard-quantity-selector">
          <button style={{border:"none"}}>-</button>
          <span>{product.quantity}</span>
          <button style={{border:"none"}}>+</button>
        </div>
         </div>
         <div className="wishlistProductCard-price">₹{product.price}</div>
     
      <button className="wishlistProductCard-add-to-cart">Add to Cart</button>
    </div>
  );
};

export default WishlistProductCard;
