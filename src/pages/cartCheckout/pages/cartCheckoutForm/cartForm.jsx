import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./cartForm.css";
import { domain } from "../../../../api.service";
import { rootSummary } from "../../component/cartSummary/cartSummary";
import AddressList from "../savedAddressList/addressList";

const CartForm = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const summary = rootSummary;

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

  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null); // Track selected address
  const [isAddressFormVisible, setAddressFormVisibility] = useState(false);

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  const fetchUserAddresses = async () => {
    const token = sessionStorage.getItem("authToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData ? userData.id : "";

    if (!userId) {
      alert("User not logged in.");
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

      const data = await response.json();
      if(data.addresses.length > 0){
        console.log("Address found");
        setAddressFormVisibility(true);
      }
console.log(data);
      if (data.success && data.addresses.length > 0) {
        setUserAddresses(data.addresses);
      } else {
        setUserAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("authToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData ? userData.id : "";

    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${domain}/user/addAddress`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          address: addressData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Address added successfully!");
        fetchUserAddresses(); // Refresh the address list
      } else {
        alert(data.message || "Failed to add address.");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      alert("An error occurred while adding the address.");
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Set the selected address
  };

  return (
    <div className="cartform-cart-form">
      <h1 className="cartform-cart-title">Cart Details</h1>
      <div className="cartform-steps">
        <div className="cartform-step cartform-active">
          <span className="cartform-step-circle active-circle">1</span>
          <span>Cart Details</span>
        </div>
        <div className="cartform-step cartform-active">
          <span className="cartform-step-circle current-circle">2</span>
          <span>Checkout Details</span>
        </div>
        <div className="cartform-step">
          <span className="cartform-step-circle">3</span>
          <span>Order Complete</span>
        </div>
      </div>

      <div className="cartform-form-container">
        {isAddressFormVisible? (
          <div className="cartform-saved-addresses">
            <h2>Saved Addresses</h2>
            <AddressList addresses={userAddresses} onAddressSelect={handleSelectAddress} onAddAddress={() => setAddressFormVisibility(false)} />
            {/* <ul>
              {userAddresses.map((address, index) => (
                <li key={index} onClick={() => handleSelectAddress(address)}>
                  <div
                    style={{
                      border: selectedAddress === address ? "2px solid blue" : "1px solid #ddd",
                      padding: "10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <p>
                      {address.firstName} {address.lastName}
                    </p>
                    <p>{address.streetAddress}</p>
                    <p>
                      {address.townCity}, {address.state}, {address.country} - {address.zipCode}
                    </p>
                    <p>{address.phoneNumber}</p>
                    <p>{address.email}</p>
                  </div>
                </li>
              ))}
            </ul> */}
          </div>
        ) : (
          <div className="cartform-form-flex">
            <form
              style={{ padding: "10px", border: "1px solid #ddd", background: "#FFFFFF", borderRadius: "10px" }}
              onSubmit={handleAddAddress}
              className="cartform-contact-form"
            >
              <h2>Contact Information</h2>
              <div className="cartform-form-group">
                <input type="text" name="firstName" placeholder="First Name" className="cartform-input-field" value={addressData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" className="cartform-input-field" value={addressData.lastName} onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }} className="cartform-form-group">
                <input type="text" name="phoneNumber" placeholder="Phone Number" className="cartform-input-field cartform-phone-email-input" value={addressData.phoneNumber} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email Address" className="cartform-input-field cartform-phone-email-input" value={addressData.email} onChange={handleChange} />
              </div>

              <h2>Shipping Address</h2>
              <div className="cartform-form-group">
                <input type="text" name="streetAddress" placeholder="Address" className="cartform-input-field" value={addressData.streetAddress} onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }} className="cartform-form-group">
                <select name="country" className="cartform-input-field" value={addressData.country} onChange={handleChange}>
                  <option value="">Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
                <input type="text" name="state" placeholder="State" className="cartform-input-field cartform-state-input" value={addressData.state} onChange={handleChange} />
              </div>
              <div className="cartform-form-group">
                <input type="text" name="townCity" placeholder="City" className="cartform-input-field" value={addressData.townCity} onChange={handleChange} />
                <input type="text" name="zipCode" placeholder="Pin Code" className="cartform-input-field" value={addressData.zipCode} onChange={handleChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }} className="cartform-form-group">
                <input type="checkbox" id="cartform-setDefault" name="isDefault" checked={addressData.isDefault} onChange={handleChange} />
                <label htmlFor="cartform-setDefault">Set as Default Address</label>
              </div>

              <button type="submit" className="cartform-checkout-btn">
                Add Address
              </button>
            </form>
          </div>
        )}
        <div className="cartform-cart-summary">
          <h2>Cart Summary</h2>
          <ul>
            <li>
              <span>Order Total</span>
              <span>₹{summary.orderTotal}</span>
            </li>
            <li>
              <span>Delivery Charges</span>
              <span>₹40</span>
            </li>
            <li>
              <span>GST and Taxes</span>
              <span>₹{summary.tax}</span>
            </li>
            <li className="cartform-total-amount">
              <span>Total Amount</span>
              <span>₹{summary.orderTotal + 40 + parseFloat(summary.tax)}</span>
            </li>
          </ul>
          <button className="cartform-checkout-btn"  onClick={() => {
                if (selectedAddress) {
                  // Proceed with the selected address
                  alert(`Selected Address: ${selectedAddress.streetAddress}`);
                  navigator("/sucess-order");
                } else {
                  alert("Please select an address.");
                }
              }}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartForm;