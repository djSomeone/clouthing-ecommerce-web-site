// Banner.jsx
import React from 'react';
import './Banner.css';

const Banner = ({ imageUrl, title, subtitle, buttonText, buttonLink }) => {
  return (
    console.log(imageUrl),
    <div className="banner-container" 
    
   >
      <div className="banner-content">
        {title && <h1 className="banner-title">{title}</h1>}
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}
        {buttonText && buttonLink && (
          <a href={buttonLink} className="banner-button">
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Banner;