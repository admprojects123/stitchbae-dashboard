import React from 'react';
import './recentnotification.css';
import product from '../../../assets/productimageforproductpage.png';

const productsData = [
  {
    id: 1,
    image: product, // Replace with actual image URL
    name: 'Black & Green Long Kurti top',
    totalOrders: 506,
    totalQuantity: 14,
    visits: 124.67,
    price: '12,000',
    quantityColor: 'red',
  },
  {
    id: 2,
    image: product,
    name: 'Black & Green Long Kurti top',
    totalOrders: 506,
    totalQuantity: 207,
    visits: 124.67,
    price: '12,000',
    quantityColor: 'green',
  },
  {
    id: 3,
    image: product,
    name: 'Black & Green Long Kurti top',
    totalOrders: 506,
    totalQuantity: 689,
    visits: 124.67,
    price: '12,000',
    quantityColor: 'green',
  },
  {
    id: 4,
    image: product,
    name: 'Black & Green Long Kurti top',
    totalOrders: 506,
    totalQuantity: 14,
    visits: 124.67,
    price: '12,000',
    quantityColor: 'red',
  },
];

const BestSellingProducts = () => {
  return (
    <div className="best-selling-products">
      <h3 className="table-title">Best Selling Products</h3>
      <div className="product-table">
        <div className="table-header">
          <div className="header-item">Product</div>
          <div className="header-item">Total Orders</div>
          <div className="header-item">Total QT</div>
          <div className="header-item">Visits</div>
          <div className="header-item">Price</div>
        </div>
        {productsData.map((product) => (
          <div key={product.id} className="table-row">
            <div className="table-cell product-cell">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-name">{product.name}</div>
            </div>
            <div className="table-cell">{product.totalOrders}</div>
            <div className="table-cell">
              <span className={`quantity ${product.quantityColor}`}>{product.totalQuantity}</span>
            </div>
            <div className="table-cell">{product.visits}</div>
            <div className="table-cell">{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
