// NotificationItem.js
import React from 'react';
import './module.css';

const NotificationItem = ({ name, message, timeAgo }) => {
  return (
    <div className="notification-item">
      <div className="notification-avatar">
        <div className="avatar-placeholder"></div>
      </div>
      <div className="notification-content">
        <div className="notification-name">{name}</div>
        <div className="notification-message">{message}</div>
      </div>
      <div className="notification-time">{timeAgo}</div>
    </div>
  );
};

export default NotificationItem;