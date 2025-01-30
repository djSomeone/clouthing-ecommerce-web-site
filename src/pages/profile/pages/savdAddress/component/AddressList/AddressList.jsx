import React, { useState, useEffect } from 'react';
import { domain } from '../../../../../../api.service';
import '../../../../../cartCheckout/pages/savedAddressList/addressList.css';

const AddressList = ({ addresses, onAddressSelect, onAddAddress, onSetDefault }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const defaultAddress = addresses.find((address) => address.isDefault);
    setSelectedAddress(defaultAddress || null);
  }, [addresses]);

  // const handleAddressSelect = (address) => {
  //   setSelectedAddress(address);
  //   // onSetDefault(address._id);
  // };
  const handleAddressSelect = async (selectedAddress) => {
    // setSelectedAddress(selectedAddress);
    try {
      const token = sessionStorage.getItem("authToken");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData ? userData.id : "";
  
      if (!userId) {
        alert("User not logged in.");
        return;
      }
  
      // Prepare updated address list
      // const updatedAddresses = addresses.map((address) => ({
      //   ...address,
      //   isDefault: address._id === selectedAddress._id,
      // }));
  
      // API request to update the selected address as default
      const response = await fetch(`${domain}/user/updateAddress`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          addressId: selectedAddress._id,
          updatedDetails: { isDefault: true },
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // setAddresses(updatedAddresses);
        setSelectedAddress(selectedAddress);
        alert("Default address updated successfully!");
      } else {
        alert(data.message || "Failed to update default address.");
      }
    } catch (error) {
      console.error("Error updating default address:", error);
    }
  };
  
  return (
    <div className="address-list-cart">
      <button className="add-address-btn" onClick={onAddAddress}>
        Add Address +
      </button>

      <ul className={"address-list-root"} >
        {addresses.map((address, index) => (
          <li key={address._id} className={`address-item ${selectedAddress === address ? 'selected' : ''}`} style={{backgroundColor:"#80808017"}}>
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
              <div style={{ display: "flex", justifyContent: "end" }}>
              <button className="edit-btn" onClick={() => onAddressSelect(address)}>Edit</button>
              </div>
              
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
