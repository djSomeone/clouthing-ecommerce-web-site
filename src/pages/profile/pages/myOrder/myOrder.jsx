import { useState } from "react";
import "./myOrder.css"
import OrderCard from "./component/orderCard/orderCard";
import HorizontalNavBar from "./component/orderNavBar/orderNavBar";
const orderData = [
    {
      orderId: "123456789",
      orderDate: "2 June 2023 2:40 PM",
      estimatedDeliveryDate: "8 June 2023",
      orderStatus: "Ongoing",
      paymentMethod: "Debit Card",
      productName: "Blue T-Shirt",
      color: "Teal Blue",
      size: "XS",
      quantity: 1,
      total: "2145",
      productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png',
    },
    {
      orderId: "987654321",
      orderDate: "5 June 2023 10:00 AM",
      estimatedDeliveryDate: "12 June 2023",
      orderStatus: "Ongoing",
      paymentMethod: "Credit Card",
      productName: "Black Hat",
      color: "Black",
      size: "M",
      quantity: 2,
      total: "1599",
      productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p3_xtzfsf.png',
    },
    {
      orderId: "555555555",
      orderDate: "1 June 2023 1:00 PM",
      estimatedDeliveryDate: "7 June 2023",
      orderStatus: "Completed",
      paymentMethod: "Debit Card",
      productName: "Red Dress",
      color: "Red",
      size: "L",
      quantity: 1,
      total: "2999",
      productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png', // Replace with actual image URL
    },
    {
      orderId: "444444444",
      orderDate: "4 June 2023 3:30 PM",
      estimatedDeliveryDate: "10 June 2023",
      orderStatus: "Completed",
      paymentMethod: "Credit Card",
      productName: "Blue Jeans",
      color: "Blue",
      size: "M",
      quantity: 2,
      total: "1299",
      productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411888/p1_rwh9am.png', // Replace with actual image URL
    },
    {
      orderId: "333333333",
      orderDate: "3 June 2023 11:00 AM",
      estimatedDeliveryDate: "9 June 2023",
      orderStatus: "Ongoing",
      paymentMethod: "Debit Card",
      productName: "White Sneakers",
      color: "White",
      size: "40",
      quantity: 1,
      total: "899",
      productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p2_yvzi4c.png', // Replace with actual image URL
    },
    {
      orderId: "222222222",
      orderDate: "1 June 2023 9:00 AM",
      estimatedDeliveryDate: "7 June 2023",
      orderStatus: "Completed",
      paymentMethod: "Credit Card",
      productName: "Black Sunglasses",
      color: "Black",
      size: "One Size",
      quantity: 1,
      total: "499",
      productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p2_yvzi4c.png', // Replace with actual image URL
    },
    {
      orderId: "111111111",
      orderDate: "6 June 2023 1:00 PM",
      estimatedDeliveryDate: "13 June 2023",
      orderStatus: "Ongoing",
      paymentMethod: "Debit Card",
      productName: "Brown Leather Bag",
      color: "Brown",
      size: "Medium",
      quantity: 1,
      total: "3599",
      productImage: 'https://res.cloudinary.com/dmaoweleq/image/upload/v1736411889/p2_yvzi4c.png', // Replace with actual image URL
    },
  ];
  
 const MyOrders = () => {
    const [activeTab, setActiveTab] = useState('ongoing');
    const filteredOrders = () => {
        if (activeTab === 'all') {
          return orderData;
        } else {
          return orderData.filter((order) => order.orderStatus.toLowerCase() === activeTab);
        }
      };
    return (
        <div className="myOrder-root-container">
            <HorizontalNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="myOrder-products">
            {filteredOrders().map((order) => (
          <div key={order.orderId}> {/* Wrap each OrderCard in a div */}
            <OrderCard order={order} />
          </div>
        ))}
            </div>
        </div>
    )
}
export default MyOrders;