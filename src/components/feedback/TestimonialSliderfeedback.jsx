// TestimonialSlider.jsx
import React, { useState, useEffect } from 'react';
import './TestimonialSliderfeedback.css';
import { Icon } from '@iconify/react';
const testimonials = [
  {
    text: "I recently purchased this beautiful white embroidered kurti...The fabric is soft and comfortable, and the intricate embroidery adds such an elegant touch.",
    author: "Jane Bennet",
    title: "Fashion Model",
    image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/14334755-dbc4-456e-aec8-043257e724ed/bdbe3802-c024-40be-bf75-fd800547d677.png" },
  {
    text: "Absolutely love the quality and design of the products! The customer service was also excellent. Highly recommend!",
    author: "Elizabeth Darcy",
    title: "Software Engineer",
    image: "https://media.gettyimages.com/id/956842252/photo/portrait-of-a-confident-muslim-girl.jpg?s=1024x1024&w=gi&k=20&c=XioTivqw2V-blnU72VavCAbC7ZS5XNn3ohYWaxPj7ms="  },
  {
    text: "The kurti I bought is even more stunning in person. The details are exquisite, and the fit is perfect. I'll definitely be buying more!",
    author: "Charlotte Lucas",
    title: "Teacher",
    image: "https://media.gettyimages.com/id/821880524/photo/fashion-pretty-cool-girl-drinks-from-cup-over-pink-background.jpg?s=1024x1024&w=gi&k=20&c=8v3Fkqdf2cNcBHXL2tvkMIo2bAhDBAwU-KY3EYeyr3Y=",
  },
    {
    text: "I recently purchased this beautiful white embroidered kurti from AVR Clothing, and I’m absolutely in love with it! The fabric is soft and comfortable, and the intricate embroidery adds such an elegant touch. Paired with the gold palazzo, it’s perfect for festive occasions. The fit was true to size, and I received so many compliments when I wore it.",
    author: "Caroline Bingley",
    title: "Artist",
    image: "https://media.gettyimages.com/id/1419072112/photo/stylish-woman-in-front-of-plain-background.jpg?s=1024x1024&w=gi&k=20&c=0jKz0sMrfNQxaanQzOaohxjNawNLqZLpTgSFQPvR3q0=",
  },
];



const TestimonialSlider = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextTestimonial();
        }, 5000)

        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className="testimonial-container">
            <div className="testimonial-heading">
                <h2>What our Customers Say</h2>
                <p>We value our customer's feedback to provide the best service.</p>
            </div>
            <div className="testimonial-slider">
                <div className="testimonial">
                    <div className="testimonial-image">
                        <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].author} />
                    </div>
                    <div className="testimonial-content">
                        <div className="quote-icon">“</div>
                        <br/>
                        <p className="testimonial-text">{testimonials[currentTestimonial].text}</p>
                        <div className="testimonial-author">
                            <p className="author-name">{testimonials[currentTestimonial].author}</p>
                            <p className="author-title">{testimonials[currentTestimonial].title}</p>
                        </div>
                    </div>
                    <div className="testimonial-controls">
                  <button onClick={prevTestimonial} className="control-button prev-button">
                    <Icon icon="ic:round-chevron-left" />
                  </button>
                  <button onClick={nextTestimonial} className="control-button next-button">
                    <Icon icon="ic:round-chevron-right" />
                  </button>
                </div>
                </div>
                
            </div>
        </div>
    );
};

export default TestimonialSlider;
