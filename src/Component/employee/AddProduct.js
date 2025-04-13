import React from "react";
import "./AddProduct.css";

const AddProduct = ({ onClose }) => {
  return (
    <div className="addproduct-page">
      <header className="addproduct-header">
        <button className="addproduct-back-btn" onClick={onClose}>
          ← Back
        </button>
        <h2 className="addproduct-title">Add Product</h2>
      </header>
      <form className="addproduct-form">
        {/* The rest of the form remains unchanged */}
        <div className="addproduct-form-row">
          <div className="addproduct-form-group">
            <label className="addproduct-label">Product Name</label>
            <input
              className="addproduct-input"
              type="text"
              placeholder="Enter product name"
            />
          </div>
          <div className="addproduct-form-group">
            <label className="addproduct-label">Price</label>
            <input
              className="addproduct-input"
              type="number"
              placeholder="Enter price"
            />
          </div>
        </div>
        <div className="addproduct-form-group">
          <label className="addproduct-label">Product Description</label>
          <textarea
            className="addproduct-textarea"
            placeholder="Enter product description"
          ></textarea>
        </div>
        <button type="submit" className="addproduct-save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
