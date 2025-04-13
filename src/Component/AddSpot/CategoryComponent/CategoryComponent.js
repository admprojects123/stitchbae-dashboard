import React, { useState } from 'react';
import './CategoryComponent.css';

const CategoriesComponent = () => {
    const [activeCategory, setActiveCategory] = useState('COPPER');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    return (
        <div className="categories-container">
            <div className="category-buttons">
                <button
                    className={`category-button ${activeCategory === 'COPPER' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('COPPER')}
                >
                    Copper
                </button>
                <button
                    className={`category-button ${activeCategory === 'Aluminum' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('Aluminum')}
                >
                    Aluminum
                </button>
                <button
                    className={`category-button ${activeCategory === 'Zinc' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('Zinc')}
                >
                    Zinc
                </button>
                <button
                    className={`category-button ${activeCategory === 'Brass' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('Brass')}
                >
                    Brass
                </button>
                <button
                    className={`category-button ${activeCategory === 'Gun Metal' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('Gun Metal')}
                >
                    Gun Metal
                </button>
                <button
                    className={`category-button ${activeCategory === 'Nickel Cathode' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('Nickel Cathode')}
                >
                    Nickel Cathode
                </button>
                <button
                    className={`category-button ${activeCategory === 'Tin' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('Tin')}
                >
                    Tin
                </button>
                <button
                    className={`category-button ${activeCategory === 'Lead' ? 'active' : ''}`}
                    onClick={() => handleCategoryClick('Lead')}
                >
                    Lead
                </button>
            </div>
        </div>
    );
};

export default CategoriesComponent;
    