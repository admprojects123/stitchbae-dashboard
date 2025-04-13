import React from 'react';

import './maindash.css';
import Card from './HeaderCard/headercard';
import RevenueChart from './TotalRevenue/totalrevenue';
import RecentCustomers from './RecentCustomer/recentcustomer';
import MostBoughtPlans from './MostBoughtPlan/mostboughtplan';
import NotificationList from './RecentNotification/recentnotification'

const MainDashboard = () => {
  return (
   <div className='main-dash-root'>
    <div id="dash-header">Dashboard</div>
    <div id="dash-first">
    <Card 
        title="Revenue" 
        count={721} 
        percentageGrowth={4.8} 
        
        graphColor="#2B2EE9" 
      />
      <Card 
        title="Orders" 

        count={9000} 
        percentageGrowth={-4.8} 
        
        graphColor="#FF8A00" 
      />
      <Card 
        title="Visitors" 
        count={721} 
        percentageGrowth={4.8} 
       
        graphColor="#00B74A" 
      />
        <Card 
        title="Conversion" 
        count={721} 
        percentageGrowth={4.8} 
         
        graphColor="#00B74A" 
      />
      
    </div>
    <div className='dash-total-recent'>
      <RevenueChart />
      <RecentCustomers/>
    </div>
    <div className='dash-total-recent'>
      {/* <RevenueChart/> */}
      <MostBoughtPlans/>
      <NotificationList/>
      
    </div>
   </div>
  );
}

export default MainDashboard;