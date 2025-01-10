import React from 'react';
import AddressCard from '../AddressCard/AddressCard';
import './AddressList.css';

const AddressList = ({ addresses, onEdit }) => {
  return (
    <div className="address-list">
      {addresses.map((address, index) => (
        <AddressCard
          key={index}
          address={address}
          onEdit={() => onEdit(index)}
        />
      ))}
    </div>
  );
};

export default AddressList;
