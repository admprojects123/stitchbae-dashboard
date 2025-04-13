import React, { useState } from 'react';
import './addwarehouse.css';

const WarehouseStockEditor = () => {
  const [data, setData] = useState([
    { symbol: 'Copper', last: '591145', chn: '674', oerCh: '8.2%', chnS: '5.7%' },
    { symbol: 'Aluminum', last: '361908', chn: '618', oerCh: '0.0%', chnS: '5.7%' },
    { symbol: 'Zinc', last: '24012', chn: '540', oerCh: '8.7%', chnS: '5.7%' },
    { symbol: 'Nickel', last: '14422', chn: '870', oerCh: '9.2%', chnS: '5.7%' },
    { symbol: 'Lead', last: '2970', chn: '530', oerCh: '6.1%', chnS: '5.7%' },
    { symbol: 'Tin', last: '400', chn: '657', oerCh: '6.9%', chnS: '5.7%' },
    { symbol: 'Al Alloy', last: '250', chn: '367', oerCh: '0.0%', chnS: '5.7%' },
  ]);

  const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Data submitted:', data);
  };

  return (
    <div className="warehouse-editor-container">
      <h2 className="warehouse-editor-title">Future Price</h2>
      <h3 className="warehouse-editor-subtitle">Add Warehouse Stock</h3>
      <table className="warehouse-editor-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last</th>
            <th>Chn</th>
            <th>Oer Ch</th>
            <th>Chn S</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.symbol}</td>
              <td>
                <input
                  type="text"
                  value={row.last}
                  onChange={(e) => handleChange(index, 'last', e.target.value)}
                  className="warehouse-editor-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.chn}
                  onChange={(e) => handleChange(index, 'chn', e.target.value)}
                  className="warehouse-editor-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.oerCh}
                  onChange={(e) => handleChange(index, 'oerCh', e.target.value)}
                  className="warehouse-editor-input"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.chnS}
                  onChange={(e) => handleChange(index, 'chnS', e.target.value)}
                  className="warehouse-editor-input"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="warehouse-editor-submit-btn" onClick={handleSubmit}>
        Post
      </button>
    </div>
  );
};

export default WarehouseStockEditor;
