import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';
import { domain } from '../../api.service'; // Ensure the domain is defined in api.service.js

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${domain}/user/register`,
        { email, name }
      );

      alert(`OTP sent successfully to ${response.data.data.email}`);
      navigate('/verify', { state: { email: email } });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
      setEmail('');
      setName('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <h2>Register</h2>
        <p style={{ fontWeight: 600, color: 'black' }}>Create an account to explore our collection</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
