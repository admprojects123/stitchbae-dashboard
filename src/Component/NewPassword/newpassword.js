import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import './newpassword.css';
import { useNavigate, useLocation } from "react-router-dom";

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const email = location.state?.email; 
  // Use optional chaining

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://markethub-backend-ceka.onrender.com/admin/reset-password', {
        email: email,
        newPassword: password // Send new password to API
      });

      console.log('Password reset successfully:', response.data);
      
      // Navigate to the login page after successful password reset
      navigate("/sucess");
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div className="new-password-container">
      <div className="new-password-box">
        <h2>New Password</h2>
        <p>Create a New Password and Confirm Password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="input-field"
            placeholder="Enter New Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Resetting...' : 'Continue'}
          </button>
        </form>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <a href="/" className="back-link">Back</a>
      </div>
    </div>
  );
};

export default NewPassword;
