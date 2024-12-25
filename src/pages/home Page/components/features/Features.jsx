// Features.jsx
import React from 'react';
import './Features.css';
import { Icon } from '@iconify/react';

const Features = () => {
  return (
    <div className="features-container">
      <div className="features-content">
        <div className="feature">
          <Icon icon="streamline:shipping-truck" className="feature-icon"/> {/* Replace with your actual icon */}
          <h3 className="feature-title">Fast & Free Shipping</h3>
          <p className="feature-description">We offer free shipping on all orders</p>
        </div>
        <div className="feature">
          <Icon icon="tabler:truck-return" className="feature-icon"/> {/* Replace with your actual icon */}
          <h3 className="feature-title">Easy Exchange</h3>
          <p className="feature-description">7 day easy exchange with all tag tucked in article</p>
        </div>
        <div className="feature">
          <Icon icon="hugeicons:package" className="feature-icon"/> {/* Replace with your actual icon */}
          <h3 className="feature-title">Track Your Package</h3>
          <p className="feature-description">Know Where Your Order Is - Instantly!</p>
        </div>
      </div>
    </div>
  );
};

export default Features;