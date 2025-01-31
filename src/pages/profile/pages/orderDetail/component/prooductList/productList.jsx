import React from 'react';
import ProductItem from '../productItem/productItem';
import "./productList.css"

function ProductList({ orderDetail,handleExchange }) {
  // console.log(orderDetail.orderStatus);
  const exchangeProductIds = orderDetail.exchanges.map(item => item.productId);
  return (
    <div className="product-list">
      {orderDetail.exchanges.length==0 &&(
        <div>
        <div className="product-list-header">
        <div className="product-header">Product</div>
        <div className="quantity-header">Quantity</div>
        <div className="price-header">Price</div>
        <div className="subtotal-header">Subtotal</div>
      </div>
     <hr color='#ccc'/>
     </div>
    )}
     
      {orderDetail.productDetails.map((product) => {if(!exchangeProductIds.includes(product.productId._id))
      {
        return(
        <ProductItem key={product._id} product={product} orderdDetail={orderDetail} showExchange={true} handleExchange={handleExchange}/>
      )}})}
    </div>
  );
}

export default ProductList;