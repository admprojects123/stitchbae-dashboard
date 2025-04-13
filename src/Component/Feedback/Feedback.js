import './Feedback.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState('');  // To hold the selected message for the popup

  // Function to fetch feedback data from the API
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('https://clouthing-ecommerce-backend.vercel.app/user/getContactUs');
      if (response.data.success) {
        setFeedbacks(response.data.messages);
      } else {
        console.error('Failed to fetch feedback messages.');
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();  // Fetch feedbacks when the component mounts
  }, []);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const starCount = Math.round(rating);
    return (
      <span className="feedbackList-stars">
        {'★'.repeat(starCount)}
        {'☆'.repeat(5 - starCount)}
      </span>
    );
  };

  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch = feedback.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          feedback.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Handle the "View" button click to show the message in a popup
  const handleViewMessage = (message) => {
    setSelectedMessage(message);
  };

  // Close the popup
  const handleClosePopup = () => {
    setSelectedMessage('');
  };

  return (
    <div className="feedbackList-container">
      <div className="feedbackList-heading">Contact Us</div>
      <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="feedbackList-searchInput"
        />
      <div className="feedbackList-tableContainer">
        <table className="feedbackList-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL ADDRESS</th>
              <th>PHONE NO</th>
              <th>DATE & TIME</th>
              <th>MESSAGE</th> {/* Added column for View button */}
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.firstName} {feedback.lastName}</td>
                <td>{feedback.email}</td>
                <td>{feedback.phone}</td>
                <td>{new Date(feedback.createdAt).toLocaleString()}</td>
                <td>
                  <button 
                    style={{border:"none",background:"transparent",textDecoration:"underline",fontSize:"14px"}} 
                    className="viewButton" 
                    onClick={() => handleViewMessage(feedback.message)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for displaying the message */}
      {selectedMessage && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={handleClosePopup}>✖</button>
            <h2>Feedback Message</h2>
            <p>{selectedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackList;
