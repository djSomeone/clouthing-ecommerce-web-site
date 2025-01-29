import React, { useState } from 'react';
import "./cartSummary.css";

const CartSummary = ({order}) => {
 
  const calculateOrderTotal=(order) =>{
    // Initialize total to 0
    let total = 0;
  
    // Iterate through each product in the order
    order.productDetails.forEach((product) => {
      // Convert price to a number (if it's a string) and multiply by quantity
      const productTotal = parseFloat(product.productId.price) * product.quantity;
      // Add to the total
      total += productTotal;
    });
  
    // Return the total, rounded to 2 decimal places
    return (total);
  }
const total=calculateOrderTotal(order);
  return (
    <div className="cart-summary">
      <h2 style={{textAlign:"justify",marginTop:"0px"}}>Cart Summary</h2>
      <ul >
        <li>
          <span>Order Total</span>
          <span>₹{total}</span>
        </li>
        <li>
          <span>Delivery Charges</span>
          <span>₹40</span>
        </li>
        <li>
          <span>GST and service Tax</span>
          <span>₹{(total*0.05).toFixed(2)}</span>
        </li>
       
      </ul>
      <hr color='#ccc'/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3>Total Amount</h3>
        <span style={{fontWeight:"600"}}>₹{order.totalPrice}</span>
      </div>
    </div>
  );
};

export default CartSummary;