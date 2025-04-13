import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rewardList.css";
import product from '../../assets/productimageforproductpage.png';
import profileimg from '../../assets/profile.png';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeliveredPopup, setShowDeliveredPopup] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [courierName, setCourierName] = useState("");
  const [courierTrackingId, setCourierTrackingId] = useState("");
  const [courierTrackingLink, setCourierTrackingLink] = useState("");
  const [activeTab, setActiveTab] = useState("ordered"); // Track the active tab
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://clouthing-ecommerce-backend.vercel.app/user/order-list");
        if (response.data.success) {
          const formattedOrders = response.data.data.map(order => ({
            id: order.orderId,
            date: new Date(order.orderDate).toLocaleString(),
            customerName: order.username,
            total: order.totalPrice,
            paymentMethod: order.paymentMethod,
            orderStatus: order.orderStatus || "ordered", // Default to "ordered" if not provided
            details: {
              products: order.products || [],
              customerDetails: {
                name: order.username,
                email: order.userEmail || "N/A",
              },
              shippingAddress: {
                name: order.username,
                phone: order.userPhone || "N/A",
                address: order.shippingAddress || "N/A",
              },
            },
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Calculate order summary
  const calculateSummary = (products) => {
    const subtotal = products.reduce((sum, product) => sum + (product.price || 0) * (product.quantity || 1), 0);
    const deliveryCharge = 40;
    const tax = subtotal * 0.05; // 5% GST
    const discount = 40;
    const totalAmount = subtotal + deliveryCharge + tax - discount;
    return { subtotal, deliveryCharge, tax, discount, totalAmount };
  };

  // Handle order click to show details
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  // Handle back to orders list
  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  // Handle delete/tracking ID click to show popup
  const handleDeleteClick = (orderId) => {
    setCurrentOrderId(orderId);
    setShowPopup(true);
  };

  // Handle popup form submission
  const handlePopupSubmit = async () => {
    try {
      // Log the request payload and URL
      console.log("Request URL:", `https://clouthing-ecommerce-backend.vercel.app/user/update-order/${currentOrderId}`);
      console.log("Request Payload:", {
        orderStatus: "ontheway",
        courierName,
        courierTrackingId,
        courierTrackingLink,
      });

      // Send PUT request to update order status
      const response = await axios.put(
        `https://clouthing-ecommerce-backend.vercel.app/user/update-order/${currentOrderId}`,
        {
          orderStatus: "ontheway",
          courierName,
          courierTrackingId,
          courierTrackingLink,
        }
      );

      // Log the response
      console.log("API Response:", response.data);

      if (response.data.message === "Order updated successfully") {
        // Update the order status in the local state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === currentOrderId
              ? { ...order, orderStatus: "ontheway" }
              : order
          )
        );
        setShowPopup(false); // Close the popup
        setActiveTab("ontheway"); // Switch to the "On the Way" tab
      }
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      alert("Failed to update order. Please check the console for details.");
    }
  };

  // Handle popup close
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // Handle delivered confirmation popup
  const handleDeliveredClick = (orderId) => {
    setCurrentOrderId(orderId);
    setShowDeliveredPopup(true);
  };

  // Handle delivered confirmation
  const handleDeliveredConfirm = async () => {
    try {
      // Send PUT request to update order status to "delivered"
      const response = await axios.put(
        `https://clouthing-ecommerce-backend.vercel.app/user/update-order/${currentOrderId}`,
        {
          orderStatus: "delivered",
        }
      );

      // Log the response
      console.log("API Response:", response.data);

      if (response.data.message === "Order updated successfully") {
        // Update the order status in the local state
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === currentOrderId
              ? { ...order, orderStatus: "delivered" }
              : order
          )
        );
        setShowDeliveredPopup(false); // Close the popup
        setActiveTab("delivered"); // Switch to the "Delivered" tab
      }
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      alert("Failed to update order. Please check the console for details.");
    }
  };

  // Handle delivered popup close
  const handleDeliveredPopupClose = () => {
    setShowDeliveredPopup(false);
  };

  // Render product items in the order details table
  const renderProductItems = (products) => {
    return products.length > 0 ? (
      products.map((product, index) => (
        <tr key={index}>
          <td style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={product.images[0]} // Use the first image from the product's images array
              alt={product.productName}
              style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '8px' }}
            />
            <div>
              {product.productName}
              <br />
              <small>Color - {product.color || "N/A"}</small><br />
              <small>Size - {product.size || "N/A"}</small>
            </div>
          </td>
          <td>Rs{product.price || 0}</td>
          <td>{product.quantity || 1}</td>
          <td>Rs{(product.price || 0) * (product.quantity || 1)}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>No product details available</td>
      </tr>
    );
  };

  // Render order summary
  const renderSummary = (products) => {
    const { subtotal, deliveryCharge, tax, discount, totalAmount } = calculateSummary(products);
    return (
      <div className="orderDetails-summary">
        <h3>Summary</h3>
        <div className="summary-item">
          <span>Subtotal</span>
          <span>Rs{subtotal}</span>
        </div>
        <div className="summary-item">
          <span>Delivery Charges</span>
          <span>Rs{deliveryCharge}</span>
        </div>
        <div className="summary-item">
          <span>GST and Service Tax</span>
          <span>Rs{tax.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Coupon Discount</span>
          <span>-Rs{discount}</span>
        </div>
        <div className="summary-total">
          <span>Total Amount</span>
          <span>Rs{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    );
  };

  // Render customer and shipping details
  const renderDetails = (details) => (
    <>
      <div className="orderDetails-customer">
        <h3 style={{ color: "#8B909A", fontWeight: "400", paddingLeft: "8px" }}>Customer Details</h3>
        <div className="customer-info">
          <img 
            src={profileimg} 
            alt="Customer Profile" 
            className="customer-profile-img" 
          />
          <div>
            <div style={{ color: "#23272E" }}>{details.customerDetails.name}</div>
            <div style={{ color: "#808191" }}>{details.customerDetails.email}</div>
          </div>
        </div>
      </div>

      <div className="orderDetails-shipping">
        <h3 style={{ color: "#8B909A", fontWeight: "400" }}>Shipping Address</h3>
        <p>{details.shippingAddress.name}</p>
        <p>{details.shippingAddress.phone}</p>
        <p>{details.shippingAddress.address}</p>
      </div>
    </>
  );

  // Filter orders by status and search query
  const filteredOrders = (status) => {
    return orders
      .filter(order => order.orderStatus === status)
      .filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };

  return (
    <div className="ordersList-container">
      <button style={{ border: "none", background: "none", width: "20%", textAlign: "left" }} className="backToOrdersButton" onClick={handleBackToOrders}>
        &larr; Order Details
      </button>
      {selectedOrder ? (
        <div className="orderDetails-container">
          <div className="orderDetails-header">
            <h2 style={{ fontWeight: 400, fontSize: '18px', color: '#23272E' }}>
              {selectedOrder.id} | {selectedOrder.date} | {selectedOrder.details.products.length} PRODUCTS | 
              <strong> Total ${selectedOrder.total}</strong> | 
              <span style={{ color: '#FFFFFF', fontWeight: 'bold', backgroundColor: '#279F51', borderRadius: "10px", padding: "4px" }} >
                PAID
              </span>
            </h2>
          </div>

          <div className="orderDetails-body">
            <div className="orderDetails-items">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCTS</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>{renderProductItems(selectedOrder.details.products)}</tbody>
              </table>
              {renderSummary(selectedOrder.details.products)}
            </div>
            <div className="orderDetails-sidebar">
              {renderDetails(selectedOrder.details)}
            </div>
          </div>
        </div>
      ) : (
        <div className="ordersList">
          <h1>Orders</h1>
          <div style={{ paddingBottom: "10px" }} className="ordertabs">
            <button 
              className={activeTab === "ordered" ? "active" : ""} 
              onClick={() => setActiveTab("ordered")}
            >
              Orders Placed
            </button>
            <button 
              className={activeTab === "ontheway" ? "active" : ""} 
              onClick={() => setActiveTab("ontheway")}
            >
              On the Way
            </button>
            <button 
              className={activeTab === "delivered" ? "active" : ""} 
              onClick={() => setActiveTab("delivered")}
            >
              Delivered
            </button>
            <button 
              className={activeTab === "cancelled" ? "active" : ""} 
              onClick={() => setActiveTab("cancelled")}
            >
              Cancelled
            </button>
          </div>
          <input
            type="text"
            className="orderproductsearchbutton"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <table className="ordersList-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE & TIME</th>
                <th>CUSTOMER</th>
                <th>TOTAL</th>
                <th>PAYMENT METHOD</th>
                <th>TRACKING ID</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders(activeTab).map((order) => (
                <tr key={order.id} >
                  <td onClick={() => handleOrderClick(order)}>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{order.customerName}</td>
                  <td>Rs{order.total}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <input 
                      type="text" 
                      placeholder="Enter ID" 
                      onClick={() => handleDeleteClick(order.id)} 
                      className="trackingInput" 
                    />
                  </td>
                  <td>
                    {activeTab === "ontheway" && (
                      <button 
                        className="tickButton"
                        onClick={() => handleDeliveredClick(order.id)}
                      >
                        ✔
                      </button>
                    )}
                    <button className="deleteButton" >✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Enter Details</h3>
            <div className="input-row">
              <input 
                type="text" 
                placeholder="Courier Name" 
                value={courierName}
                onChange={(e) => setCourierName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Courier Tracking ID" 
                value={courierTrackingId}
                onChange={(e) => setCourierTrackingId(e.target.value)}
              />
            </div>
            <div className="input-row">
              <input 
                type="text" 
                placeholder="Courier Tracking Link" 
                value={courierTrackingLink}
                onChange={(e) => setCourierTrackingLink(e.target.value)}
              />
            </div>
            <button className="submit-button" onClick={handlePopupSubmit}>Submit</button>
            <button className="close-button" onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}

      {showDeliveredPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Are you sure you want to mark this order as delivered?</h3>
            <div className="popup-buttons">
              <button className="submit-button" onClick={handleDeliveredConfirm}>Yes</button>
              <button className="close-button" onClick={handleDeliveredPopupClose}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersList;