import React from 'react';
import './mostbought.css';

const categoriesData = [
  { name: 'Wardrobe', count: 4569, color: '#ff4d4d', zIndex: 3 },
  { name: 'Party Wear', count: 2457, color: '#00aaff', zIndex: 3 },
  { name: 'Casual Wear', count: 1346, color: '#33cc33', zIndex: 3 },
];

const TopSellingCategory = () => {
  return (
    <div className="top-selling-category">
      <div className="top-selling-header">
        <h3 className="category-title">Top Selling Category</h3>
        <p className="category-description">Total 8765 products sold of all categories</p>
      </div>
      <div className="category-bubbles">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className="category-bubble"
            style={{
              backgroundColor: category.color,
              width: `${100 + category.count / 100}px`,
              height: `${100 + category.count / 100}px`,
              zIndex: category.zIndex,
            }}
          >
            <span className="bubble-text">
              {category.name} <br />
              <span className="bubble-count">{category.count}</span> <br />
              Per Month
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingCategory;
