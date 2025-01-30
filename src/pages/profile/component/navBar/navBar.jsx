import React, { useState } from 'react';
import './navBar.css';
import { Icon } from '@iconify/react';

const ProfileNavBar = ({setActiveItem,activeItem}) => {

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <nav className="profileNavBar">
      <div className="profileNavBar-container">
        <h1 className="profileNavBar-heading">Hello {userData.name}</h1>
        <p className="profileNavBar-welcome" style={{margin:"0px",}}>Welcome to your Account</p>

        <ul className="profileNavBar-list">
          <li className={`profileNavBar-item ${activeItem === 'myOrders' ? 'active' : ''}`}>
            <a href="#" className="profileNavBar-link" onClick={() => handleItemClick('myOrders')}>
              <Icon icon="ic:outline-shopping-bag" /> My Orders
            </a>
          </li>
          <li className={`profileNavBar-item ${activeItem === 'wishlist' ? 'active' : ''}`}>
            <a href="#" className="profileNavBar-link" onClick={() => handleItemClick('wishlist')}>
              <Icon icon="mdi:heart-outline" /> Wishlist
            </a>
          </li>
          <li className={`profileNavBar-item ${activeItem === 'savedAddress' ? 'active' : ''}`}>
            <a href="#" className="profileNavBar-link" onClick={() => handleItemClick('savedAddress')}>
              <Icon icon="mdi:map-marker-outline" /> Saved Address
            </a>
          </li>
          <li className={`profileNavBar-item ${activeItem === 'privacyPolicy' ? 'active' : ''}`}>
            <a href="#" className="profileNavBar-link" onClick={() => handleItemClick('privacyPolicy')}>
              <Icon icon="mdi:shield-lock-outline" /> Privacy Policy
            </a>
          </li>
          <li className={`profileNavBar-item ${activeItem === 'logOut' ? 'active' : ''}`}>
            <a href="#" className="profileNavBar-link" >
              <Icon icon="mdi:logout" /> Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ProfileNavBar;