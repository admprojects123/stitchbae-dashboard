import React from 'react';
import './headercard.css';

// Utility function to generate random SVG path for the graph
const generateRandomGraphPath = () => {
  const pathStart = "M10 40";
  let path = pathStart;
  let x = 10;

  for (let i = 0; i < 4; i++) {
    const controlPointX = x + 20;
    const controlPointY = Math.floor(Math.random() * 40); // Random control point Y between 0 and 40
    const endPointX = x + 40;
    const endPointY = Math.floor(Math.random() * 40); // Random end point Y between 0 and 40

    path += ` Q ${controlPointX} ${controlPointY}, ${endPointX} ${endPointY}`;
    x = endPointX;
  }

  return path;
};

const Card = ({ title, count, percentageGrowth, color, graphColor }) => {
  const isGrowthPositive = percentageGrowth >= 0;
  const randomGraphPath = generateRandomGraphPath(); // Generate random path for the graph

  return (
    <div className="dash-card">
      <div className="dash-card-content">
        <div className="card-header">
          {/* <div>s8yf8n43r89f fewiffet4gdgs54tg</div> */}
          <span> <span className="highlight" style={{ color }}>{title}</span></span>
        </div>
       
        <div className="card-body">
          <div className="stats">
            <div className="user-count">{count}</div>
            <div className={`percentage ${isGrowthPositive ? 'positive' : 'negative'}`}>
              <span className="arrow">
                {isGrowthPositive ? '↑' : '↓'}
              </span>
              <span className="percentage-text">
                {Math.abs(percentageGrowth)}%
              </span>
            </div>
          </div>
          
        </div>
       
      </div>
     
      <div className="graph">
          {/* The line graph with random path */}
          <svg height="60" width="60">
            <path d={randomGraphPath} fill="transparent" stroke={graphColor} strokeWidth="3" />
          </svg>
        </div>
    </div>
  );
};

export default Card;