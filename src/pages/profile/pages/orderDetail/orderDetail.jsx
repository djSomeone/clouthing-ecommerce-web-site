import {React, useState} from 'react';
import "./orderDetail.css";
import { Icon } from '@iconify/react';
import { OrderCardHeader } from '../myOrder/component/orderCard/orderCard';
import ProductList from './component/prooductList/productList';
import CartSummary from './component/cartSummary/cartSummary';
import ProductItem from './component/productItem/productItem';
import ExchangeForm from './component/exchangeForm/exchangeForm';
import ExchangeProductList from './component/exchangeProductList/exchangeProductList';

const statusImages = {
    ordered: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/placed_onpma9.png',
    packaging: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/packaging_v3qn3q.png',
    ontheway: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853691/ontheway_yq9a2v.png',
    delivered: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736853904/delivered_jlxmmi.png',
};

const OrderDetail = ({ orderDetails, handleCloseDetails,fetchOrders }) => {
    // console.log("orderDetails==>", orderDetails);
    const [selectedExchangeProduct, setSelectedExchangeProduct] = useState(null);
    const handleClose=()=>{
        setSelectedExchangeProduct(null);
    }
    const handleExchange = (product) => {
        setSelectedExchangeProduct(product);
        console.log("product==>", product);
    };
    // const [orderStatus, setOrderStatus] = useState(orderDetails.orderStatus);
    return (
        <div className='orderDetail-root' >
            <div className='orderDetail-back-root'>
                <button
                    className="orderDetail-back-button"
                    onClick={handleCloseDetails}
                >
                    <Icon icon="mdi:arrow-left" style={{ marginRight: "10px" }} /> Order Detail
                </button>
            </div >
            <OrderCardHeader order={orderDetails} />
            {selectedExchangeProduct?
            (<div>
                <ProductItem product={selectedExchangeProduct} orderdDetail={orderDetails} showExchange={false} handleExchange={handleExchange}/>
                <ExchangeForm product={selectedExchangeProduct} orderDetail={orderDetails} onClose={handleClose} fetchOrders={fetchOrders}/>
            </div>):
            (<div>
            <p style={{textAlign:"justify"}}><strong>Order expected arrival </strong>{orderDetails.estimatedDate}</p>
            
            {orderDetails.exchanges.length==0 &&(<div
                style={{backgroundImage: `url(${statusImages[orderDetails.orderStatus]})`, // Set the background image
                }}
                className='orderDetail-status'
            ></div>)}

            <div style={{
                fontSize:"1.1rem",
                fontWeight:"500",
                textAlign:"justify"
            }}>{`Products (${orderDetails.productDetails.length})`}</div>

            <ExchangeProductList orderDetail={orderDetails} handleExchange={handleExchange} />
            <ProductList orderDetail={orderDetails} handleExchange={handleExchange}  />
            <CartSummary order={orderDetails}/>
            </div>)}
          
        </div>
    );
};

export default OrderDetail;