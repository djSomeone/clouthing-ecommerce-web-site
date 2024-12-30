// pages/ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    console.log("Contact Us Page");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., send data to server)
        console.log("Form Data Submitted", formData);
        alert("Form Submitted (Check console for data)")
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: '',
        })
    };
    // don't add label to text fields, add placeholder instead

    return (
        <div className="contact-us-container">
            <div className="contact-content">
                <h1>Contact Us</h1>
                <p>Use our contact form for inquiries, and we'll get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" id="firstName" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="text" id="lastName" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Phone number" value={formData.phoneNumber} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="form-group message-group">
                        <textarea id="message" name="message" placeholder="Type your message..." value={formData.message} onChange={handleChange} required></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </div>
    );
};
export default ContactUs;