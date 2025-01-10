import React, { useState } from 'react';
import AddressList from './component/AddressList/AddressList';
import './savedAddress.css';

const SavedAddressPage = () => {
  const [addresses, setAddresses] = useState([
    '123 Main Street, City, Country 123 Main Street, City, Country',
    '456 Another Road, City, Country',
    '',
    '',
    '',
    '',
  ]);

  const handleEdit = (index) => {
    const newAddress = prompt('Enter new address:', addresses[index]);
    if (newAddress !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[index] = newAddress;
      setAddresses(updatedAddresses);
    }
  };

  const handleAdd = () => {
    const newAddress = prompt('Enter new address:');
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
    }
  };

  return (
    <div className="saved-address-page">
      <div className="header">
        <h2>Saved Address</h2>
        <button className="add-address-button" onClick={handleAdd}>
      Add Address +
    </button>
      </div>
      <AddressList addresses={addresses} onEdit={handleEdit} />
    </div>
  );
};

export default SavedAddressPage;
