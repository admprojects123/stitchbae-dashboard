import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import "./AddProduct.css";
import productimg from "../../assets/productimageforproductpage.png";
import detailsimg from "../../assets/detailsimage.png";
import pencil from "../../assets/editpencillatest.png";
import trash from "../../assets/trashbinlatest.png";

const ProductPage = () => {
  const [category, setCategory] = useState("Wardrobe");
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sizes, setSizes] = useState([{ size: "M", quantity: 0 }]);
  const [images, setImages] = useState([]);
  const [products, setProducts] = useState([]); // State to store fetched products

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clouthing-ecommerce-backend.vercel.app/dashboard/listProducts"
        );
        if (response.data && response.data.data && response.data.data.products) {
          setProducts(response.data.data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

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

  const handleAddSize = () => {
    if (sizes.length < 3) {
      const nextSize = sizes.length === 1 ? "L" : "XL";
      setSizes([...sizes, { size: nextSize, quantity: 0 }]);
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 2) {
      alert("You can only upload up to 2 images.");
      return;
    }
    setImages([...files]);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", event.target.elements.productName.value);
    formData.append("price", parseFloat(event.target.elements.price.value));
    formData.append("pattern", event.target.elements.pattern.value);
    formData.append("fabric", event.target.elements.fabric.value);
    formData.append("subcategory", event.target.elements.subcategory.value);
    formData.append("colors", Array.from(event.target.elements.colors.selectedOptions).map(
      (option) => option.value
    ).join(","));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("description", event.target.elements.description.value);
    formData.append("categories", category);
    formData.append("fit", event.target.elements.fit.value);

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axios.post(
        "https://clouthing-ecommerce-backend.onrender.com/product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
      setIsAddingProduct(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
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

  // Filter products based on the active category
  const filteredProducts = products.filter(product => product.categories === category);

  return (
    <div className="product-page">
      {!isAddingProduct && !isViewingDetails ? (
        <>
          {/* Product List */}
          <header className="product-header">
            <h2 style={{ color: "#1C2A53", fontWeight: "400", fontSize: "24px" }}>
              Products
            </h2>
            <div className="tabs">
              <button
                className={category === "Wardrobe" ? "active" : ""}
                onClick={() => handleCategoryChange("Wardrobe")}
              >
                Wardrobe
              </button>
              <button
                className={category === "Occasion Wear" ? "active" : ""}
                onClick={() => handleCategoryChange("Occasion Wear")}
              >
                Occasion Wear
              </button>
              <button
                className={category === "Casual Wear" ? "active" : ""}
                onClick={() => handleCategoryChange("Casual Wear")}
              >
                Casual Wear
              </button>
            </div>
          </header>

          <div className="search-add">
            <input
              type="text"
              className="productsearchbutton"
              placeholder="Search..."
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
              {filteredProducts.map((product) => (
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
                  <td className="action-buttons">
                    <button className="edit-btn">
                      <img style={{ height: "21px" }} src={pencil} alt="pen" />
                    </button>
                    <button className="delete-btn">
                      <img style={{ height: "21px" }} src={trash} alt="tra" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : isViewingDetails ? (
        <>
          {/* Product Details */}
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
            ← Product Details
          </button>
          <div className="product-details-container">
            <div className="product-details-basic">
              <h2>Basic Information</h2>
              <p>
                <span>Name:</span> {selectedProduct.name}
              </p>
              <p>
                <span>Price:</span> {selectedProduct.price}
              </p>
              <p>
                <span>Pattern:</span> {selectedProduct.pattern}
              </p>
              <p>
                <span>Fabric:</span> {selectedProduct.fabric}
              </p>
              <p>
                <span>Category:</span> {selectedProduct.categories}
              </p>
              <p>
                <span>Description:</span> {selectedProduct.description}
              </p>
            </div>

            <div className="product-details-images">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Image ${index + 1}`}
                />
              ))}
            </div>

            <div className="product-details-size-quantity">
              <h3>Size & Quantity</h3>
              <table className="size-quantity-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.sizes.map((size, index) => (
                    <tr key={index}>
                      <td>{size.size}</td>
                      <td
                        className={
                          size.quantity > 0 ? "in-stock" : "out-of-stock"
                        }
                      >
                        {size.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                    <option value="Kurti">Kurti</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Pant">Pant</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Saree">Saree</option>
                    <option value="Dress">Dress</option>
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
                        value="Wardrobe"
                        checked={category === "Wardrobe"}
                        onChange={() => handleCategoryChange("Wardrobe")}
                        required
                      />
                      Wardrobe
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Casual Wear"
                        checked={category === "Casual Wear"}
                        onChange={() => handleCategoryChange("Casual Wear")}
                      />
                      Casual Wear
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="Occasion Wear"
                        checked={category === "Occasion Wear"}
                        onChange={() => handleCategoryChange("Occasion Wear")}
                      />
                      Occasion Wear
                    </label>
                  </div>
                </div>
              </div>

              <div className="addproduct-form-row">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: "10px" }}
                  className="addproduct-form-group"
                >
                  {sizes.map((size, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        value={size.size}
                        readOnly
                        style={{ width: "50px" }}
                      />
                      <input
                        type="number"
                        value={size.quantity}
                        onChange={(e) =>
                          handleSizeQuantityChange(index, e.target.value)
                        }
                        placeholder="Quantity"
                        required
                      />
                      {index === sizes.length - 1 && sizes.length < 3 && (
                        <button
                          type="button"
                          onClick={handleAddSize}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                        >
                          +
                        </button>
                      )}
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
                  </select>
                  <div className="addproduct-form-group">
                    <input
                      className="addproduct-input"
                      type="file"
                      name="images"
                      multiple
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="addproduct-save-btn">
                Save
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;