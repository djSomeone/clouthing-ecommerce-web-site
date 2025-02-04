import React, { useState,useEffect } from 'react';
import './addressList.css';

const AddressList = ({ addresses, onAddressSelect, onAddAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    onAddressSelect(address._id);
  };
  useEffect(() => {
    const defaultAddress = addresses.find((address) => address.isDefault);
    setSelectedAddress(defaultAddress || null); // Select default or null if none found
  }, [addresses]);

  return (
    <div className="address-list-cart">
      <button className="add-address-btn" onClick={onAddAddress}>
        Add Address +
      </button>

      <ul className='address-list-root'>
        {addresses.map((address, index) => (
          <li key={address._id} className={`address-item ${selectedAddress === address ? 'selected' : ''}`}>
            <input
              type="radio"
              name="address"
              id={`address-${index}`}
              checked={selectedAddress === address}
              onChange={() => handleAddressSelect(address)}
            />
            <label htmlFor={`address-${index}`}>
              <strong>{`${address.firstName} ${address.lastName}`}</strong>
              <p>{address.phoneNumber}</p>
              <p>
                {address.streetAddress}, {address.townCity}, {address.state}, {address.country} - {address.zipCode}
              </p>
              {address.isDefault && <p>Default Address</p>}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;