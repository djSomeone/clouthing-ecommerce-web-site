// components/loading/LoadingScreen.jsx
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const loadingWords = ["Welcome to Iris", ".", ".", "."];

    return (
      <div className="loading-screen">
        <div className="loading-content">
          {loadingWords.map((word, index) => (
            <span
              key={index}
              className="loading-word"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default LoadingScreen;