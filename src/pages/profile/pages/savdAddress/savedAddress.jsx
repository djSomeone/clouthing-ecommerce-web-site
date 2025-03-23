import React, { useEffect, useState } from 'react';
import AddressList from '../savdAddress/component/AddressList/AddressList';
import './savedAddress.css';
import { domain } from '../../../../api.service';
import { useAlert } from '../../../../component/alert_popup/AlertContext';

const SavedAddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAddressFormVisible, setAddressFormVisibility] = useState(false);
  const showAlert= useAlert().showAlert;
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    streetAddress: "",
    country: "",
    townCity: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });
  const [editingAddressId, setEditingAddressId] = useState(null);

  

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    const token = sessionStorage.getItem("authToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData ? userData.id : "";
console.log("user data:",userData);
    if (!userId) {
      showAlert("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`${domain}/user/getUserAddresses/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log("response:",response);
      const data = await response.json();
      console.log("saved address data:",data.addresses);
      if (data.success) {
        
        setAddresses(data.addresses);
        console.log("after set address:",addresses);
      } else {
        setAddresses([]);
        showAlert(data.message || "No addresses found.");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOrUpdateAddress = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("authToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData ? userData.id : "";

    if (!userId) {
      showAlert("User ID not found. Please log in.");
      return;
    }

    try {
      const apiUrl = editingAddressId
        ? `${domain}/user/updateAddress`
        : `${domain}/user/addAddress`;

      const requestBody = editingAddressId
        ? {
            userId,
            addressId: editingAddressId,
            updatedDetails: addressData,
          }
        : {
            userId,
            address: addressData,
          };

      const response = await fetch(apiUrl, {
        method:  "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        showAlert(editingAddressId ? "Address updated successfully!" : "Address added successfully!");
        fetchUserAddresses(); // Refresh the address list
        setAddressFormVisibility(false);
        setEditingAddressId(null);
      } else {
        showAlert(data.message || "Failed to add/update address.");
      }
    } catch (error) {
      console.error("Error adding/updating address:", error);
    }
  };

  const handleEdit = (address) => {
    setAddressData(address);
    setEditingAddressId(address._id);
    setAddressFormVisibility(true);
  };
  

  const handleAdd = () => {
    setAddressData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      streetAddress: "",
      country: "",
      townCity: "",
      state: "",
      zipCode: "",
      isDefault: false,
    });
    setEditingAddressId(null);
    setAddressFormVisibility(true);
  };

  console.log("befor return addresses:",addresses);
  return (
    <div className="saved-address-page">
      <div className="header">
        <h2>Saved Address</h2>
        {/* <button className="add-address-button" onClick={handleAdd}>
          Add Address +
        </button> */}
      </div>
      {isAddressFormVisible ? (
        <form onSubmit={handleAddOrUpdateAddress} className="address-form">
        {/* <h2>{editingAddressId ? "Update Address" : "Add Address"}</h2> */}
  
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={addressData.firstName}
          onChange={handleInputChange}
        />
  
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={addressData.lastName}
          onChange={handleInputChange}
        />
  
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={addressData.phoneNumber}
          onChange={handleInputChange}
        />
  
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={addressData.email}
          onChange={handleInputChange}
        />
  
        <input
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={addressData.streetAddress}
          onChange={handleInputChange}
        />
  
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={addressData.country}
          onChange={handleInputChange}
        />
  
        <input
          type="text"
          name="townCity"
          placeholder="Town/City"
          value={addressData.townCity}
          onChange={handleInputChange}
        />
  
        <input
          type="text"
          name="state"
          placeholder="State"
          value={addressData.state}
          onChange={handleInputChange}
        />
  
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={addressData.zipCode}
          onChange={handleInputChange}
        />
  
        <div className="button-group">
          <button type="submit">{editingAddressId ? "Update" : "Add"}</button>
          <button type="button" onClick={() => setAddressFormVisibility(false)}>
            Cancel
          </button>
        </div>
      </form>
      ) : (
        // <AddressList addresses={addresses} onAddAddress={handleAdd} onAddressSelect={handleEdit}/>
        <AddressList 
  addresses={addresses} 
  onAddAddress={handleAdd} 
  onAddressSelect={handleEdit} 
  onSetDefault={handleAddOrUpdateAddress}
/>
      )}
    </div>
  );
};

export default SavedAddressPage;
