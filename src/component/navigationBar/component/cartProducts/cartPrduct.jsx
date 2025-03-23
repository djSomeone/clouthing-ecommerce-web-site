import React, { useState, useRef, useEffect } from "react";
import "./cartProduct.css";
import { domain } from "../../../../api.service";
import { useAlert } from "../../../alert_popup/AlertContext";


export const deleteCartItem = async (cartItemId, fetchCart,showAlert) => {
 
  const token = sessionStorage.getItem("authToken");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData ? userData.id : "";

  if (!userId) {
    console.error("User ID not found");
    return;
  }

  const response = await fetch(`${domain}/user/deleteCartProduct`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      cartItemId: cartItemId,
    }),
  });

  const data = await response.json();

  if (data.success) {
    fetchCart();
    showAlert("Cart item deleted successfully.");
  } else {
    console.error("Failed to delete cart item");
  }
};

export const CartProduct = ({ item, fetchCart }) => {
  // console.log("in cart products");

  // console.log("----------->"+al);
  const [quantity, setQuantity] = useState(item.quantity);
  const alertContext=useAlert();
  // console.log(quantity);
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);
  console.log(item.quantity);
  const debounceTimer = useRef(null); // Reference to store debounce timer

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      alertContext.showAlert("Quantity cannot be less than 1");
      return;
    }

    setQuantity(newQuantity); // Update quantity locally

    // Cancel previous API call if any
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new delayed API call
    debounceTimer.current = setTimeout(async () => {
      const token = sessionStorage.getItem("authToken");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData ? userData.id : "";

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      const response = await fetch(`${domain}/user/addToCart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: item.productId,
          quantity: newQuantity,
          color: item.color,
          size: item.size,
        }),
      });

      const data = await response.json();

      if (data.message) {
        console.log("Cart item updated successfully.");
        fetchCart();
      } else {
        console.error("Failed to update cart item");
      }
    }, 500); // Debounce delay of 500ms
  };

  return (
    <div key={item.id} className="cart-item-root">
      {/* Product Image */}
      <div
        className="cart-item-image"
        style={{ backgroundImage: `url(${item.image})` }}
      ></div>

      {/* Product Info */}
      <div className="cart-item-info">
        <strong style={{ overflowX: "hidden", marginBottom: "0px", textAlign: "justify" }}>
          {item.name}
        </strong>
        <p>Rs. {item.price.toLocaleString()}</p>
        <p>Size - {item.size}</p>
        <div className="cart-product-quantity-control">
          <button className="quantity-btn" onClick={() => updateQuantity(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button className="quantity-btn" onClick={() => updateQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="cart-item-actions">
        <button className="remove-btn" onClick={() => deleteCartItem(item.id, fetchCart,alertContext.showAlert)}>
          Remove
        </button>
      </div>
    </div>
  );
};
