import React from 'react';
import './recentnotification.css';
import product from '../../../assets/collectionman.png';

const productsData = [
  {
    id: 1,
    image: product, // Replace with actual image URL
    name: 'Pant',
    totalOrders: 0,
    totalQuantity: 14,
    visits: 12,
    price: '123',
    quantityColor: 'red',
  },
  {
    id: 2,
    image: product,
    name: 'Shirt',
    totalOrders: 0,
    totalQuantity: 207,
    visits: 6,
    price: '501',
    quantityColor: 'green',
  },
  {
    id: 3,
    image: product,
    name: 'Jacket',
    totalOrders: 0,
    totalQuantity: 9,
    visits: 17,
    price: '120',
    quantityColor: 'green',
  },
  {
    id: 4,
    image: product,
    name: 'Pant',
    totalOrders: 0,
    totalQuantity: 14,
    visits: 124,
    price: '256',
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
