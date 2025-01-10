import React from 'react';
import './orderCard.css'; // Import the CSS file
const weightstyle={
    fontWeight:"500",
    color:"black",
    paddingTop:"5px"
}
const OrderCard = ({ order }) => {
  return (
    <div className="orderCard">
       <div className="orderCardHeader">
      <div>
      <div className="orderCardHeader-title">Order no: #{order.orderId}</div>
        <div className="orderCardHeader-date">
          <span style={weightstyle}>Order Date:</span> {order.orderDate}
          <br/>
          <span style={weightstyle}>Estimated Delivery Date:</span> {order.estimatedDeliveryDate}
        </div>
      </div>
      <div className='orderCard-staus'>
        <div>Order Status: <span className="orderCardHeader-status">{order.orderStatus}</span></div>
        
        <div>Payment Method: {order.paymentMethod}</div>
      </div>
    </div>
      <div className="orderCard-body">
      <div 
          className="orderCard-image" 
          style={{ backgroundImage: `url(${order.productImage})` }} 
        />
     
        <div className="orderCard-details">
          <div className="orderCard-productName">{order.productName}</div>
          <div>Colour: {order.color}</div>
          <div>Size: {order.size}</div>
          <div>Qt: {order.quantity}</div>
          <div>Total: {order.total}</div>
        </div>
        <div className='orderCardButton-root'>
        <button className="orderCard-button">View Details</button>
        </div>
       
      </div>
      <hr color='#ccc'/>
    </div>
  );
};

export default OrderCard;