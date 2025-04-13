import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // State to hold the message response
  const [error, setError] = useState(''); // State to hold any error messages
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Reset message state
    setError(''); // Reset error state

    try {
      // Make API call to send reset code to the user's email
      const response = await axios.post('https://markethub-backend-ceka.onrender.com/admin/forgot-password', {
        email,
      });

      // Handle successful response
      console.log(response.data);
      setMessage(response.data.message); // Set success message
      
      // Redirect to Enter OTP page
      navigate('/enterotp',{state:{code:response.data.resetCode,email:email}}); // Change this to your actual Enter OTP route

    } catch (error) {
      console.error('Error during password reset:', error.response?.data || error);
      setError('Failed to send reset code. Please check your email or try again later.'); // Set error message
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className='forgot-line'>
          <h2>Forgot Password?</h2>
          <p>Enter your email to reset your password.</p>
        </div>  
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" className="forgot-submit-btn">Continue</button>
        </form>
        
        {/* Display success message */}
        {message && <p className="success-message">{message}</p>}
        
        {/* Display error message */}
        {error && <p className="error-message">{error}</p>}
        
        <a href="/" className="back-link">Back</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
