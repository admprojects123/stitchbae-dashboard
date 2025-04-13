import React from 'react';
import './cashmanagement.css';
import Pagination from '../Pagination';
import filterbutton from '../../assets/filter.png';

const CashManagement = () => {
  return (
    <div className="cash-management-container">
      <div style={{paddingBottom:"17px",fontWeight:"700",fontSize:"18px"}}>Cash Management</div>
    <div className='divnew'>
    <div className='cashtopbarforsearch'>
      <div className='newnew'>Analytics Overview</div>  
  
    
      <input type="date" className="freeuserlist-dateepicker" />
      </div>

      <div className="analytics-overview">
        <div className="analytics-card basic">
          <div className='cashnumbers'>8.4k</div>
          <p className="cashplan">Basic Plan Revenue</p>
          <p className="increase">10% Increase from Last Month</p>
        </div>
        <div className="analytics-card standard">
          <div className='cashnumbers'>14.9k</div>
          <p className="cashplan" >Standard Plan Revenue</p>
          <p className="no-change">No Change from Last Month</p>
        </div>
        <div className="analytics-card premium">
          <div className='cashnumbers'>201.4k</div>
          <p className="cashplan">Premium Plan Revenue</p>
          <p className="increase">3% Increase from Last Month</p>
        </div>
        <div className="analytics-card total">
          <div className='cashnumbers'>225.8k</div>
          <p className="cashplan"> Total Revenue</p>
          <p className="decrease">16% Decrease from Last Month</p>
        </div>
      </div>
    </div> 
      <div className="user-table">
        <div className="table-header">
          <div style={{fontWeight:"600"}}>All Users</div>
            <input type="text" placeholder="Search by name, phone..." className="freeuserlist-input" />
          <input type="date" className="freeuserlist-dateepicker" />
          <button className="filter-sort">
            < img src={filterbutton} alt='filt'/>
          </button>
        
        </div>
        
        <table>
          <thead>
            <tr>
              <th className='cashtableheading'>Full Name</th>
              <th className='cashtableheading'>Phone No</th>
              <th className='cashtableheading'>Subscription Type</th>
              <th className='cashtableheading'>Subscription Date</th>
              <th className='cashtableheading'>Payment Method</th>
              <th className='cashtableheading'>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bhavesh Kumar</td>
              <td>7690839130</td>
              <td className="premium-plan">Premium Plan</td>
              <td>12-03-2023</td>
              <td>UPI</td>
              <td>199</td>
            </tr>
            <tr>
              <td>Ram Bandhu</td>
              <td>8290839130</td>
              <td className="standard-plan">Standard Plan</td>
              <td>12-03-2023</td>
              <td>UPI</td>
              <td>199</td>
            </tr>
            <tr>
              <td>Manmohan Singh</td>
              <td>7890987680</td>
              <td className="premium-plan">Premium Plan</td>
              <td>12-03-2023</td>
              <td>UPI</td>
              <td>199</td>
            </tr>
            <tr>
              <td>Ekal Prasad Raj</td>
              <td>7690839130</td>
              <td className="standard-plan">Standard Plan</td>
              <td>12-03-2023</td>
              <td>UPI</td>
              <td>199</td>
            </tr>
            <tr>
              <td>Parvati Rakesh</td>
              <td>8290839130</td>
              <td className="basic-plan">Basic Plan</td>
              <td>12-03-2023</td>
              <td>UPI</td>
              <td>199</td>
            </tr>
            <tr>
              <td>Parvati Rakesh</td>
              <td>8290839130</td>
              <td className="basic-plan">Basic Plan</td>
              <td>12-03-2023</td>
              <td>UPI</td>
              <td>199</td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <Pagination />
    </div>
  );
};

export default CashManagement;
