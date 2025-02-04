// Footer.jsx
import React from 'react';
import './Footer.css';
import { Icon } from '@iconify/react';
import logo from '../../asset/logo.png'; // Import your logo image

const Footer = () => {
  return (
    <footer className="footer-container" >
      <div className="footer-content">
        <div className="footer-brand">
          
          <img className="footer-logo" src={logo} alt="Logo" />
            {/* You would import your logo here like: <img src={logo} alt="Logo" /> */}
            
        
          <div className="footer-social">
            <div>Tag, Share, and Shine with Us ✨</div>
            <div className="footer-social-icons">
              <a href="https://www.instagram.com/iriswomen_avr?igsh=MXd0N2VkMXo5NWh2Mw==" className="footer-social-icon">
                <Icon icon="akar-icons:instagram-fill" />{/* Instagram Icon */}
              </a>
              <a href="https://www.facebook.com" className="footer-social-icon">
                <Icon icon="akar-icons:facebook-fill"/>{/* Facebook Icon */}
              </a>
            </div>
          </div>
        </div>

        <div className="footer-links-container"> 
          <div className="footer-links-column">
            <h4 className="footer-links-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a style={{ color: '#5C5C5C' }} href="/nearby-store">Nearby Stores</a></li><br/>
              {/* //add space between the links */}
              <li><a style={{ color: '#5C5C5C' }} href="#">Our Blog</a></li><br/>
              <li><a style={{ color: '#5C5C5C' }} href="/about-us">About Us</a></li><br/>
              <li><a style={{ color: '#5C5C5C' }} href="/contact-us">Contact Us</a></li><br/>
            </ul>
          </div>

          <div className="footer-links-column">
            <h4 className="footer-links-title">Policies</h4>
            <ul className="footer-links-list">
              <li><a style={{ color: '#5C5C5C' }} href="/privacy-policy">Privacy Policy</a></li><br/>
              <li><a style={{ color: '#5C5C5C' }} href="#">Shipping Policy</a></li><br/>
              <li><a style={{ color: '#5C5C5C' }} href="#">Refund Policy</a></li><br/>
              <li><a style={{ color: '#5C5C5C' }} href="#">Terms & Conditions</a></li><br/>
            </ul>
          </div>

          <div className="footer-address-column">
            <h4 className="footer-links-title">Address</h4>
            <address className="footer-address" style={{ color: '#5C5C5C' }}>
              6R4H+529, Kandivali, Charkop, Charkop Industrial Estate,<br />
              Kandivali West, Mumbai, Maharashtra 400067<br /><br/>
              Email-irisfashionbn@gmail.com<br/><br/>
              Phone - +91 89023280248
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;