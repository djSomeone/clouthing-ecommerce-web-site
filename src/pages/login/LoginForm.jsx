// components/LoginForm.jsx
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here (e.g., send data to server)
        console.log('Email submitted:', email);
        alert(`Email submitted: ${email}`)
        setEmail('')
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Login</h2>
                <p style={{fontWeight:600,color:'black'}}>Log In to Save Your Favorite Kurtis</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder='Enter your email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;