import React from 'react';
import ProductItem from '../productItem/productItem';
import "./productList.css"

function ProductList({ orderDetail,handleExchange }) {
  // console.log(orderDetail.orderStatus);
  return (
    <div className="product-list">
      <div className="product-list-header">
        <div className="product-header">Product</div>
        <div className="quantity-header">Quantity</div>
        <div className="price-header">Price</div>
        <div className="subtotal-header">Subtotal</div>
      </div>
      <hr color='#ccc'/>
      {orderDetail.productDetails.map((product) => (
        <ProductItem key={product._id} product={product} orderdDetail={orderDetail} showExchange={true} handleExchange={handleExchange}/>
      ))}
    </div>
  );
}

export default ProductList;