import React, { useState, useRef } from 'react';
import '../../pages/cartDetails/cartDetails.css';
import { deleteCartItem } from '../../../../component/navigationBar/component/cartProducts/cartPrduct';
import { domain } from '../../../../api.service';
import { useAlert } from '../../../../component/alert_popup/AlertContext';

const CartItem = ({ product, fetchCart }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const debounceTimer = useRef(null);
  const alertContext=useAlert()


  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      alertContext.showAlert('Quantity cannot be less than 1');
      return;
    }

    setQuantity(newQuantity);

    // Cancel previous debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new debounce timer for API call
    debounceTimer.current = setTimeout(async () => {
      const token = sessionStorage.getItem('authToken');
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      const userId = userData ? userData.id : '';

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      try {
        const response = await fetch(`${domain}/user/addToCart`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            productId: product.productId,
            quantity: newQuantity,
            color: product.color,
            size: product.size,
          }),
        });

        const data = await response.json();

        if (data.message) {
          console.log('Cart item updated successfully.');
          fetchCart(); // Refresh cart items after successful update
        } else {
          console.error('Failed to update cart item');
        }
      } catch (error) {
        console.error('Error updating cart item:', error);
      }
    }, 500); // Debounce delay of 500ms
  };

  return (
    <div className="cart-item">
      <div className="product-details">
        <div
          className="cart-product-image"
          style={{ backgroundImage: `url(${product.image})` }}
        ></div>
        <div style={{ textAlign: 'left' }}>
          <div className="product-name">{product.name}</div>
          <p className="product-info">Colour - {product.color}</p>
          <p className="product-info">Size - {product.size}</p>
          <button className="remove-button" onClick={() => deleteCartItem(product.id, fetchCart)}>
            Remove
          </button>
        </div>
      </div>
      <div className="quantity-controls">
        <button className="quantity-button" onClick={() => updateQuantity(quantity - 1)}>-</button>
        <span>{quantity}</span>
        <button className="quantity-button" onClick={() => updateQuantity(quantity + 1)}>+</button>
      </div>
      <p className="product-price">{product.price}</p>
      <p className="product-subtotal">{product.price * quantity}</p>
    </div>
  );
};

export default CartItem;
