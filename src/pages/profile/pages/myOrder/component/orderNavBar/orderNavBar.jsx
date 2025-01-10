import React, { useState } from 'react';
import './orderNavBar.css'; 

const HorizontalNavBar = ({activeTab, setActiveTab}) => {
  // Set initial active tab

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <nav className="horizontalNavBar">
      <ul className="horizontalNavBar-list">
        <li 
          className={`horizontalNavBar-item ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => handleTabClick('ongoing')}
        >
          Ongoing
        </li>
        <li 
          className={`horizontalNavBar-item ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => handleTabClick('completed')}
        >
          Completed
        </li>
      </ul>
    </nav>
  );
};

export default HorizontalNavBar;