import React from 'react';
import './privacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>
        This Privacy Policy explains how [Your Company Name] collects, uses, and discloses your information when you use our services ("Services"), such as when you visit our website, mobile application, or use our other products (collectively, the "Site").
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect various types of information, including:
      </p>
      <ul>
        <li>Personal Information: Name, email address, phone number, shipping address, billing address.</li>
        <li>Order Information: Products purchased, order history, payment information.</li>
        <li>Account Information: Username, password, login history.</li>
        <li>Browsing Information: IP address, browser type, device information, browsing history.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We may use your information to:</p>
      <ul>
        <li>Process and fulfill your orders.</li>
        <li>Communicate with you about your orders and account.</li>
        <li>Improve our services and website.</li>
        <li>Personalize your experience on our Site.</li>
        <li>Send you marketing communications (with your consent).</li>
        <li>Protect against fraud and abuse.</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>We may share your information with:</p>
      <ul>
        <li>Third-party service providers who assist us in operating our business.</li>
        <li>Law enforcement or other authorities as required by law.</li>
      </ul>

      <h2>Data Security</h2>
      <p>We take reasonable measures to protect your information from unauthorized access, use, and disclosure.</p>

      <h2>Your Rights</h2>
      <p>
        You may have the right to:
      </p>
      <ul>
        <li>Access your personal information.</li>
        <li>Correct any inaccuracies in your personal information.</li>
        <li>Request the deletion of your personal information.</li>
        <li>Opt-out of marketing communications.</li>
      </ul>

      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at [email protected]</p>

      <p>This Privacy Policy is effective as of [Date]. We may update this Privacy Policy from time to time, so please review it periodically.</p>
    </div>
  );
};

export default PrivacyPolicy;