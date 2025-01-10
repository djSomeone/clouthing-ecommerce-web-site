import "./profile.css";
import React, { useState } from 'react';
import NavBar from "./component/navBar/navBar";
import MyOrders from "./pages/myOrder/myOrder";
const Profile=()=>{
    const [activeItem, setActiveItem] = useState('myOrders');

    return (
<div className="Profile-root-Container">
    <div className="Profile-Nav">
        <NavBar activeItem={activeItem} setActiveItem={setActiveItem}/>
    </div>
    <div className="Profile-Pages">
       <MyOrders/>

    </div>
</div>
    );
}
export default Profile;