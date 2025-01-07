// Banner.jsx
import React, { useEffect, useState } from 'react';
import './Banner.css';


const Banner = ({}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch the image URL from the API
    const fetchBannerImage = async () => {
      try {
        const response = await fetch('https://clouthing-ecommerce-backend.onrender.com/user/banner');
        const data = await response.json();
        if (data.url) {
          setImageUrl(data.url);
        } else {
          console.error('Image URL not found in response');
        }
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchBannerImage();
  }, []);

  return (
    <div
      className="banner-container"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
 
    </div>
  );
};

export default Banner;
