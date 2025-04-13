import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './spottable.css'; // Ensure this path points to your CSS file

const EditableTable = () => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState({ row: null, column: null });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://markethub-app-backend.onrender.com/user/get-all-item');
        // Map the response data to match your table structure
        const formattedData = response.data.map(item => ({
          id: item._id, // Assuming your items have an `_id` field for the unique identifier
          type: item.type,
          category: item.category,
          name: item.subcategory,
          price: item.price,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, name, value) => {
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };

  const handleUpdate = async () => {
    // Prepare the data for the update request
    const updatedPrices = data.map(item => ({
      id: item.id, // Use the unique identifier
      price: parseFloat(item.price), // Ensure price is a float
    }));

    try {
      // Send the updated data to the API
      await axios.post('https://markethub-app-backend.onrender.com/user/price-update', updatedPrices);
      
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Failed to update data.');
    }
  };

  const handleCellClick = (rowIndex, column) => {
    setEditIndex({ row: rowIndex, column });
  };

  const handleBlur = () => {
    setEditIndex({ row: null, column: null });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div className="table-container-unique">
      <table className="table-unique">
        <thead>
          <tr>
            <th>Select</th>
            <th>Type</th>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td><input type="checkbox" /></td>
              
              {/* Editable type cell */}
              <td onClick={() => handleCellClick(rowIndex, 'type')}>
                {editIndex.row === rowIndex && editIndex.column === 'type' ? (
                  <input
                    type="text"
                    value={item.type}
                    onChange={(e) => handleInputChange(rowIndex, 'type', e.target.value)}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                ) : (
                  item.type
                )}
              </td>

              {/* Editable category cell */}
              <td onClick={() => handleCellClick(rowIndex, 'category')}>
                {editIndex.row === rowIndex && editIndex.column === 'category' ? (
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => handleInputChange(rowIndex, 'category', e.target.value)}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                ) : (
                  item.category
                )}
              </td>

              {/* Editable name cell */}
              <td onClick={() => handleCellClick(rowIndex, 'name')}>
                {editIndex.row === rowIndex && editIndex.column === 'name' ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleInputChange(rowIndex, 'name', e.target.value)}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    autoFocus
                  />
                ) : (
                  item.name
                )}
              </td>

              {/* Editable price cell */}
              <td onClick={() => handleCellClick(rowIndex, 'price')}>
                {editIndex.row === rowIndex && editIndex.column === 'price' ? (
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleInputChange(rowIndex, 'price', e.target.value)}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                    className={`price-input-unique ${item.price !== 874 ? 'red' : ''}`}
                    autoFocus
                  />
                ) : (
                  item.price
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="update-button-unique" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditableTable;
