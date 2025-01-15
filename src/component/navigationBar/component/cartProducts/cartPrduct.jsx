import React from "react";
import "./cartProduct.css";

const CartProduct = ({ item }) => {
  return (
    <div key={item.id} className="cart-item">
      {/* Product Image */}
      <div
        className="cart-item-image"
        style={{ backgroundImage: `url(${item.image})` }}
      ></div>

      {/* Product Info */}
      <div className="cart-item-info">
        <strong style={{overflowX:"hidden",marginBottom:"0px", textAlign:"justify"}}>{item.name}</strong>
        <p>₹{item.price.toLocaleString()}</p>
        <p>Size - {item.size}</p>
        <div className="cart-product-quantity-control">
          <button className="quantity-btn">-</button>
          <span>{item.quantity}</span>
          <button className="quantity-btn">+</button>
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="cart-item-actions">
        
        <button className="remove-btn">Remove</button>
      </div>
    </div>
  );
};

export default CartProduct;