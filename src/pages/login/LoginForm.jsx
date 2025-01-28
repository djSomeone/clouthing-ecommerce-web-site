import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { domain } from '../../api.service';
import axios from 'axios'; // Ensure Axios is installed: npm install axios

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${domain}/user/login`, { email });

      // Display API response to the user
      alert(`OTP sent successfully to ${response.data.data.email}`);
      navigate('/verify', { state: { email: email } });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Login</h2>
        <p style={{ fontWeight: 600, color: 'black' }}>Log In to Save Your Favorite Kurtis</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Sending...' : 'Continue'}
          </button>
        </form>

        {/* Register Link */}
        <p className="register-link">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')} className="register-text">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
