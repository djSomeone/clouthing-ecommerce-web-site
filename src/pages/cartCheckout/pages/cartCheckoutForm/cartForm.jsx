import React from "react";
import { useNavigate } from "react-router-dom";
import "./cartForm.css";

const CartForm = () => {
  const navigator=useNavigate();
  return (
    <div className="cartform-cart-form">
      <h1 className="cartform-cart-title">Cart Details</h1>
      <div className="cartform-steps">
  <div className="cartform-step cartform-active">
    <span className="cartform-step-circle active-circle">1</span>
    <span>Cart Details</span>
  </div>
  <div className="cartform-step cartform-active">
    <span className="cartform-step-circle current-circle">2</span>
    <span>Checkout Details</span>
  </div>
  <div className="cartform-step">
    <span className="cartform-step-circle">3</span>
    <span>Order Complete</span>
  </div>
</div>

      <div className="cartform-form-container">
        <div className="cartform-form-flex">  
          <form style={{padding:"10px",border:"1px solid #ddd",background:"#FFFFFF",borderRadius:"10px"}} className="cartform-contact-form">
            <h2>Contact Information</h2>
            <div  className="cartform-form-group">
              <input type="text" placeholder="First Name" className="cartform-input-field" />
              <input type="text" placeholder="Last Name" className="cartform-input-field" />
            </div>
            <div style={{display: "flex", flexDirection: "column"}} className="cartform-form-group">
  <input type="text" placeholder="Phone Number" className="cartform-input-field cartform-phone-email-input" />
  <input type="email" placeholder="Email Address" className="cartform-input-field cartform-phone-email-input" />
</div>

          </form>
          <form style={{padding:"10px",marginTop:"10px",background:"#FFFFFF",border:"1px solid #ddd",borderRadius:"10px"}} className="cartform-shipping-form">
            <h2>Shipping Address</h2>
            <div className="cartform-form-group">
              <input type="text" placeholder="Address" className="cartform-input-field" />
            </div>
            <div style={{display:"flex",flexDirection:"column"}} className="cartform-form-group">
              <select className="cartform-input-field">
                <option value="">Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
              <input type="text" placeholder="State" className="cartform-input-field cartform-state-input" />
            </div>
            <div className="cartform-form-group">
              <input type="text" placeholder="City" className="cartform-input-field" />
              <input type="text" placeholder="Pin Code" className="cartform-input-field" />
            </div>
            <div style={{display:"flex",flexDirection:"row"}} className="cartform-form-group">
              <input type="checkbox" id="cartform-setDefault" />
              <label htmlFor="cartform-setDefault">Set as Default Address</label>
            </div>
          </form>
        </div>
        <div className="cartform-cart-summary">
          <h2>Cart Summary</h2>
          <ul>
            <li>
              <span>Order Total</span>
              <span>₹400</span>
            </li>
            <li>
              <span>Delivery Charges</span>
              <span>₹80</span>
            </li>
            <li>
              <span>GST and Taxes</span>
              <span>₹18</span>
            </li>
            <li>
              <span>Donation (₹10)</span>
              <span>₹10</span>
            </li>
            <li className="cartform-total-amount">
              <span>Total Amount</span>
              <span>₹488</span>
            </li>
          </ul>
          <button className="cartform-checkout-btn" onClick={()=>{
            navigator("/sucess-order")
          }}>Checkout</button>
      
        </div>
      </div>
    </div>
  );
};

export default CartForm;