import React from 'react';
import './AddressCard.css';

const AddressCard = ({ address, onEdit }) => {
  return (
    <div className="address-card">
      <div className="address-details">
        {address ? (
          <p style={{textAlign:"justify"}}>{address}</p>
        ) : (
          <p className="empty-address">No Address Provided</p>
        )}
      </div>
      <button className="edit-button" onClick={onEdit}>
        <span className="edit-icon">✎</span> Edit
      </button>
    </div>
  );
};

export default AddressCard;