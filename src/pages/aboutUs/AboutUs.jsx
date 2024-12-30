// pages/AboutUs.js
import React from 'react';
import './AboutUs.css';
import image1 from '../../asset/aboutus1.png'; // Import your images
import image2 from '../../asset/aboutus2.png';



const AboutUs = () => {
    return (
        <div className="about-us-container">
            <div className="about-content">
                

                <div className="section"> {/* First section: Text + Image */}
                    <div className="text-content">
                        <h1>Welcome to AVR Clothing</h1>
                        <p>AVR Clothing has been engaged in the manufacture of Ethnic Wear since 2013. Founded by Mr. Santosh Yadav, the company's journey has been one of innovation, stylish creation, and exceeding quality consciousness. The company values honesty in interaction, finesse in products, and excellence in creativity, providing value for money. Under his able guidance, we are motivated to keep the standards high and raise the bar further. Collectively, he helped create a brand that was bigger than the dreams and is poised to make a resounding impact.</p>
                    <p>
                    Iris believes every women is special and we try our best to make sure she believes it too. While creating our outfits we keep comfort and elan at top of the list. We want women to feel beautiful in our outfit and wear them with pride. FASHION FEDS STYLE IS ETERNAL
                    </p>
                    </div>
                    <div className="image-content">
                        <img src={image1} alt="Image 1" className="about-image" />
                    </div>
                
                </div>
               <br/>
                <div className="section"> {/* Second section: Image + Text (reverse) */}
                    <div className="image-content">
                        <img src={image2} alt="Image 2" className="about-image" />
                    </div>
                    <div className="text-content">
                    <h2>Ethnic & Eco Fashion Women's Empowerment</h2>
                        <p>Iris believes every woman is special, and we try our best to make sure she believes it too. While creating our outfits, we prioritize comfort and élan. We want women to feel beautiful in our outfits and wear them with pride. FASHION FEDS STYLE IS ETERNAL.</p>
                        <p>Iris is where desi elements create the perfect amalgamation with Western style. We provide you with a channel to access something suitable for your personal style and feel like you are wearing high fashion prêt.</p>
                        <ul className="about-list">
                            <li>Our collection is a mix of traditional and modern styles.</li>
                            <li>We provide a wide range of outfits for every occasion.</li>
                            <li>Our outfits are made with high-quality fabrics.</li>
                            <li>We offer a variety of sizes to cater to all body types.</li>
                        </ul>
                    </div>
                </div>

                

               
                
            </div>
        </div>
    );
};

export default AboutUs;