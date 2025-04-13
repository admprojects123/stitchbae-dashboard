import React from 'react';
import './recentcustomer.css';
import productimg from '../../../assets/productimageforproductpage.png';

const TrendingProducts = ({ products = [] }) => {
  // Dummy data if no products are passed
  const dummyProducts = [
    { name: 'Black & Green Long Kurti top', image: productimg, visits: '12.4k' },
    { name: 'Black & Green Long Kurti top', image: productimg, visits: '12.4k' },
    { name: 'Black & Green Long Kurti top', image: productimg, visits: '12.4k' },
    { name: 'Black & Green Long Kurti top', image: productimg, visits: '12.4k' },
    { name: 'Black & Green Long Kurti top', image: productimg, visits: '12.4k' },
  ];

  const data = products.length > 0 ? products : dummyProducts;

  return (
    <div className="trending-products-container">
      <div className="trending-products-header">
        <span className="trending-title">Trending Products</span>
      </div>
      <div className="trending-products-table">
        <div className="trending-table-row header">
          <span className="table-header-cell">Product Name</span>
          <span style={{textAlign:"right"}} className="table-header-cell">Visits</span>
        </div>
        {data.map((product, index) => (
          <div className="trending-table-row" key={index}>
            <div className="trending-product-cell">
              <img src={product.image} alt={product.name} className="product-image" />
              <span className="product-name">{product.name}</span>
            </div>
            <span className="trending-visit-count">{product.visits}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
