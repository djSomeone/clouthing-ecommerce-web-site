
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './Navbar.css';
import logo from '../../asset/logo.png';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
               { label: 'Home', path: '/' },
        { label: 'Wardrobe', path: '/wardrobe' },
        { label: 'Occasion Wear', path: '/occasion-wear' },
        { label: 'Casual Wear', path: '/casual-wear' },
        { label: 'Nearby Stores', path: '/nearby-stores' },
        { label: 'About Us', path: '/about-us' },
        { label: 'Contact Us', path: '/contact-us' },
    ];

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="navbar-container">
            <div className="navbar-content">
                {isMobile && (
                    <button className="mobile-menu-icon" onClick={toggleDrawer}>
                        <Icon icon="ic:round-menu" />
                    </button>
                )}

                {!isMobile && (
                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="Iris Fashion Logo" className="navbar-logo-img" />
                    </Link>
                )}

                {!isMobile && (
                    <ul className="navbar-nav">
                        {navItems.map((item, index) => (
                            <li className="navbar-nav-item" key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `navbar-nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}

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
        

            {/* Drawer for Mobile */}
            <Drawer
                open={isDrawerOpen}
                onClose={toggleDrawer}
                direction="left"
                className="drawer-content"
                overlayClassName="drawer-overlay"
            >
                
                <div className="drawer-inner">
                    <div className="drawer-logo">
                        <Link to="/" onClick={toggleDrawer}>
                            <img src={logo} alt="Iris Fashion Logo" className="navbar-logo-img" />
                        </Link>
                        <div className="drawer-close-btn" onClick={toggleDrawer}>
    <Icon icon="ic:round-close" />
  </div>
                    </div>

                    <ul className="navbar-nav-mobile">
                        {navItems.map((item, index) => (
                            <li className="navbar-nav-item-mobile" key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `navbar-nav-link-mobile ${isActive ? 'active' : ''}`}
                                    onClick={toggleDrawer}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </Drawer>
        </nav>
    );
};

export default Navbar;
