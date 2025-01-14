import React from 'react';
import ProductItem from '../productItem/productItem';
import "./productList.css"

function ProductList({ products }) {
  return (
    <div className="product-list">
      <div className="product-list-header">
        <div className="product-header">Product</div>
        <div className="quantity-header">Quantity</div>
        <div className="price-header">Price</div>
        <div className="subtotal-header">Subtotal</div>
      </div>
      <hr color='#ccc'/>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;