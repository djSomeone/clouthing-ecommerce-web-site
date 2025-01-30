import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import "./wishlist.css";
import WishlistProductCard from './component/wishlistCrad/wishlistCard';
import { domain } from '../../../../api.service';

const Wishlist = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const userId = sessionStorage.getItem("userData") ? JSON.parse(sessionStorage.getItem("userData")).id : '';
  const authToken = sessionStorage.getItem("authToken");

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${domain}/user/wishlist/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("wishlist",data);
        const wishlistProducts = data.wishlist.map(item => ({
          id: item._id,
          productId: item.productId._id,
          name: item.productId.name,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.productId.price,
          image: item.productId.images[0] || '',
        }));
        setProducts(wishlistProducts);
      } else {
        console.error("Failed to fetch wishlist");
      }
    } catch (error) {
      navigate('/login');
      console.error("Error fetching wishlist:", error);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, [userId, authToken]);

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2>Wishlist</h2>
        <div className='wishlist-header-name'>
          <div>Product</div>
          <div>Quantity</div>
          <div>Price</div>
        </div>
      </div>
      <hr color='#ccc'/>
      <div className="wishlist-items">
        {products.map((product) => (
          <WishlistProductCard key={product.id} product={product} fetchWishlist={fetchWishlist}/>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
