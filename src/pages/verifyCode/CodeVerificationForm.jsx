// components/CodeVerificationForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import './CodeVerificationForm.css';

const CodeVerificationForm = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus on the first input when the component mounts
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, event) => {
        const newCode = [...code];
        const value = event.target.value;

        // Only allow digits
        if (!/^\d*$/.test(value)) {
            return;
        }

        newCode[index] = value;
        setCode(newCode);

        // Move focus to the next input if a digit is entered
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !code[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredCode = code.join('');
        console.log('Entered Code:', enteredCode);
        alert(`Entered Code: ${enteredCode}`)
        setCode(['', '', '', '', '', ''])
        if(inputRefs.current[0]){
            inputRefs.current[0].focus()
        }
    };

    return (
        <div className="code-verification-container">
            <div className="code-verification-content">
                <h2>Enter Code</h2>
                <p>Login Code sent to Email Address</p>
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
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CodeVerificationForm;