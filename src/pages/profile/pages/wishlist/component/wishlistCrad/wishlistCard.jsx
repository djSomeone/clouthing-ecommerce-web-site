import { useEffect, useRef, useState } from "react";
import './wishlistCard.css';
import { domain } from "../../.././../../../api.service";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const deleteWishlistItem = async (wishlistItemId, fetchWishlist) => {
  const token = sessionStorage.getItem("authToken");
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData ? userData.id : "";

  if (!userId) {
    console.error("User ID not found");
    return;
  }

  try {
    const response = await fetch(`${domain}/user/deleteWishlist`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        wishlistItemId: wishlistItemId,
      }),
    });

    const data = await response.json();

    if (data.success) {
      fetchWishlist();
      alert("Wishlist item deleted successfully.");
    } else {
      console.error("Failed to delete wishlist item:", data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error deleting wishlist item:", error);
  }
};
const WishlistProductCard = ({ product, fetchWishlist }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const debounceTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  const updateWishlistQuantity = (newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity cannot be less than 1");
      return;
    }

    setQuantity(newQuantity);

    // Cancel previous API call if any
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set a new delayed API call
    debounceTimer.current = setTimeout(async () => {
      const token = sessionStorage.getItem("authToken");
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const userId = userData ? userData.id : "";

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      console.log({userId: userId,
        productId: product.productId,
        quantity: newQuantity,
        color: product.color,
        size: product.size,});
      const response = await fetch(`${domain}/user/addToWishlist`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.productId,
          quantity: newQuantity,
          color: product.color,
          size: product.size,
        }),
      });

      const data = await response.json();
      console.log("pdate",data);
      if (data.message) {
        console.log("Wishlist item updated successfully.");
        fetchWishlist();
      } else {
        console.error("Failed to update wishlist item");
      }
    }, 500); // Debounce delay of 500ms
  };

  async function handleAddToCart({product}) {
    // Retrieve userId from sessionStorage
    alert("Please wait...")
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
        navigate('/login');  // Redirect to login if user data is not found
        alert('User not logged in');
        return;
    }

    const { id: userId } = JSON.parse(userData);  // Extract userId from stored data

 

    try {
        const response = await axios.post(
            `${domain}/user/addToCart`,  // Use the API endpoint for adding to cart
            {
                userId: userId,  // Use the userId retrieved from sessionStorage
                productId: product.productId,  // Get productId from the fetched product details
                quantity: product.quantity,
                color: product.color,
                size: product.size
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
                }
            }
        );

        // Update the cart state based on the API response
     
        alert(response.data.message);  // Show success message
    } catch (error) {
        navigate('/login');  // Redirect to login if unauthorized
        console.error("Error adding to cart:", error);
        alert('There was an issue adding the item to your cart. Please try again.');
    }
};

  return (
    <div className="wishlistProductCard">
      <div className="wishlistProductCard-content">
        <div
          className="wishlistProductCard-image"
          style={{ backgroundImage: `url(${product.image})` }}
        />
        <div className="wishlistProductCard-details">
          <div className="wishlistProductCard-name">
            <strong>{product.name}</strong>
          </div>
          <br />
          <div className="wishlistProductCard-info">
            <div>Colour - {product.color}</div>
            <br />
            <div>Size - {product.size}</div>
          </div>
          <div className="wishlistProductCard-remove" onClick={() => deleteWishlistItem(product.id, fetchWishlist)}>
            Remove
          </div>
        </div>
      </div>

      {/* Quantity and Update Actions */}
      <div className="wishlistProductCard-actions">
        <div className="wishlistProductCard-quantity-selector">
          <button style={{ border: "none" }} onClick={() => updateWishlistQuantity(quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button style={{ border: "none" }} onClick={() => updateWishlistQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      <div className="wishlistProductCard-price-button">
        <div className="wishlistProductCard-price">₹{product.price}</div>
        <button className="wishlistProductCard-add-to-cart" onClick={()=>handleAddToCart({product})}>Add to Cart</button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
