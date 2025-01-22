import React from 'react';
import './orderComplete.css';
import { useNavigate } from 'react-router-dom';
import ordercompleteimg from '../../../../asset/tick.png';

const OrderComplete = () => {
  const navigator=useNavigate();
  return (
    <div className="ordercomplete-container">
      <div className="ordercomplete-header">
        <h1>Cart Details</h1>
        <div className="ordercomplete-steps">
          <div className="step active">
            <span className="step-number">1</span> Cart Details
          </div>
          <div className="step active">
            <span className="step-number">2</span> Checkout Details
          </div>
          <div className="step active">
            <span className="step-number">3</span> Order Complete
          </div>
        </div>
      </div>
      <div className="ordercomplete-content">
        <div className="ordercomplete-checkmark">
        
            <span><img style={{height:"100px",width:"100px" }} src={ordercompleteimg} alt='ordercompletetick'/></span>
          
        </div>
        <h2>Your Order is complete!</h2>
        <p>You will be receiving a confirmation email with order details.</p>
        <button className="ordercomplete-button" onClick={()=>{navigator("/")}}>Go to the Home Page</button>
      </div>
    </div>
  );
};

export default OrderComplete;