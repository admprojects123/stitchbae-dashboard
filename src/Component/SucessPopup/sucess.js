import { useNavigate, useLocation } from "react-router-dom";
import './sucesspage.css';
import React, { useEffect, useState } from 'react'; // Make sure the CSS file is in the same directory

const SuccessPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
          navigate("/login")
        },2000);
      });
    return (
        <div className="success-container">
            <div className="success-card">
                <div className="success-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="checkmark"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h1>Successful</h1>
                <p>Your Password has been successfully reset</p>
            </div>
        </div>
    );
};

export default SuccessPage;
