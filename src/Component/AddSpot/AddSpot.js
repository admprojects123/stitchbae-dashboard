import React from 'react';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import CategoriesComponent from './CategoryComponent/CategoryComponent';
import EditableTable from './SpotTable/spottable';
import './AddSpot.css';

const AddSpotPrice = () => {
    return (
        <div className="spot-price-container">
            <HeaderComponent />
            <CategoriesComponent/>
            <EditableTable/>
          
        </div>
    );
};

export default AddSpotPrice;
