import React from 'react';
import '../../pages/cartDetails/cartDetails.css';
// import cartimage from '../../assets/cartim.png';

const CartItem = ({ product }) => {
  return (
    <div className="cart-item">
      <div className="product-details">
      <div
        className="product-image"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
        {/* <img src={cartimage} alt={product.name} className="product-image" /> */}
        <div>
          <div className="product-name">{product.name}</div>
          <p className="product-info">Colour - {product.color}</p>
          <p className="product-info">Size - {product.size}</p>
          <button className="remove-button">Remove</button>
        </div>
      </div>
      <div className="quantity-controls">
        <button className="quantity-button">-</button>
        <span>{product.quantity}</span>
        <button className="quantity-button">+</button>
      </div>
      <p className="product-price">{product.price}</p>
      <p className="product-subtotal">{product.price*product.quantity}</p>
    </div>
  );
};

export default CartItem;