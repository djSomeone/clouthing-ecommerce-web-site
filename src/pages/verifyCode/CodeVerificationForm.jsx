// components/CodeVerificationForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CodeVerificationForm.css';
import { domain } from '../../api.service';
import { useAlert } from '../../component/alert_popup/AlertContext';

const CodeVerificationForm = () => {
  const showAlert=useAlert().showAlert;
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoding, setIsLoading] = useState(false);
  const { email } = location.state || {}; // Access email from state
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, event) => {
    const newCode = [...code];
    const value = event.target.value;

    if (!/^\d*$/.test(value)) {
      return;
    }

    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    if (enteredCode.length !== 6) {
      setError('Please enter a 6-digit code.');
      return;
    }
setIsLoading(true);
    try {
      const response = await axios.post(
        `${domain}/user/verifyOtp`,
        {
          email,
          otp: parseInt(enteredCode),
        }
      );

      showAlert(response.data.message);

      // Save token and user data in session storage
      sessionStorage.setItem('authToken', response.data.token);
      sessionStorage.setItem('userData', JSON.stringify(response.data.data));
setIsLoading(false);
      // Navigate to a new page or home
      navigate('/'); // Assuming you have a home page route
    } catch (error) {
setIsLoading(false);
      setError('OTP verification failed. Please try again.');
      console.error('Verification Error:', error);
    }
  };

  return (
    <div className="code-verification-container">
      <div className="code-verification-content">
        <h2>Enter Code</h2>
        <p>Login Code sent to {email}</p>
        {error && <p style={{ color: 'red', fontWeight: 600 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="code-inputs">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="code-input"
                required
              />
            ))}
          </div>
          <button type="submit" className="continue-button">
            {isLoding ? 'Loading...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodeVerificationForm;
