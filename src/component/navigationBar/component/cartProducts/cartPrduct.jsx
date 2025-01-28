import React, { useState } from "react";
import "./cartProduct.css";
import { domain } from "../../../../api.service";
exports.deleteCartItem = async (cartItemId,fetchCart) => {
  const token = sessionStorage.getItem("authToken"); // Get token from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData ? userData.id : ""; // Extract userId from sessionStorage

  if (!userId) {
    console.error("User ID not found");
    return;
  }

  const response = await fetch(`${domain}/user/deleteCartProduct`, {
    method: "DELETE", // Use DELETE method
    headers: {
      Authorization: `Bearer ${token}`, // Pass token for authentication
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
    alert("Cart item deleted successfully.");
  } else {
    console.error("Failed to delete cart item");
  }
};

const CartProduct = ({ item, fetchCart }) => {
  const [quantity, setQuantity] = useState(item.quantity); // Local state to manage quantity

  const updateQuantity = async (newQuantity) => 
    {
    if (newQuantity < 1) {
      alert("Quantity cannot be less than 1");
      return;
    }

    setQuantity(newQuantity); // Update quantity locally first

    // Set a delay before calling the API to sync with DB
    setTimeout(async () => {
      const token = sessionStorage.getItem("authToken"); // Get token from sessionStorage
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData ? userData.id : ""; // Extract userId from sessionStorage

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      const response = await fetch(`${domain}/user/addToCart`, {
        method: "POST", // Use POST method to update cart
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: item.productId, // The current item ID
          quantity: newQuantity, // New quantity after the update
          color: item.color, // Assuming the color stays the same
          size: item.size, // Assuming the size stays the same
        }),
      });

      const data = await response.json();

      if (data.message) {
        console.log("Cart item updated successfully.");
        fetchCart(); // Refresh cart items after updating
      } else {
        console.error("Failed to update cart item");
      }
    }, 500); // Set a delay of 500ms before calling the API
  };

  const deleteCartItem = async (cartItemId) => {
    const token = sessionStorage.getItem("authToken"); // Get token from sessionStorage
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData ? userData.id : ""; // Extract userId from sessionStorage

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    const response = await fetch(`${domain}/user/deleteCartProduct`, {
      method: "DELETE", // Use DELETE method
      headers: {
        Authorization: `Bearer ${token}`, // Pass token for authentication
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
      alert("Cart item deleted successfully.");
    } else {
      console.error("Failed to delete cart item");
    }
  };

  return (
    <div key={item.id} className="cart-item">
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
        <p>₹{item.price.toLocaleString()}</p>
        <p>Size - {item.size}</p>
        <div className="cart-product-quantity-control">
          <button className="quantity-btn" onClick={() => updateQuantity(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button className="quantity-btn" onClick={() => updateQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      {/* Quantity and Actions */}
      <div className="cart-item-actions">
        <button className="remove-btn" onClick={() => deleteCartItem(item.id,fetchCart)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
