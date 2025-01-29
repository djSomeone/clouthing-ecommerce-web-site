// import { useState } from "react";
// import "./myOrder.css"
// import {OrderCard} from "./component/orderCard/orderCard";

// import OrderDetail from "../orderDetail/orderDetail";
// import HorizontalNavBar from "./component/orderNavBar/orderNavBar";
// const orderData = [
//   {
//     orderId: "111111111",
//     orderDate: "1 June 2023 9:15 AM",
//     estimatedDeliveryDate: "7 June 2023",
//     orderStatus: "Delivered",
//     paymentMethod: "Credit Card",
//     products: [
//       {
//         id: "p1", // Unique ID for the product
//         productName: "Red Hoodie",
//         color: "Red",
//         size: "L",
//         quantity: 1,
//         price: "3499",
//         productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
//       },
//     ],
//   },
//   {
//     orderId: "222222222",
//     orderDate: "3 June 2023 11:30 AM",
//     estimatedDeliveryDate: "9 June 2023",
//     orderStatus: "OnTheWay",
//     paymentMethod: "PayPal",
//     products: [
//       {
//         id: "p2", // Unique ID for the product
//         productName: "White Sneakers",
//         color: "White",
//         size: "XL",
//         quantity: 4,
//         price: "4999",
//         productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
//       },
//     ],
//   },
//   {
//     orderId: "333333333",
//     orderDate: "4 June 2023 4:45 PM",
//     estimatedDeliveryDate: "10 June 2023",
//     orderStatus: "Packaging",
//     paymentMethod: "Debit Card",
//     products: [
//       {
//         id: "p3", // Unique ID for the product
//         productName: "Green Backpack",
//         color: "Green",
//         size: "M",
//         quantity: 1,
//         price: "2999",
//         productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
//       },
//     ],
//   },
//   {
//     orderId: "444444444",
//     orderDate: "5 June 2023 2:00 PM",
//     estimatedDeliveryDate: "11 June 2023",
//     orderStatus: "Placed",
//     paymentMethod: "Credit Card",
//     products: [
//       {
//         id: "p4", // Unique ID for the product
//         productName: "Yellow Jacket",
//         color: "Yellow",
//         size: "M",
//         quantity: 1,
//         price: "5999",
//         productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
//       },
//       {
//         id: "p5", // Unique ID for the product
//         productName: "Yellow Jacket",
//         color: "Yellow",
//         size: "M",
//         quantity: 1,
//         price: "5999",
//         productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
//       },
//     ],
//   },
//   {
//     orderId: "555555555",
//     orderDate: "6 June 2023 7:20 AM",
//     estimatedDeliveryDate: "12 June 2023",
//     orderStatus: "Delivered",
//     paymentMethod: "Cash on Delivery",
//     products: [
//       {
//         id: "p6", // Unique ID for the product
//         productName: "Pink Dress",
//         color: "Pink",
//         size: "S",
//         quantity: 1,
//         price: "4599",
//         productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
//       },
//     ],
//   },
//   {
//     orderId: "666666666",
//     orderDate: "7 June 2023 6:10 PM",
//     estimatedDeliveryDate: "13 June 2023",
//     orderStatus: "OnTheWay",
//     paymentMethod: "Credit Card",
//     products: [
//       {
//         id: "p7", // Unique ID for the product
//         productName: "Brown Leather Shoes",
//         color: "Brown",
//         size: "XXL",
//         quantity: 1,
//         price: "6999",
//         productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
//       },
//     ],
//   },
// ];


// const MyOrders = () => {
//   const [activeTab, setActiveTab] = useState('ongoing');
//   const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
//   const handleViewDetails = (order) => {
//     setSelectedOrderDetail(order); // Update state with selected order ID
//   }
//   const handleCloseDetails = () => {
//     setSelectedOrderDetail(null); // Clear selected order ID to hide details
//   };

//   const filteredOrders = () => {
//   if (activeTab === 'all') {
//     return orderData; // Return all orders if activeTab is 'all'
//   } else if (activeTab === 'completed') {
//     // Filter only delivered orders when activeTab is 'completed'
//     return orderData.filter((order) => order.orderStatus === 'Delivered');
//   } else {
//     // Filter non-delivered orders for other tabs
//     return orderData.filter((order) => order.orderStatus !== 'Delivered');
//   }
// };
//   return (
//    <div className="myOrder-root-container">
//      {!(selectedOrderDetail) && (<div style={{height:"90%"}}>
//       <HorizontalNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
//       <div className="myOrder-products">
//         {filteredOrders().map((order) => (
//           <div key={order.orderId}> {/* Wrap each OrderCard in a div */}
//             <OrderCard order={order} handleViewDetail={handleViewDetails} />
//           </div>
//         ))}
//       </div>
//     </div>)}
//     {selectedOrderDetail && <OrderDetail orderDetails={selectedOrderDetail} handleCloseDetails={handleCloseDetails} />}
//    </div>

//     );
// }
// export default MyOrders;
import { useEffect, useState } from "react";
import "./myOrder.css";
import {domain} from "../../../../api.service";
import { OrderCard } from "./component/orderCard/orderCard";
import OrderDetail from "../orderDetail/orderDetail";
import HorizontalNavBar from "./component/orderNavBar/orderNavBar";
import { useNavigate } from "react-router-dom"; // Ensure you import the navigation hook

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const token = sessionStorage.getItem("authToken");
console.log("token",token);
      console.log("userData",userData.id);
      if (!token || !userData) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      const userId = userData.id;
      const API_URL = `${domain}/user/user-orders/${userId}`;
console.log("API_URL",API_URL);
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response",response);
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          
            // alert("Session expired. Please log in again.");
            navigate("/login");
            console.log("Error fetching orders:", response.statusText);
        
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrderDetail(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrderDetail(null);
  };

  const filteredOrders = () => {
    if (activeTab === "all") return orders;
    if (activeTab === "completed") return orders.filter(order => order.orderStatus === "delivered");
    return orders.filter(order => order.orderStatus !== "delivered");
  };

  return (
    <div className="myOrder-root-container">
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : !selectedOrderDetail ? (
        <div style={{ height: "90%" }}>
          <HorizontalNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="myOrder-products">
            {filteredOrders().map((order) => (
              <div key={order._id}>
                <OrderCard order={order} handleViewDetail={handleViewDetails} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <OrderDetail
          orderDetails={selectedOrderDetail}
          handleCloseDetails={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default MyOrders;

