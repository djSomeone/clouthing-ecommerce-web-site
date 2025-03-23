import { useEffect, useState } from "react";
import "./myOrder.css";
import {domain} from "../../../../api.service";
import { OrderCard } from "./component/orderCard/orderCard";
import OrderDetail from "../orderDetail/orderDetail";
import HorizontalNavBar from "./component/orderNavBar/orderNavBar";
import { useNavigate } from "react-router-dom"; // Ensure you import the navigation hook
import { useAlert } from "../../../../component/alert_popup/AlertContext";
const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const showAlert=useAlert().showAlert;
  const fetchOrders = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const token = sessionStorage.getItem("authToken");
console.log("token",token);
    console.log("userData",userData);
    if (!token || !userData) {
      // showAlert("Session expired. Please log in again.");
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
     
      if (response.ok) {
        const data = await response.json();
        console.log("response",data.orders);
        setOrders(data.orders);
      } else {
        if (response.status !== 404) {


          // showAlert("Session expired. Please log in again.");
          navigate("/login");
          console.log("Error fetching orders:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      showAlert("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
          fetchOrders={fetchOrders}
          handleCloseDetails={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default MyOrders;

