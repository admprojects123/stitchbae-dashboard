import React, { useState } from 'react';
import axios from 'axios';
import './addSubcategory.css';

const AddSubcategory = () => {
    const [subcategoryName, setSubcategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Options for category radio buttons
    const categories = [
        { id: '6729da4402343f97c27d61cd', name: 'Entree' },
        { id: '6729da6802343f97c27d61cf', name: 'Plat' },
        { id: '6729da7b02343f97c27d61d1', name: 'Dessert' }
    ];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Set image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', subcategoryName);
        formData.append('categoryId', categoryId);
        formData.append('image', image);

        try {
            const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-subcategory', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Subcategory added:', response.data);

            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);

            // Reset the form
            setSubcategoryName('');
            setCategoryId('');
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error adding subcategory:', error);
        }
    };

    return (
        <div className="addSubcategory-container">
            <div className="addSubcategory-title">Add Subcategory</div>
            <form className="addSubcategory-form" onSubmit={handleSubmit}>
                <div className="addSubcategory-left">
                <label>Category</label>
                    <div className="addSubcategory-radioGroup">
                        
                        {categories.map((category) => (
                            <label key={category.id} className="radio-option">
                                <input 
                                    type="radio" 
                                    name="category" 
                                    value={category.id} 
                                    checked={categoryId === category.id} 
                                    onChange={(e) => setCategoryId(e.target.value)} 
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>

                    <input 
                        className="addSubcategory-input" 
                        type="text" 
                        placeholder="Subcategory Name" 
                        value={subcategoryName} 
                        onChange={(e) => setSubcategoryName(e.target.value)} 
                    />
                </div>

                <div className="addSubcategory-right">
                    <div className="addSubcategory-fileUpload">
                        <label>Upload Image (optional)</label>
                        <input type="file" onChange={handleImageChange} />
                        {imagePreview && (
                            <div className="addSubcategory-imagePreview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <button className="addSubcategory-submitBtn" type="submit">Add Subcategory</button>
            </form>
            
            {showSuccessPopup && <div className="addSubcategory-successPopup">Subcategory added successfully!</div>}
        </div>
    );
};

export default AddSubcategory;
