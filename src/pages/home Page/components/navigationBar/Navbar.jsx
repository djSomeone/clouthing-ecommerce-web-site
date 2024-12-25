import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../../../asset/logo.png'; // Import your logo image
import { Icon } from '@iconify/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Iris Fashion Logo" className="navbar-logo-img" />
          </a>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <Icon icon="ic:round-menu" /> {/* Menu Icon */}
        </button>
        <ul className={`navbar-nav ${isOpen ? 'show' : ''}`}>
          <li className="navbar-nav-item">
            <a href="/" className="navbar-nav-link active">
              Home
            </a>
          </li>
          <li className="navbar-nav-item">
            <a href="/wardrobe" className="navbar-nav-link">
              Wardrobe
            </a>
          </li>
          <li className="navbar-nav-item">
            <a href="/occasion-wear" className="navbar-nav-link">
              Occasion Wear
            </a>
          </li>
          <li className="navbar-nav-item">
            <a href="/casual-wear" className="navbar-nav-link">
              Casual Wear
            </a>
          </li>
          <li className="navbar-nav-item">
            <a href="/nearby-stores" className="navbar-nav-link">
              Nearby Stores
            </a>
          </li>
          <li className="navbar-nav-item">
            <a href="/about-us" className="navbar-nav-link">
              About Us
            </a>
          </li>
          <li className="navbar-nav-item">
            <a href="/contact-us" className="navbar-nav-link">
              Contact Us
            </a>
          </li>
        </ul>
        <div className="navbar-icons">
          <a href="#" className="navbar-icon">
            <Icon icon="tabler:search" /> {/* Search */}
          </a>
          <a href="#" className="navbar-icon">
            <Icon icon="iconamoon:profile-light" /> {/* Profile */}
          </a>
          <a href="#" className="navbar-icon">
            <Icon icon="solar:bag-3-outline" /> {/* Cart */}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;