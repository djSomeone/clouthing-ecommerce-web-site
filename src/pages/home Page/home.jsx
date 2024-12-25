// pages/Home.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/navigationBar/Navbar';
import Footer from './components/footer/Footer';
import './home.css';
import Features from './components/features/Features';
import Banner from './components/banner/Banner';
import ProductGrid from './components/productsGrid/ProductGrid';
import TestimonialSlider from './components/feedback/TestimonialSliderfeedback';
import InstagramFollow from './components/socialMedia/InstagramFollow';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data)
    setTimeout(() => {
      setLoading(false);
    }, 3500); // 3 seconds
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <span className="loading-word" style={{animationDelay: "0s"}}>Welcome to Iris</span>
          <span className="loading-word" style={{animationDelay: "0.5s"}}>.</span>
          <span className="loading-word" style={{animationDelay: "1.5s"}}>.</span>
          {/* {/* <span className="loading-word" style={{animationDelay: "2s"}}>the</span> */}
          <span className="loading-word" style={{animationDelay: "2s"}}>.</span>
          
          {/* Add more words as needed */}
        </div>
      </div>
    );
  }

  return (
    <div className="home-container"> {/* Added a container for smooth transition */}
        <Navbar />
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
       <div style={{border:"1px solid rgb(186, 186, 186)",borderRadius:"20px" ,margin:"0px 80px"}}>

       </div>
      <Footer />
    </div>
  );
};

export default Home;