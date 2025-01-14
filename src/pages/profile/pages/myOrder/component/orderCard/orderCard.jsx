import React from 'react';
import './orderCard.css'; // Import the CSS file
const weightstyle={
    fontWeight:"500",
    color:"black",
    paddingTop:"5px"
}
const OrderCard = ({ order ,handleViewDetail}) => {
  return (
    <div className="orderCard">
      <OrderCardHeader order={order}/>
      <div className="orderCard-body">
      <div 
          className="orderCard-image" 
          style={{ backgroundImage: `url(${order.products[0].productImage})` }} 
        />
     
        <div className="orderCard-details">
          <div className="orderCard-productName">{order.productName}</div>
          <div>Colour: {order.products[0].color}</div>
          <div>Size: {order.products[0].size}</div>
          <div>Qt: {order.products[0].quantity}</div>
          <div>Total: {order.products[0].total}</div>
        </div>
        <div className='orderCardButton-root'>
        <button className="orderCard-button" onClick={()=>handleViewDetail(order)}>View Details</button>
        </div>
       
      </div>
      <hr color='#ccc'/>
    </div>
  );
};
const OrderCardHeader=({order})=>{
return ( <div className="orderCardHeader">
  <div>
  <div className="orderCardHeader-title">Order no: #{order.orderId}</div>
    <div className="orderCardHeader-date">
      <span style={weightstyle}>Order Date:</span> {order.orderDate}
      <br/>
      <span style={weightstyle}>Estimated Delivery Date:</span> {order.estimatedDeliveryDate}
    </div>
  </div>
  <div className='orderCard-staus'>
    <div>Order Status: <span className={`orderCardHeader-status ${order.orderStatus === 'Delivered' ? 'completed' : ''}`} >{order.orderStatus}</span>
    </div>
    
    <div>Payment Method: {order.paymentMethod}</div>
  </div>
</div>)
;}

export {OrderCard,OrderCardHeader};