
// components/navigationBar/Navbar.jsx
import React from 'react';
import './Navbar.css';
import logo from '../../asset/logo.png'; // Import your logo image
import { Icon } from '@iconify/react';
import { NavLink, Link } from 'react-router-dom'; // Import NavLink and Link

const Navbar = () => {
    const navItems = [
        { label: 'Home', path: '/home' },
        { label: 'Wardrobe', path: '/wardrobe' },
        { label: 'Occasion Wear', path: '/occasion-wear' },
        { label: 'Casual Wear', path: '/casual-wear' },
        { label: 'Nearby Stores', path: '/nearby-stores' },
        { label: 'About Us', path: '/about-us' },
        { label: 'Contact Us', path: '/contact-us' },
    ];

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-logo">
                  
                    <Link to="/"> {/* Use Link for logo */}
                        <img src={logo} alt="Iris Fashion Logo" className="navbar-logo-img" />
                    </Link>
                </div>
                <ul className="navbar-nav">
                    {navItems.map((item, index) => (
                        <li className="navbar-nav-item" key={index}>
                            <NavLink // Use NavLink for navigation items
                                to={item.path}
                                className={({ isActive }) => `navbar-nav-link ${isActive ? 'active' : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
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