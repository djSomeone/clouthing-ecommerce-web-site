import {React,useState,useEffect} from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import CartItem from '../../component/cartItem/cartItem';
import CartSummary from '../../component/cartSummary/cartSummary';
import { domain } from '../../../../api.service';
import './cartDetails.css';

const CartDetails = () => {
  const navigate = useNavigate();
  const location=useLocation();
  const [products, setCartItems] = useState([]);
  const fetchCart = async () => {
          const token = sessionStorage.getItem('authToken'); // Get token from sessionStorage
          const userData = JSON.parse(sessionStorage.getItem('userData')); // Parse user data
          const userId = userData ? userData.id : ''; // Extract userId from sessionStorage
  
          if (userId) {
              try {
                  const response = await fetch(`${domain}/user/getCartProduct/${userId}`, {
                      headers: {
                          Authorization: `Bearer ${token}`, // Pass token in header for authentication
                      },
                  });
  
                  if (!response.ok) {
                      throw new Error('Failed to fetch wishlist'); // Throw error if response is not ok
                  }
  
                  const data = await response.json();
                  console.log(data);
  
                  if (data && data.cart) {
                      // Process wishlist items
                      const processedItems = data.cart.map(item => ({
                          id: item._id,
                          productId: item.productId._id,
                          name: item.productId.name,
                          price: item.productId.price,
                          size: item.size,
                          color: item.color,
                          quantity: item.quantity,
                          image: item.productId.images[0], // Assuming the first image is the main one
                      }));
  
                      setCartItems(processedItems); // Set the processed wishlist items to state
                  }
              } catch (error) {
                  console.error(error);
                  navigate('/login'); // Redirect to login page on error
              }
          } else {
              console.error('User ID not found in session storage');
              navigate('/login'); // Redirect to login page if userId is not found
          }
      };
      useEffect(() => {
          fetchCart(); // Fetch wishlist items on component mount
      }, [navigate]);
  
  // console.log("products",products);
  // const products = [
  //   {
  //     image: 'https://via.placeholder.com/100',
  //     name: 'Product Name',
  //     color: 'Teal Blue',
  //     size: 'XS',
  //     quantity: 1,
  //     price: '2145₹',
  //     subtotal: '2145₹',
  //   },
  //   {
  //       image: 'https://via.placeholder.com/100',
  //       name: 'Product Name',
  //       color: 'Teal Blue',
  //       size: 'XS',
  //       quantity: 1,
  //       price: '2145₹',
  //       subtotal: '2145₹',
  //     }
  //   // Add more products as needed
  // ];
  console.log("products",products);
  const summary = {
    orderTotal: 400,
    deliveryCharges: 40,
    tax: 8,
    totalAmount: 448,
  };

  return (
    <div className="cart-details">
      <h1>Cart Details</h1>
      <div className="cart-progress">
  <span className="step step-active"><span className='circleforone'>1</span> Cart Details</span>
  <span className="step step-inactive"><span className='circleforone'>2</span> Checkout details</span>
  <span className="step step-inactive"><span className='circleforone'>3</span> Order complete</span>
</div>

      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-header">
            <span style={{textAlign:"jus"}}>Product</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Subtotal</span>
          </div>
          {products.map((product, index) => (
            <CartItem key={index} product={product} />
          ))}
        </div>
        <CartSummary summary={summary} />
      </div>
    </div>
  );
};

export default CartDetails;