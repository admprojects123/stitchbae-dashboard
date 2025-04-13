import './ExtraItemList.css';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/deleteimg.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExtraItemList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletePopup, setDeletePopup] = useState({ show: false, itemId: null });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-extrameal');
        if (response.data.message === 'Extra meals fetched successfully') {
          setItems(response.data.data);
          setMessage('');
        } else {
          setItems([]);
          setMessage('No extra items found.');
        }
      } catch (error) {
        console.error('Error fetching items:', error.response?.data || error.message);
        setItems([]);
        setMessage('An error occurred while fetching extra items. Please try again later.');
      }
    };

    fetchItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`https://clickmeal-backend.vercel.app/user/delete-item?id=${itemId}`);
      if (response.data.message === "Menu item deleted successfully") {
        setItems(items.filter((item) => item._id !== itemId));
        setMessage('Item deleted successfully!');
      } else {
        setMessage('Failed to delete the item.');
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setDeletePopup({ show: false, itemId: null });
      setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
    }
  };

  // Filtered items based on search criteria
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ExtraItemList-container">
  <div className="ExtraItemList-heading">Extra Item List</div>

  {message && <div className="ExtraItemList-message">{message}</div>}

  {items.length > 0 ? (
    <div className="ExtraItemList-tableContainer">
      <div className="ExtraItemList-topBar">
        <input
          type="text"
          placeholder="Search by item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ExtraItemList-searchInput"
        />
      </div>

      <table className="ExtraItemList-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>
                <img src={item.image} alt={item.name} className="ExtraItemList-itemImage" />
              </td>
              <td>{item.description}</td>
              <td>₹{item.price}</td>
              
              <td className="ExtraItemList-actionIcons">
                <button className="ExtraItemList-editBtn">
                  <img src={editIcon} alt="Edit" className="ExtraItemList-actionIcon" />
                </button>
                <button
                  className="ExtraItemList-deleteBtn"
                  onClick={() => setDeletePopup({ show: true, itemId: item._id })}
                >
                  <img src={deleteIcon} alt="Delete" className="ExtraItemList-actionIcon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="ExtraItemList-noData">
      <div className="ExtraItemList-noDataContent">
        <h2>No Extra Items Found</h2>
        <p>Please check back later or add new items to the list.</p>
      </div>
    </div>
  )}

  {deletePopup.show && (
    <div className="ExtraItemList-popup">
      <div className="ExtraItemList-popupContent">
        <p>Are you sure you want to delete this item?</p>
        <div className="ExtraItemList-popupActions">
          <button onClick={() => setDeletePopup({ show: false, itemId: null })}>
            Cancel
          </button>
          <button onClick={() => handleDeleteItem(deletePopup.itemId)}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
}

export default ExtraItemList;
