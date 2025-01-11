// App.js (or your root component)
import React, { useState,useEffect } from 'react';
import Navbar from './component/navigationBar/Navbar.jsx';
import Footer from './component/footer/Footer.jsx';
import Home from './pages/home Page/home.jsx';
// import Wardrobe from './pages/Wardrobe'; // Import your page components
// import OccasionWear from './pages/OccasionWear';
// import CasualWear from './pages/CasualWear';
// import NearbyStores from './pages/NearbyStores';
// import AboutUs from './pages/AboutUs';
import Wishlist from './pages/profile/pages/wishlist/wishlist.jsx';
import MyOrders from './pages/profile/pages/myOrder/myOrder.jsx';
import Profile from './pages/profile/profile.jsx';
import AboutUs from './pages/aboutUs/AboutUs.jsx';
import ContactUs from './pages/contactUs/contactUs.jsx';
import LoginForm from './pages/login/LoginForm.jsx';
import CodeVerificationForm from './pages/verifyCode/CodeVerificationForm.jsx';
import ProductDetails from './pages/productDetail/ProductDetails.jsx';
import LocationPage from './pages/nearbyStor/nearbyStore.js';
import Categories from './pages/categories/categories.jsx';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


import './App.css'

function App() {
    const [activeIndex, setActiveIndex] = useState(0);
    // const [isLoading, setIsLoading] = useState(true);

    const handleNavItemClick = (index) => {
        setActiveIndex(index);
    };

  

    return (
        <div className='App'>
            <Router>
            <Navbar activeIndex={activeIndex} onNavItemClick={handleNavItemClick} />
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/contact-us' element={<ContactUs/>}/>
                <Route path='/about-us' element={<AboutUs/>}/>
                <Route path='/login' element={<LoginForm/>}/>
                <Route path='/verify' element={<CodeVerificationForm/>}/>
                <Route path='/product-details' element={<ProductDetails/>}/>
                <Route path='/nearby-store' element={<LocationPage/>}/>
                <Route path='/categories' element={<Categories/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/my-orders' element={<MyOrders/>}/>
                <Route path='/wishlist' element={<Wishlist/>}/>
            </Routes>
            <Footer/>
            </Router>
        </div>
    );
}

export default App;