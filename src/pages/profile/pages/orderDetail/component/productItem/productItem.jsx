import React from 'react';
import './productItem.css'; // Import your CSS for styling

function ProductItem({ product,orderdDetail }) {
  // Calculate subtotal dynamically
  const subtotal = (product.productId.price * product.quantity);
// console.log(orderdDetail.orderStatus)
  return (
    <div className="ProductItem-product-item">
      <div className='product-image-detail-root'>
      <div className="ProductItem-product-image">
      
        <div
          className="ProductItem-placeholder-image"
          style={{ backgroundImage: `url(${product.productId.images[0]})` }}
        ></div>
      </div>
      <div className="ProductItem-product-details">
        <div className="ProductItem-product-name">{product.productId.name}</div>
        <div className="ProductItem-product-color">Colour - {product.color}</div>
        <div className="ProductItem-product-q">Qty - {product.quantity}</div>
        <div className="ProductItem-product-size">Size - {product.size}</div>
      </div>
      </div>
      <div className="ProductItem-product-quantity">{product.quantity}</div>
      <div className="ProductItem-product-price">{product.productId.price}₹</div>
      
      <div className="ProductItem-product-subtotal">{subtotal}₹</div>
      {(orderdDetail.orderStatus)==="delivered" && <div className="ProductItem-product-exchange">exchange</div>}
    </div>
  );
}

export default ProductItem;