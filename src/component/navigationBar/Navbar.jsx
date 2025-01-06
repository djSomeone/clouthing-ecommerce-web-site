import React, { useState } from 'react';
import { NavLink, Link,useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './Navbar.css';
import logo from '../../asset/logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false); // Drawer for profile
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false); // State for cart drawer

    const profileItems = [
        { label: 'My orders', icon: 'ic:round-menu', path: '/my-orders' },
        { label: 'Wishlist', icon: 'mdi:heart-outline', path: '/wishlist' },
        { label: 'Saved Address', icon: 'iconamoon:profile-light', path: '/saved-address' },
        { label: 'Privacy Policy', icon: 'material-symbols:privacy-tip-outline', path: '/privacy-policy' },
        { label: 'Log out', icon: 'material-symbols:logout', path: '/logout' },
    ];

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Wardrobe', path: '/categories' },
        { label: 'Occasion Wear', path: '/occasion-wear' },
        { label: 'Casual Wear', path: '/casual-wear' },
        { label: 'Nearby Stores', path: '/nearby-store' },
        { label: 'About Us', path: '/about-us' },
        { label: 'Contact Us', path: '/contact-us' },
    ];

    const cartItems = [
        { id: 1, name: 'Product Name', price: '2145$', size: 'XS', quantity: 1 },
        { id: 2, name: 'Product Name', price: '2145$', size: 'XS', quantity: 2 },
        { id: 3, name: 'Product Name', price: '2145$', size: 'XS', quantity: 1 },
    ];

    const toggleDrawer = () => {
        setIsDrawerOpen((prev) => !prev);
    };

    const toggleCartDrawer = () => {
        setIsCartDrawerOpen((prev) => !prev);
    };
    const toggleProfileDrawer = () => {
        setIsProfileDrawerOpen((prev) => !prev);
    };

    const handleProfileClick = () => {
        if (isMobile) {
            toggleProfileDrawer(); // Open profile drawer on mobile
        } else {
            navigate('/profile'); // Navigate to profile page on desktop
        }
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
                    <a href="#" className="navbar-icon" onClick={handleProfileClick}>
                        <Icon icon="iconamoon:profile-light" /> {/* Profile */}
                    </a>
                    <a href="#" className="navbar-icon" onClick={toggleCartDrawer}>
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

            {/* Cart Drawer */}
            <Drawer
    open={isCartDrawerOpen}
    onClose={toggleCartDrawer}
    direction="right"
    className="cart-drawer-content"
    overlayClassName="drawer-overlay"
   size={300}
>
    <div className="cart-drawer-parent">
        {/* Top Row: Cart Title and Close Button */}
        <div className="cart-drawer-header">
            <h2>Cart</h2>
            <button className="cart-close-btn" onClick={toggleCartDrawer}>
                <Icon icon="ic:round-close" />
            </button>
        </div>

        {/* Cart Items */}
        <div className="cart-drawer-inner">
            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <p>{item.price}</p>
                        <p>Size - {item.size}</p>
                    </div>
                    <div className="cart-item-actions">
                        <button className="quantity-btn">-</button>
                        <span>{item.quantity}</span>
                        <button className="quantity-btn">+</button>
                        <button className="remove-btn">Remove</button>
                    </div>
                </div>
            ))}
        </div>

        {/* Footer: Note and Proceed Button */}
        <div className="cart-drawer-footer">
            <div className="cart-note">
                <p style={{ textAlign: "justify" }}>
                    <strong>Note</strong> - We offer a 7-day easy exchange policy with all tags intact; but returns are not accepted.
                </p>
            </div>
            <button className="proceed-btn">Proceed</button>
        </div>
    </div>
</Drawer>

{/* this is profile drawer */}

<Drawer
                open={isProfileDrawerOpen}
                onClose={toggleProfileDrawer}
                direction="right" // Open from the right
                className="profile-drawer-content"
                overlayClassName="drawer-overlay"
            >
                <div className='profile-drawer-parent'>
                <div className="profile-drawer-header">
                <h2>Profie</h2>
                    <button className="profile-close-btn" onClick={toggleProfileDrawer}>
                        <Icon icon="ic:round-close" />
                    </button>
                </div>
                <div className="profile-drawer-inner">
                    <ul className="profile-nav-mobile">
                        {profileItems.map((item, index) => (
                            <li className="profile-nav-item-mobile" key={index}>
                                <NavLink
                                    to={item.path}
                                    className="profile-nav-link-mobile"
                                    onClick={toggleProfileDrawer} // Close on navigation
                                >
                                    <Icon icon={item.icon} className='profile-icon'/>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            </Drawer>
        </nav>
    );
};

export default Navbar;