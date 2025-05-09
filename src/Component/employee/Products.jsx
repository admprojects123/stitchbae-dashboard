import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Products.css";
import "./AddProduct.css";
import productimg from "../../assets/collectionman.png";
import detailsimg from "../../assets/detailsimage.png";
import pencil from "../../assets/editpencillatest.png";
import trash from "../../assets/trashbinlatest.png";

const ProductPage = () => {
  const [category, setCategory] = useState("Man");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sizes, setSizes] = useState([
    { size: "XS", quantity: 0 },
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
    { size: "XXL", quantity: 0 }
  ]);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch products from the API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://stitch-commerce-admaya.vercel.app/dashboard/listProducts"
      );
      if (response.data && response.data.data && response.data.data.products) {
        setProducts(response.data.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleAddProductClick = () => {
    setIsAddingProduct(true);
  };

  const handleSizeQuantityChange = (index, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index].quantity = parseInt(value, 10) || 0;
    setSizes(updatedSizes);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 2) {
      alert("You can only upload up to 2 images.");
      return;
    }
    setImages(files);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    console.log("Starting form submission...");
  
    const form = event.target;
    const formData = new FormData();
  
    try {
      // Log all form values for debugging
      console.log("Form values:", {
        name: form.elements.productName.value,
        price: form.elements.price.value,
        pattern: form.elements.pattern.value,
        fabric: form.elements.fabric.value,
        subcategory: form.elements.subcategory.value,
        colors: Array.from(form.elements.colors.selectedOptions).map(option => option.value),
        sizes: sizes,
        description: form.elements.description.value,
        category: category,
        fit: form.elements.fit.value,
        images: images
      });
  
      // Append all form data
      formData.append("name", form.elements.productName.value);
      formData.append("price", parseFloat(form.elements.price.value));
      formData.append("pattern", form.elements.pattern.value);
      formData.append("fabric", form.elements.fabric.value);
      formData.append("subcategory", form.elements.subcategory.value);
      formData.append("colors", Array.from(form.elements.colors.selectedOptions)
        .map(option => option.value)
        .join(","));
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("description", form.elements.description.value);
      formData.append("categories", category);
      formData.append("fit", form.elements.fit.value);
  
      // Append each image
      images.forEach((image) => {
        formData.append("images", image);
      });
  
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const response = await axios.post(
        "https://stitch-commerce-admaya.vercel.app/product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("API Response:", response);
      console.log("Success flag:", response.data?.success);
      console.log("Message:", response.data?.message);
  
      if (response.data?.success === true) {
        toast.success("Product added successfully!");
        setIsAddingProduct(false);
  
        // Reset form values
        setSizes([
          { size: "XS", quantity: 0 },
          { size: "S", quantity: 0 },
          { size: "M", quantity: 0 },
          { size: "L", quantity: 0 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 0 }
        ]);
        setImages([]);
        await fetchProducts();
      } else {
        console.warn("Unexpected API response structure:", response.data);
        toast.error(response.data?.message || "Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
  
      toast.error(error.response?.data?.message || "Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleBackClick = () => {
    setIsAddingProduct(false);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsViewingDetails(true);
  };

  const handleBackToProducts = () => {
    setIsViewingDetails(false);
    setSelectedProduct(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `https://stitch-commerce-admaya.vercel.app/product/deleteProduct/${productToDelete._id}`
      );
      toast.success("Product deleted successfully!");
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setShowDeleteConfirmation(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  // Filter products based on the active category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = product.categories === category;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    return matchesCategory && (searchTerm === "" || matchesSearch);
  });

  return (
    <div className="product-page">
      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation-modal">
          <div className="delete-confirmation-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete {productToDelete?.name}?</p>
            <div className="delete-confirmation-buttons">
              <button onClick={handleCancelDelete}>Cancel</button>
              <button onClick={handleConfirmDelete} className="confirm-delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {!isAddingProduct && !isViewingDetails ? (
        <>
          {/* Product List */}
          <header className="product-header">
            <h2 style={{ color: "#1C2A53", fontWeight: "400", fontSize: "24px" }}>
              Products
            </h2>
            <div className="tabs">
              <button
                className={category === "Man" ? "active" : ""}
                onClick={() => handleCategoryChange("Man")}
              >
                Man
              </button>
              <button
                className={category === "Woman" ? "active" : ""}
                onClick={() => handleCategoryChange("Woman")}
              >
                Women
              </button>
              <button
                className={category === "Other" ? "active" : ""}
                onClick={() => handleCategoryChange("Other")}
              >
                Other
              </button>
            </div>
          </header>

          <div className="search-add">
            <input
              type="text"
              className="productsearchbutton"
              placeholder="Search by product name..."
              onChange={handleSearchChange}
              value={searchTerm}
            />
            <button className="add-product-btn" onClick={handleAddProductClick}>
              Add Product
            </button>
          </div>

          <table className="product-table">
            <thead>
              <tr className="producttablehead">
                <th style={{ textAlign: "left" }}>Product</th>
                <th style={{ textAlign: "left" }}>Details</th>
                <th style={{ textAlign: "left" }}>Category</th>
                <th style={{ textAlign: "left" }}>Total Orders</th>
                <th style={{ textAlign: "left" }}>Total QT</th>
                <th style={{ textAlign: "left" }}>Status</th>
                <th style={{ textAlign: "left" }}>Visits</th>
                <th style={{ textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="product-info">
                      <img
                        src={productimg}
                        alt={product.name}
                        className="product-image"
                      />
                      <span className="product-name">{product.name}</span>
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleViewProduct(product)}
                      >
                        View
                      </button>
                    </td>
                    <td>{product.categories}</td>
                    <td>{product.totalOrders || 0}</td>
                    <td>{product.sizes.reduce((acc, size) => acc + size.quantity, 0)}</td>
                    <td
                      className={`status ${
                        product.sizes.some(size => size.quantity > 0) ? "in-stock" : "out-of-stock"
                      }`}
                    >
                      {product.sizes.some(size => size.quantity > 0) ? "In Stock" : "Out of Stock"}
                    </td>
                    <td>{product.visit || 0}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <img src={trash} alt="Delete" className="action-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : isViewingDetails ? (
        <>
          {/* Product Details - Enhanced */}
          <button
            className="back-btn"
            onClick={handleBackToProducts}
            style={{
              marginBottom: "20px",
              cursor: "pointer",
              border: "none",
              background: "transparent",
              fontSize: "20px",
              color: "#1C2A53",
            }}
          >
            ← Back to Products
          </button>
          
          <div className="enhanced-product-details">
            <div className="details-info-section">
              <h2 className="section-title">Product Details</h2>
              
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedProduct.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">${selectedProduct.price}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pattern:</span>
                  <span className="detail-value">{selectedProduct.pattern}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Fabric:</span>
                  <span className="detail-value">{selectedProduct.fabric}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{selectedProduct.categories}</span>
                </div>
                
                {/* Size & Quantity Section */}
                <div className="detail-item full-width">
                  <span className="detail-label">Availability:</span>
                  <div className="size-quantity-container">
                    {selectedProduct.sizes.map((size, index) => (
                      <div key={index} className="size-quantity-item">
                        <span className="size">{size.size}:</span>
                        <span className={`quantity ${size.quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
                          {size.quantity} {size.quantity === 1 ? 'unit' : 'units'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="detail-item full-width">
                  <span className="detail-label">Description:</span>
                  <p className="detail-value">{selectedProduct.description}</p>
                </div>
              </div>
            </div>
        
            <div className="product-images-section">
              <h3 className="section-title">Product Images</h3>
              <div className="images-container">
                {selectedProduct.images.map((image, index) => (
                  <div key={index} className="image-wrapper">
                    <img 
                      src={image} 
                      alt={`Product view ${index + 1}`} 
                      className="product-detail-image"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Add Product Form */}
          <div className="addproduct-page">
            <header className="addproduct-header">
              <button className="addproduct-back-btn" onClick={handleBackClick}>
                ←
              </button>
              <h2 className="addproduct-title">Add Product</h2>
            </header>
            <form className="addproduct-form" onSubmit={handleSave}>
              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <input
                    className="addproduct-input"
                    type="text"
                    name="productName"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="addproduct-form-group">
                  <input
                    className="addproduct-input"
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    required
                  />
                </div>
              </div>

              <div className="addproduct-form-row">
                <div className="addproduct-form-group">
                  <select
                    className="addproduct-select"
                    name="colors"
                    multiple
                    required
                  >
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Pink">Pink</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Purple">Purple</option>
                    <option value="Gray">Gray</option>
                    <option value="Brown">Brown</option>
                  </select>
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
                className="addproduct-form-group"
              >
                <textarea
                  className="addproduct-textarea"
                  name="description"
                  placeholder="Enter product description"
                  style={{ height: "150px", width: "49%", marginTop: "20px" }}
                  required
                ></textarea>
                <div className="addproduct-form-group">
                  {/* Subcategory */}
                  <select
                    style={{ width: "97%", marginLeft: "20px" }}
                    className="addproduct-select"
                    name="subcategory"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Crop Tops">Crop Tops</option>
                    <option value="Tank Tops">Tank Tops</option>
                    <option value="T-Shirt Dresses">T-Shirt Dresses</option>
                    <option value="Co-ord Sets">Co-ord Sets</option>
                    <option value="Oversized T-Shirts">Oversized T-Shirts</option>
                    <option value="Regular Fit T-Shirts">Regular Fit T-Shirts</option>
                  </select>

                  {/* Pattern */}
                  <select
                    style={{
                      width: "97%",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                    className="addproduct-select"
                    name="pattern"
                    required
                  >
                    <option value="">Select Pattern</option>
                    <option value="Lucknowi">Lucknowi</option>
                    <option value="Printed">Printed</option>
                    <option value="Plain">Plain</option>
                    <option value="Embroidery">Embroidery</option>
                    <option value="Other">Other</option>
                  </select>

                  {/* Fabric */}
                  <select
                    style={{
                      width: "97%",
                      marginLeft: "20px",
                      marginTop: "10px",
                    }}
                    className="addproduct-select"
                    name="fabric"
                    required
                  >
                    <option value="">Select Fabric</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Silk">Silk</option>
                    <option value="Wool">Wool</option>
                    <option value="Polyester">Polyester</option>
                    <option value="Linen">Linen</option>
                  </select>

                  {/* Categories */}
                  <div
                    style={{
                      paddingLeft: "16px",
                      paddingTop: "10px",
                      marginTop: "10px",
                    }}
                    className="addproduct-radio-group"
                  >
                    <label>
                      <input
                        type="radio"
                        value="Man"
                        checked={category === "Man"}
                        onChange={() => handleCategoryChange("Man")}
                        required
                      />
                      Man
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Woman"
                        checked={category === "Woman"}
                        onChange={() => handleCategoryChange("Woman")}
                      />
                      Woman
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Other"
                        checked={category === "Other"}
                        onChange={() => handleCategoryChange("Other")}
                      />
                      Other
                    </label>
                  </div>
                </div>
              </div>

              <div className="addproduct-form-row">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                  className="addproduct-form-group"
                >
                  <h4>Size and Quantity:</h4>
                  {sizes.map((size, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <span style={{ width: "30px" }}>{size.size}:</span>
                      <input
                        type="number"
                        value={size.quantity}
                        onChange={(e) =>
                          handleSizeQuantityChange(index, e.target.value)
                        }
                        placeholder="Quantity"
                        min="0"
                        required
                        style={{ width: "80px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="addproduct-form-row">
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                  className="addproduct-form-group"
                >
                  <select
                    style={{ width: "49%" }}
                    className="addproduct-select"
                    name="fit"
                    required
                  >
                    <option value="">Select Fit</option>
                    <option value="Slim Fit">Slim Fit</option>
                    <option value="Regular Fit">Regular Fit</option>
                    <option value="Loose Fit">Loose Fit</option>
                    <option value="Drop Shoulder">Drop Shoulder</option>
                    <option value="Overfite">Overfit</option>
                  </select>
                  <div className="addproduct-form-group">
                    <label>Product Images (Max 2):</label>
                    <input
                      className="addproduct-input"
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="addproduct-save-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;