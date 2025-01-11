import "./profile.css";
import React, { useState, useEffect } from 'react';
import NavBar from "./component/navBar/navBar";
import MyOrders from "./pages/myOrder/myOrder";
import Wishlist from "./pages/wishlist/wishlist";
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy";
import SavedAddressPage from "./pages/savdAddress/savedAddress";

const Profile = () => {
  const [activeItem, setActiveItem] = useState('myOrders');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Adjust breakpoint as needed

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderPageContent = () => {
    switch (activeItem) {
      case 'myOrders':
        return <MyOrders />;
      case "wishlist":
        return <Wishlist />;
      case "savedAddress":
        return <SavedAddressPage />;
      case "privacyPolicy":
        return <PrivacyPolicy />;
      default:
        return null;
    }
  };

  return (
    <div className="Profile-root-Container">
      {isMobile ? (
        // Mobile View
        <div className="Profile-Pages">
          {renderPageContent()}
        </div>
      ) : (
        // Desktop View
        <>
          <div className="Profile-Nav">
            <NavBar activeItem={activeItem} setActiveItem={setActiveItem} />
          </div>
          <div className="Profile-Pages">
            {renderPageContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;