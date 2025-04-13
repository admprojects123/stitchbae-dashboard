import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import CompanyList from '../companylist/companylist.js';


import Sidebar from '../Sidebar/Sidebar.js';
import Topbar from '../TopBar/topbar.js'; // Import the Topbar component
import "./dashboard.css"; // Your CSS file for styling

import Feedback from '../Feedback/Feedback.js';
import AddCompany from '../addCompany/addCompany.jsx';
import ProductPage from '../employee/Products.jsx';
import ItemList from '../itemList/itemList.jsx';
import AddItem from '../addItem/addItem.jsx';
import AddSubcategory from '../addSubcategory/addSubcategory.jsx';
import AddBanner from '../addBanner/addBanner.jsx';
import PaymentList from '../payment/paymentList.jsx';
import RewardList from '../rewardList/rewardList.jsx';
import AddReward from '../addReward/addReward.jsx';
import CouponList from '../couponList/couponList.jsx';
import CouponForm from '../couponForm/couponForm.jsx';
import AnalyticsPage from '../analyticsPage/analytics.jsx';

import AddCustomizeItem from '../addCustmizeItem/addCustomizeItem.jsx';
import CustomizeItemList from '../addCustmizeItem/listItem.jsx';
import CurrentOrderList from '../orderlist/orderList.jsx';
import ExtraItemList from '../listExtraItem/ExtraItemList.js';
import AddExtraItem from '../addExtraItem/AddExtraItem.js';
import AddProduct from '../employee/AddProduct.js';
import MainDashboard from '../DashboardMain/maindashboard.js';

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an email in cookies
    const email = Cookies.get('email');
    if (!email) {
      // If no email found, navigate to login page
      navigate('/')
    }
  }, [navigate]);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <MainDashboard />;
      case 3:
        return <ProductPage />;
      case 4:
        return <AddProduct />;
      case 5:
        return <AddItem />;
      case 6:
        return <AddSubcategory />;
      case 7:
        return <AddCustomizeItem />;
      case 8:
        return <CustomizeItemList />;
      case 9:
        return <PaymentList />;
      case 10:
        return <CouponList />;
      case 11:
        return <CompanyList />;
      case 12:
        return <AddCompany />;
      case 13:
        return <CouponForm />;
      case 14:
        return <RewardList />;
      case 15:
        return <AddReward />;
      case 16:
        return <Feedback />;
      case 17:
        return <AddBanner />;
      case 18:
        return <CurrentOrderList />;
        case 19:
          return <ExtraItemList />;
          case 20:
            return <AddExtraItem />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboarddd-container">
      <Sidebar activeIndex={activeIndex} onTabClick={handleTabClick} />
      <div className="main-content">
        {/* Add the Topbar below the Sidebar */}
        <div className="home-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
