import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./enterotp.css";
import "@fontsource/poppins";

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // React Router hook to get location
  const {code,email} = location.state ||{}; // Retrieve email from state

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError('');

    if(code==otp){
      console.log("before going to new password page email=>.>",email);
      navigate("/new",{state:{email}});
    }else{
      setError("Invaild Otp");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-box">
        <h2 className="otp-title">Enter OTP</h2>
        <p>An OTP has been sent to your Email Address</p>
        <form onSubmit={handleSubmit}> {/* Wrap input and button in a form */}
          <input
            type="text"
            className="otp-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            required // Make input required
          />
          <button type="submit" className="otp-button" disabled={loading}>
            {loading ? 'Verifying...' : 'Continue'}
          </button>
          {error && <p className="error">{error}</p>} {/* Display error message */}
        </form>
        <div className="otp-back" onClick={() => navigate('/forgot-password')}>Back</div> {/* Back button to navigate */}
      </div>
    </div>
  );
};

export default OtpPage;
