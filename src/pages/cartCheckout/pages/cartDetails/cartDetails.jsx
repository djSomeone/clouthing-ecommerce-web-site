import React from 'react';
import { useLocation } from 'react-router-dom';
import CartItem from '../../component/cartItem/cartItem';
import CartSummary from '../../component/cartSummary/cartSummary';
import './cartDetails.css';

const CartDetails = () => {
  const location=useLocation();
  const products=location.state.cartItems ||{};
  
  // console.log("product",typeof(product));
  // const products = [
  //   {
  //     image: 'https://via.placeholder.com/100',
  //     name: 'Product Name',
  //     color: 'Teal Blue',
  //     size: 'XS',
  //     quantity: 1,
  //     price: '2145₹',
  //     subtotal: '2145₹',
  //   },
  //   {
  //       image: 'https://via.placeholder.com/100',
  //       name: 'Product Name',
  //       color: 'Teal Blue',
  //       size: 'XS',
  //       quantity: 1,
  //       price: '2145₹',
  //       subtotal: '2145₹',
  //     }
  //   // Add more products as needed
  // ];
  console.log("products",products);
  const summary = {
    orderTotal: 400,
    deliveryCharges: 40,
    tax: 8,
    totalAmount: 448,
  };

  return (
    <div className="cart-details">
      <h1>Cart Details</h1>
      <div className="cart-progress">
  <span className="step step-active"><span className='circleforone'>1</span> Cart Details</span>
  <span className="step step-inactive"><span className='circleforone'>2</span> Checkout details</span>
  <span className="step step-inactive"><span className='circleforone'>3</span> Order complete</span>
</div>

      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <span style={{textAlign:"jus"}}>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Subtotal</span>
          </div>
          {products.map((product, index) => (
            <CartItem key={index} product={product} />
          ))}
        </div>
        <CartSummary summary={summary} />
      </div>
    </div>
  );
};

export default CartDetails;