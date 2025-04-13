import React from 'react';
import './mostbought.css';

const MostBoughtPlans = () => {
  const plans = [
    { name: 'Basic Plan', usage: '50%', progress: '50%' },
    { name: 'Standard Plan', usage: '80%', progress: '80%' },
    { name: 'Premium Plan', usage: '30%', progress: '30%' }
  ];

  return (
    <div className="most-bought-plans-container">
      <h3>Most Bought Plans</h3>
      <ul>
        {plans.map((plan, index) => (
          <li key={index} className='mostboughtli'>
            <span>{plan.name}</span>
            <span>{plan.usage}</span>
            <div className="progress-bar" style={{ width: plan.progress }}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MostBoughtPlans;