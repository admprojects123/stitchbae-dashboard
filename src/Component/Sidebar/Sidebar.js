import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import Cookies from 'js-cookie';
import logoutnew from '../../assets/logoutnew.png';
import customers from '../../assets/customers.png';
import products from '../../assets/products.png';
import orders from '../../assets/orders.png'; 
import dash from '../../assets/dashirislogo.png'
import bannerlatest from '../../assets/bannerlatest.png';
import ContactUs from '../../assets/ContactUs.png';
import company from '../../assets/company.png';
import cou from '../../assets/CouponNew.png';
import banner from '../../assets/banner.png';
import homeimg from '../../assets/home.png';
import userimg from '../../assets/user.png';
import gamification from '../../assets/gamification.png';
import promotion from '../../assets/promotion.png';
import pay from '../../assets/payment.png';
import downArrow from '../../assets/downarrow.png';
import upArrow from '../../assets/uparrow.png';
import cash from '../../assets/cash.png';
import item from '../../assets/itemms.png';
import order from '../../assets/order.png';
import feed from '../../assets/feed.png';
import logoutadmin from '../../assets/logoutadmin.png';
import futurelogo from '../../assets/futurelogo.png';

import { Feedback } from '@mui/icons-material';

const Sidebar = ({ activeIndex, onTabClick }) => {
  const navigate = useNavigate();
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [isExtraItemOpen, setIsExtraItemOpen] = useState(false);
  const [isCustmizeItemOpen, setIsCustomizeItemOpen] = useState(false);
  const [isPromotionOpen, setIsPromotionOpen] = useState(false);
  const [isEmployeeListOpen, setIsEmployeeListOpen] = useState(false);
  const [isGamificationOpen, setIsGamificationOpen] = useState(false);
  const [isOrderListOpen, setIsOrderListOpen] = useState(false);
  const [isItemOpen, setIsItemOpen] = useState(false);  // New state for Future Price

  const toggleUserList = () => {
    setIsUserListOpen(!isUserListOpen);
  };

  const toggleCustomizeItem = () => {
    setIsCustomizeItemOpen(!isCustmizeItemOpen);
  };

  return (
    <div className="sidebar">
      <div className='sidebar-parent-logo' ><div className="sider-logo"></div></div>

      <ul className="sidebar-menu">
        <li>
          <a
            className={`menu-item ${activeIndex === 0 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(0)}
          >
            <img src={dash} alt="Dashboard Icon" className="icon" />
            Dashboard
          </a>
        </li>
{/* company list */}
        <li>
          <button
            className={`menu-item ${(activeIndex === 11 || activeIndex ===12) ? 'active' : 'inactive'}`}
            onClick={() => {
              toggleUserList();
              onTabClick(11);
            }}
          >
            <img src={customers} alt="User List Icon" className="icon" />
            <div>Customers</div>
            
          
          </button>
          

        </li>
{/* employee list */}
        <li>
          <button
            className={`menu-item ${activeIndex === 3 ? 'active' : 'inactive'}`}
            onClick={() => {
              setIsEmployeeListOpen(!isEmployeeListOpen);
              onTabClick(3);
            }}
          >
            <img src={products} alt="Verify Icon" className="icon" />
            Products
       
          </button>

        </li>
{/* item secttion */}
     
        {/* extra item secttion */}
      
 {/* Order list */}
       
   {/* Customize item */}

  
{/* payment */}
        <li>
          <button
            className={`menu-item ${activeIndex === 9 ? 'active' : 'inactive'}`}
            onClick={() => {
              // toggleNewsList();
              onTabClick(9);
            }}
          >
            <img src={pay} alt="Logout Icon" className="icon" />
           Exchange
          </button>
        </li>

{/* promotion */}

        <li>
          <button
            className={`menu-item ${(activeIndex === 10 ||activeIndex === 13 )? 'active' : 'inactive'}`}
            onClick={() => {
              setIsPromotionOpen(!isPromotionOpen);
              onTabClick(10);
            }}
          >
            <img src={cou} alt="News Icon" className="icon" />
            Coupons
          </button>
 
        </li>
      
{/* Gamification */}

<li>
          <button
            className={`menu-item ${(activeIndex === 14 ||activeIndex === 15 )? 'active' : 'inactive'}`}
            onClick={() => {
              setIsGamificationOpen(!isGamificationOpen);
              onTabClick(14);
            }}
          >
            <img src={orders} alt="News Icon" className="icon" />
            Orders
        
          </button>
      
        </li>
{/* feed back */}

        <li>
          <Link
            className={`menu-item ${activeIndex === 16 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(16)}
          >
            <img src={ContactUs} alt="Add Admin Icon" className="icon" />
            Contact Us
          </Link>
        </li>
        {/* Banner */}
        <li>
          <Link
            className={`menu-item ${activeIndex === 17 ? 'active' : 'inactive'}`}
            onClick={() => onTabClick(17)}
          >
            <img src={bannerlatest} alt="Subscription Icon" className="icon" />
            Banner
          </Link>
        </li>
{/* logout */}
        <li>
          <button
            className={`menu-item ${activeIndex === 18 ? 'active' : 'inactive'}`}
            onClick={() => {
              if (window.confirm("Are you sure you want to log out?")) {
                Cookies.remove('email'); // Clear the email cookie
                navigate('/'); // Navigate to the login page
              }
            }}
          >
            <img src={logoutnew} alt="Logout Icon" className="icon" />
            Logout
          </button>
        </li>

        
      </ul>
    </div>
  );
};

export default Sidebar;
