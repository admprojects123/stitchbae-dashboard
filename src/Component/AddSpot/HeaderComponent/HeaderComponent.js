import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HeaderComponent.css';

const HeaderComponent = () => {
  const [sheetData, setSheetData] = useState([]);
  const [activeTab, setActiveTab] = useState('Sheet 7');
  const [editingCell, setEditingCell] = useState({ row: null, cell: null });

  // Replace with your Google Sheet ID and API key
  const SPREADSHEET_ID = '12hag257BMMd-W5fNlZE-ZDiBF6p6GRgrpsp3DK6VLIk';  // Your Google Sheet ID here
  const API_KEY = 'AIzaSyBptm1vobOT7ZpirWR9RClZIKa3dHrnF5o';                // Your Google API key here
  const RANGE = 'OTHER CITY';  // Adjust the range based on your sheet

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        setSheetData(response.data.values);  // response.data.values gives the sheet content in array form
      } catch (error) {
        console.error('Error fetching Google Sheet data', error);
      }
    };

    fetchSheetData();
  }, []);

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const updatedSheetData = [...sheetData];
    updatedSheetData[rowIndex][cellIndex] = value;
    setSheetData(updatedSheetData);
  };

  const handleCellClick = (rowIndex, cellIndex) => {
    setEditingCell({ row: rowIndex, cell: cellIndex });
  };

  const handleBlur = () => {
    setEditingCell({ row: null, cell: null });
  };

  return (
    <div>
      <div className='mainheadingaddspot'>Spot Price</div>
      <div className="headercomponent-container">
        <div className='topheading-addspot'>Add Spot Price</div>
        <div className="headercomponenttabs">
          {['Base Metal', 'Steel', 'Minor Metal', 'BME'].map((tab) => (
            <button 
              key={tab}
              className={`headercomponenttab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Removed Google Sheet Data display */}
        {/* 
        <div className="google-sheet-table">
          <table>
            <thead>
              <tr>
                {sheetData.length > 0 && sheetData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheetData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} onClick={() => handleCellClick(rowIndex + 1, cellIndex)}>
                      {editingCell.row === rowIndex + 1 && editingCell.cell === cellIndex ? (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleCellChange(rowIndex + 1, cellIndex, e.target.value)}
                          onBlur={handleBlur} // When input loses focus, blur handler is called
                          autoFocus // Automatically focuses the input when it appears
                        />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        */}
      </div>
    </div>
  );
};

export default HeaderComponent;
