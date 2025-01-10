import "./profile.css";
import React, { useState } from 'react';
import NavBar from "./component/navBar/navBar";
import MyOrders from "./pages/myOrder/myOrder";
import Wishlist from "./pages/wishlist/wishlist";
const Profile=()=>{
    const [activeItem, setActiveItem] = useState('myOrders');

    const renderPageContent = () => {
        switch (activeItem) {
          case 'myOrders':
            return <MyOrders />;
          case "wishlist":
            return <Wishlist/>
          default:
            return null; 
        }
      };
    return (
<div className="Profile-root-Container">
    <div className="Profile-Nav">
        <NavBar activeItem={activeItem} setActiveItem={setActiveItem}/>
    </div>
    <div className="Profile-Pages">
    {renderPageContent()}

    </div>
</div>
    );
}
export default Profile;