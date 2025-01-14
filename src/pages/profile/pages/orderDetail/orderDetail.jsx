import React from 'react';
import "./orderDetail.css";
import { Icon } from '@iconify/react';
import { OrderCardHeader } from '../myOrder/component/orderCard/orderCard';
import ProductList from './component/prooductList/productList';
import CartSummary from './component/cartSummary/cartSummary';

const statusImages = {
    Placed: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/placed_onpma9.png',
    Packaging: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/packaging_v3qn3q.png',
    OnTheWay: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/ontheway_yq9a2v.png',
    Delivered: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853904/delivered_jlxmmi.png',
};
const x="Products (";
const y=")";
const OrderDetail = ({ orderDetails, handleCloseDetails }) => {
    console.log("orderDetails==>", orderDetails);
    return (
        <div className='orderDetail-root' >
            <div className='orderDetail-back-root'>
                <button
                    className="orderDetail-back-button"
                    onClick={handleCloseDetails}
                >
                    <Icon icon="mdi:arrow-left" style={{ marginRight: "10px" }} /> Order Detail
                </button>
            </div>
            <OrderCardHeader order={orderDetails} />
            <p style={{textAlign:"justify"}}><strong>Order expected arrival </strong>{orderDetails.estimatedDeliveryDate}</p>
            <div
                style={{backgroundImage: `url(${statusImages[orderDetails.orderStatus]})`, // Set the background image
                }}
                className='orderDetail-status'
            ></div>
            <div style={{
                fontSize:"1.1rem",
                fontWeight:"500",
                textAlign:"justify"
            }}>{`Products (${orderDetails.products.length})`}</div>
            <ProductList products={orderDetails.products}/>
            <CartSummary order={orderDetails}/>
          
        </div>
    );
};

export default OrderDetail;