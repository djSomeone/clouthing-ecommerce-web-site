// pages/Home.js
import React from 'react';
import Navbar from '../../components/navigationBar/Navbar';
import Footer from '../../components/footer/Footer';
import './home.css';
import Features from '../../components/features/Features';
import Banner from '../../components/banner/Banner';
import ProductGrid from '../../components/productsGrid/ProductGrid';
import TestimonialSlider from '../../components/feedback/TestimonialSliderfeedback';

const Home = () => {
  return (
    <div>
        <Navbar />
        <Banner/>
      <Features />
      {/* top collection and arrivals */}
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
       <div className='secBanner' style={{height:"400px",backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}}>

       </div>
       </div>

       <TestimonialSlider />
      <Footer />
    </div>
  );
};

export default Home;
