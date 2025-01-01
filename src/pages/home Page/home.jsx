// pages/Home.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../component/navigationBar/Navbar';
import Footer from '../../component/footer/Footer';
import './home.css';
import Features from './components/features/Features';
import Banner from './components/banner/Banner';
import ProductGrid from './components/productsGrid/ProductGrid';
import TestimonialSlider from './components/feedback/TestimonialSliderfeedback';
import InstagramFollow from './components/socialMedia/InstagramFollow';

const Home = () => {
 

  return (
    <div className="home-container"> {/* Added a container for smooth transition */}
        
        <Banner/>
      <Features />
      <div>
      <ProductGrid
            title="Latest Arrivals"
            description="Stay ahead of the fashion curve with our exclusive collection of fresh and stylish new arrivals"
            // products={dummyProducts}
        />
        <br/>
      <ProductGrid
            title="Top Collections"
            description="Discover the perfect blend of style, comfort, and elegance in our collection."
            // products={dummyProducts}
        /></div>


        {/* banner */}
        <div className='secBannerContainer'>
       <div className='secBanner' style={{backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>

       </div>
       </div>
       

       <TestimonialSlider />
       <InstagramFollow />
      
      {/* <Footer /> */}
    </div>
  );
};

export default Home;