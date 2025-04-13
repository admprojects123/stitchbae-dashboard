import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './orderList.css';

function CurrentOrderList() {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Default to current date in YYYY-MM-DD format
  });
  const [message, setMessage] = useState('');
  const [exportPopup, setExportPopup] = useState({ show: false, companyId: null, companyName: '' });
  const [statusOptions] = useState(['ordered', 'preparing', 'delivered']); // Predefined status options

  useEffect(() => {
    fetchOrders(selectedDate); // Fetch orders for the current date on component mount
  }, [selectedDate]);

  const fetchOrders = async (date) => {
    try {
      const response = await axios.get(`https://clickmeal-backend.vercel.app/user/deliverydate?deliveryDate=${date}`);
      if (response.data.message === 'Order counts retrieved successfully.') {
        setOrders(response.data.counts);
        setMessage('');
      } else {
        setOrders([]);
        setMessage('No orders found for the specified delivery date.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      setOrders([]);
      setMessage('An error occurred while fetching orders. Please try again later.');
    }
  };

  const handleStatusChange = async (companyId, newStatus) => {
    try {
      const response = await axios.post(
        'https://clickmeal-backend.vercel.app/user/order-status',
        {
          companyId,
          deliveryDate: selectedDate,
          newStatus,
        }
      );

      if (response.data && response.data.message) {
        alert(response.data.message);
        // Update local state for the order with new status
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.companyId === companyId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error('Error updating order status:', error.response?.data || error.message);
      alert('Failed to update order status. Please try again.');
    }
  };

  const handleExport = async (companyId) => {
    try {
      if (!selectedDate) {
        alert('Please select a delivery date before exporting.');
        return;
      }

      const response = await axios.get(
        `https://clickmeal-backend.vercel.app/user/export-orders?companyId=${companyId}&deliveryDate=${selectedDate}`,
        {
          responseType: 'blob', // Ensure the response is treated as a file
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Order_Details_${companyId}_${selectedDate}.xlsx`); // Updated file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting orders:', error.response?.data || error.message);
    } finally {
      setExportPopup({ show: false, companyId: null, companyName: '' });
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  return (
    <div className="deliveryOrders-container">
      <div className="deliveryOrders-heading">Orders by Delivery Date</div>

      <div className="deliveryOrders-topBar">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="deliveryOrders-dateInput"
        />
      </div>

      {orders.length > 0 ? (
        <div className="deliveryOrders-tableContainer">
          <table className="deliveryOrders-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Company ID</th>
                <th>Order Count</th>
                <th>Status</th>
                <th>Export Detail</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.companyId}>
                  <td>{order.companyName}</td>
                  <td>{order.companyId}</td>
                  <td>{order.orderCount}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.companyId, e.target.value)}
                      className={`deliveryOrders-statusSelect ${order.status}`} // Apply dynamic class
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="deliveryOrders-exportBtn"
                      onClick={() =>
                        setExportPopup({
                          show: true,
                          companyId: order.companyId,
                          companyName: order.companyName,
                        })
                      }
                    >
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="deliveryOrders-noData">
          <div className="deliveryOrders-noDataContent">
            <h2>No Orders Found</h2>
            <p>
              There are no orders available for the selected date: <strong>{selectedDate}</strong>.
            </p>
            <p>Please choose another date or check back later.</p>
          </div>
        </div>
      )}

      {exportPopup.show && (
        <div className="deliveryOrders-popup">
          <div className="deliveryOrders-popupContent">
            <p>
              Are you sure you want to export orders for <strong>{exportPopup.companyName}</strong>?
            </p>
            <div className="deliveryOrders-popupActions">
              <button onClick={() => setExportPopup({ show: false, companyId: null, companyName: '' })}>
                Cancel
              </button>
              <button onClick={() => handleExport(exportPopup.companyId)}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentOrderList;
