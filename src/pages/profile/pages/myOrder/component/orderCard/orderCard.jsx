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
          style={{ backgroundImage: `url(${order.productDetails[0].productId.images[0]})` }} 
        />
     
        <div className="orderCard-details">
          <div className="orderCard-productName">{order.productName}</div>
          <div>Colour: {order.productDetails[0].color}</div>
          <div>Size: {order.productDetails[0].size}</div>
          <div>Qt: {order.productDetails[0].quantity}</div>
          <div>Total: {order.totalPrice}</div>
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
  <div className="orderCardHeader-title">Order no: #{order._id}</div>
    <div className="orderCardHeader-date">
      <span style={weightstyle}>Order Date:</span> {order.orderedDate}
      <br/>
      <span style={weightstyle}>Estimated Delivery Date:</span> {order.estimatedDate}
    </div>
  </div>
  <div className='orderCard-staus'>
    <div>Order Status: <span className={`orderCardHeader-status ${order.orderStatus === 'delivered' ? 'completed' : ''}`} >{order.orderStatus}</span>
    </div>
    
    <div>Payment Method: {order.paymentMethod}</div>
  </div>
</div>)
;}

export {OrderCard,OrderCardHeader};