import React from 'react';
import axios from 'axios';
import { domain } from '../../api.service';
// import { useNavigate } from 'react-router-dom';

async function handlePayment ({ amounts,cartItems,addressId,navigate })  {
   
  try {
    // Get the token and user data from sessionStorage
    const token = sessionStorage.getItem('authToken');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const userId = userData ? userData.id : '';

    // Step 1: Create an order from your backend
    const data={
        userId,  
        totalPrice: amounts , 
        productDetails:cartItems,
        addressId,
      }
      console.log(data);
    const orderResponse = await axios.post(
      `${domain}/user/create-order`, 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Add the token in the headers
        },
      }
    );

    const { razorpayOrderId,orderId } = orderResponse.data;
console.log(orderResponse.data)
    if (!razorpayOrderId) {
      alert("Failed to create an order. Please try again.");
      return;
    }

    // Step 2: Initialize Razorpay payment
    const options = {
      key: 'rzp_test_QoS81L72u1J300',  // Replace with your Razorpay key
      amount: parseFloat(amounts)*100,
      currency: 'INR',
      name: 'Iris Women Clothing',
      description: 'Test Transaction',
      image: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1738147419/lgo_ys4t0z.png',
      order_id: razorpayOrderId,
      handler: async (response) => {
        const paymentData = {
            userId,
         orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        // Step 4: Verify payment and save the order in MongoDB
        try {
          const result = await axios.post(
            `${domain}/user/verify-payment`, 
            paymentData, 
            {
              headers: {
                Authorization: `Bearer ${token}`,  // Add the token in the headers
              },
            }
          );

          if (result.data.success) {
            navigate('/sucess-order', { replace: true });
            alert('Payment Successful! Order has been placed.');
          } else {
            alert('Payment Verification Failed. Please contact support.');
          }
        } catch (verificationError) {
          console.error('Error verifying payment:', verificationError);
          alert('Payment verification failed. Please try again.');
        }
      },
      prefill: {
        name: 'John Doe',
        email: 'iriswomenonline@gmail.com',
        contact: '9029992215',
      },
      theme: {
        color: '#3399cc',
      },
    };

    // Step 3: Open the Razorpay payment modal
    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();

    // Handle payment failure explicitly
    razorpayInstance.on('payment.failed', (response) => {
      console.error('Payment Failed:', response.error);
      alert(`Payment Failed. Reason: ${response.error.description}`);
    });

  } catch (error) {
    console.error('Payment error:', error);
    alert('An error occurred while initiating payment. Please try again later.');
  }
};

export default handlePayment;
