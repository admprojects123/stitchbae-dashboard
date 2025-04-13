import './itemList.css';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/deleteimg.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(''); // For filtering by type (Veg/Non Veg)
  const [deletePopup, setDeletePopup] = useState({ show: false, itemId: null });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-all-item');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error.response?.data || error.message);
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

  // Filtered items based on search and filter criteria
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? (filterType === 'Veg' ? item.isVeg : !item.isVeg) : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="itemList-container">
      <div className="itemList-heading">Item List</div>

      {message && <div className="itemList-message">{message}</div>}

      <div className="itemList-tableContainer">
        <div className="itemList-topBar">
          <input
            type="text"
            placeholder="Search by item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="itemList-searchInput"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="itemList-filterSelect"
          >
            <option value="">All Types</option>
            <option value="Veg">Veg</option>
            <option value="Non Veg">Non Veg</option>
          </select>
        </div>

        <table className="itemList-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Type</th>
              <th>Menu Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id}>
                <td>{item.itemName}</td>
                <td>
                  <img src={item.image} alt={item.itemName} className="itemList-itemImage" />
                </td>
                <td>
                  {item.description.length > 50 ? (
                    <>
                      {item.description.substring(0, 50)}... <a href="#">Read All</a>
                    </>
                  ) : (
                    item.description
                  )}
                </td>
                <td>{item.subcategory?.categoryId?.name || 'N/A'}</td>
                <td>₹{item.price}</td>
                <td className={item.isVeg ? "veg" : "nonVeg"}>
                  {item.isVeg ? "Veg" : "Non Veg"}
                </td>
                <td>Global</td>
                <td className="itemList-actionIcons">
                  <button className="itemList-editBtn">
                    <img src={editIcon} alt="Edit" className="itemList-actionIcon" />
                  </button>
                  <button
                    className="itemList-deleteBtn"
                    onClick={() => setDeletePopup({ show: true, itemId: item._id })}
                  >
                    <img src={deleteIcon} alt="Delete" className="itemList-actionIcon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deletePopup.show && (
        <div className="itemList-popup">
          <div className="itemList-popupContent">
            <p>Are you sure you want to delete this item?</p>
            <div className="itemList-popupActions">
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

export default ItemList;
