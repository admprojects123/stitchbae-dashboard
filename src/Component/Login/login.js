import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';
import logo from '../../assets/finallogoiris.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    // Check if an email is already stored in cookies
    const storedEmail = Cookies.get('email');
    if (storedEmail) {
      navigate('/dash'); // Navigate to dashboard if email exists
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeepSignedInChange = (e) => {
    setKeepSignedIn(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://clickmeal-backend.vercel.app/user/admin-login', {
        email: email,
        password: password,
      });
      
      // Store the email in cookies with an expiration based on "keep signed in"
      const cookieOptions = keepSignedIn ? { expires: 7 } : {}; // Expire in 7 days if keep signed in
      Cookies.set('email', email, cookieOptions);

      navigate('/dash'); // Navigate to the dashboard upon successful login

    } catch (error) {
      console.error('Error during login:', error.response?.data || error);
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle "Forgot Password" link click
  const handleForgotPasswordClick = () => {
    navigate('/forgot'); // Navigate to Forgot Password page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="newp">Hello!</div>
        <div className="newp">Log in to continue.</div>
        <form onSubmit={handleSubmit} className='login-form'>
          <input
            type="email"
            className="login-input-field"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <input
            type="password"
            className="login-input-field"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          {error && <p className="error">{error}</p>}
          
        </form>
      </div>
    </div>
  );
}

export default Login;
