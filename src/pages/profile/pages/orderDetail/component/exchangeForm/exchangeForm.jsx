import React, { useState } from 'react';
import './exchangeForm.css'; // Import your CSS file

const ExchangeForm = () => {
  const [reason, setReason] = useState('');
  const [problem, setProblem] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');


  const handleReasonChange = (event) => {
    setReason(event.target.value);
    setProblem(''); // Reset problem when reason changes
  };

  const handleProblemChange = (event) => {
    setProblem(event.target.value);
  };

  const getProblemOptions = () => {
    
      return ['Product Damaged','Color Mismatch', 'Size Issue', 'Material Defect', 'Other'];
    
    
  };

  const getColorOptions = () => {
    if (problem === 'Color Mismatch' || problem === 'Incorrect Color') {
      return ['Red', 'Blue', 'Green', 'Black', 'White']; // Example colors
    }
    return [];
  };

  const getSizeOptions = () => {
    if (problem === 'Size Issue' || problem === 'Incorrect Size') {
      return ['S', 'M', 'L', 'XL', 'XXL']; // Example sizes
    }
    return [];
  };

  return (
    <div className="exchange-form">
      <h2>Exchange Request</h2>

     

      <div className="form-group">
        <label htmlFor="problem">Reason for exchanging the product?</label>
        <select id="problem" value={problem} onChange={handleProblemChange}>
          <option value="">Select a Problem</option>
          {getProblemOptions().map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Describe the Problem (required)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Comment here..."
        />
      </div>

      {getColorOptions().length > 0 && (
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <select id="color" value={color} onChange={e => setColor(e.target.value)}> {/* Updated */}
            <option value="">Select a Color</option>
            {getColorOptions().map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      {getSizeOptions().length > 0 && (
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select id="size" value={size} onChange={e => setSize(e.target.value)}> {/* Updated */}
            <option value="">Select a Size</option>
            {getSizeOptions().map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      

      <button type="submit" className="continue-button">
        Continue
      </button>
    </div>
  );
};

export default ExchangeForm;