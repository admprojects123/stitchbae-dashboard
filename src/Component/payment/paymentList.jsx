import React, { useState, useEffect } from "react";
import axios from "axios";
import "./exchangeList.css";
import product from "../../assets/productimageforproductpage.png";
import profileimg from "../../assets/profile.png";

function ExchangeList() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState("Return Placed");

  useEffect(() => {
    axios
      .get("https://clouthing-ecommerce-backend.vercel.app/user/listExchange")
      .then((response) => {
        if (response.data && response.data.exchanges) {
          setOrders(response.data.exchanges);
        }
      })
      .catch((error) => {
        console.error("Error fetching exchange list:", error);
      });
  }, []);

  const calculateSummary = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCharge = 40;
    const tax = subtotal * 0.05; // 5% GST
    const discount = 40;
    const totalAmount = subtotal + deliveryCharge + tax - discount;
    return { subtotal, deliveryCharge, tax, discount, totalAmount };
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderOrderItems = (items) => {
    return items.map((item, index) => (
      <tr key={index}>
        <td style={{ display: "flex", alignItems: "center" }}>
          <img
            src={product} // Replace with item.image if dynamic
            alt={item.productId.name}
            style={{ width: "50px", height: "50px", marginRight: "10px", borderRadius: "8px" }}
          />
          <div>
            {item.productId.name}
            <br />
            <small>Color - {item.color}</small>
            <br />
            <small>Size - {item.size}</small>
          </div>
        </td>
        <td>Rs{item.productId.price}</td>
        <td>1</td>
        <td>Rs{item.productId.price}</td>
      </tr>
    ));
  };

  const renderSummary = (items) => {
    const { subtotal, deliveryCharge, tax, discount, totalAmount } = calculateSummary(items);
    return (
      <div className="exchange-orderDetails-summary">
        <div className="exchange-reason-section">
          <h3>Reason for exchanging the product?</h3>
          <p>{selectedOrder.reason || "Site is smaller/larger than expected."}</p>
        </div>
        <div className="exchange-description-section">
          <h3>Describe the Problem</h3>
          <p>{selectedOrder.description || "Comment here..."}</p>
        </div>
        <div className="exchange-new-size-section">
          <h3>New Selected Size</h3>
          <p>{selectedOrder.newSize || "SXL"}</p>
        </div>
      </div>
    );
  };

  const renderDetails = (details) => (
    <>
      <div className="exchange-orderDetails-customer">
        <h3 style={{ color: "#8B909A", fontWeight: "400", paddingLeft: "8px" }}>Customer Details</h3>
        <div className="exchange-customer-info">
          <img src={profileimg} alt="Customer Profile" className="exchange-customer-profile-img" />
          <div>
            <div style={{ color: "#23272E" }}>{details.customerDetails?.name || "N/A"}</div>
            <div style={{ color: "#808191" }}>{details.customerDetails?.email || "N/A"}</div>
          </div>
        </div>
      </div>

      <div className="exchange-orderDetails-shipping">
        <h3 style={{ color: "#8B909A", fontWeight: "400" }}>Shipping Address</h3>
        <p>{details.shippingAddress?.name || "N/A"}</p>
        <p>{details.shippingAddress?.phone || "N/A"}</p>
        <p>{details.shippingAddress?.address || "N/A"}</p>
      </div>
    </>
  );

  const filteredOrders = orders.filter((order) => {
    switch (activeTab) {
      case "Return Placed":
        return order.exchangeStatus === "return_placed";
      case "Ordered":
        return order.exchangeStatus === "ordered";
      case "Delivered":
        return order.exchangeStatus === "delivered";
      case "Cancelled":
        return order.isCancelled;
      default:
        return true;
    }
  });

  return (
    <div className="exchange-ordersList-container">
      <button
        style={{ border: "none", background: "none", width: "20%", textAlign: "left" }}
        className="exchange-backToOrdersButton"
        onClick={handleBackToOrders}
      >
        &larr; Order Details
      </button>
      {selectedOrder ? (
        <div className="exchange-orderDetails-container">
          <div className="exchange-orderDetails-header">
            <h2 style={{ fontWeight: 400, fontSize: "18px", color: "#23272E" }}>
              {selectedOrder._id} | {new Date(selectedOrder.arrivalDate).toLocaleString()} |{" "}
              <strong>Total ${selectedOrder.productId.price}</strong> |{" "}
              <span
                style={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  backgroundColor: selectedOrder.isCancelled ? "#DA231D" : "#28A745",
                  borderRadius: "10px",
                  padding: "4px",
                }}
              >
                {selectedOrder.exchangeStatus}
              </span>
            </h2>
          </div>

          <div className="exchange-orderDetails-body">
            <div className="exchange-orderDetails-items">
              <table>
                <thead>
                  <tr>
                    <th>ITEMS</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>{renderOrderItems([selectedOrder])}</tbody>
              </table>
              {renderSummary([selectedOrder])}
            </div>
            <div className="exchange-orderDetails-sidebar">{renderDetails(selectedOrder)}</div>
          </div>
        </div>
      ) : (
        <div className="exchange-ordersList">
          <h1>Exchange</h1>
          <div style={{ paddingBottom: "10px" }} className="exchange-ordertabs">
            <button
              className={activeTab === "Return Placed" ? "exchange-active" : ""}
              onClick={() => handleTabClick("Return Placed")}
            >
              Return Placed
            </button>
            <button
              className={activeTab === "Ordered" ? "exchange-active" : ""}
              onClick={() => handleTabClick("Ordered")}
            >
              Ordered
            </button>
            <button
              className={activeTab === "Delivered" ? "exchange-active" : ""}
              onClick={() => handleTabClick("Delivered")}
            >
              Delivered
            </button>
            <button
              className={activeTab === "Cancelled" ? "exchange-active" : ""}
              onClick={() => handleTabClick("Cancelled")}
            >
              Cancelled
            </button>
          </div>
          <input
            type="text"
            className="exchange-orderproductsearchbutton"
            placeholder="Search..."
          />
          <table className="exchange-ordersList-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE & TIME</th>
                <th>PRODUCT</th>
                <th>TOTAL</th>
                <th>EXCHANGE STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td onClick={() => handleOrderClick(order)}>{order._id}</td>
                  <td>{new Date(order.arrivalDate).toLocaleString()}</td>
                  <td>{order.productId.name}</td>
                  <td>Rs{order.productId.price}</td>
                  <td>{order.exchangeStatus}</td>
                  <td>
                    <button className="exchange-deleteButton">✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExchangeList;