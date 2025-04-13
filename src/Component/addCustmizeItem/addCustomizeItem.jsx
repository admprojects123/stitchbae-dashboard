import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../addItem/addItem.css';

const AddCustomizeItem = () => {
    const [itemName, setItemName] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [subcategories, setSubcategories] = useState([]); // Store subcategories from API
    const [price, setPrice] = useState('');
    const [isVeg, setIsVeg] = useState(true);
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [nutritionalInfo, setNutritionalInfo] = useState(['']);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [companies, setCompanies] = useState([]); // Store companies from API
    const [companyId, setCompanyId] = useState(''); // Selected company ID

    useEffect(() => {
        // Fetch subcategories from the API
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('https://clickmeal-backend.vercel.app/user/subcategory-list');
                setSubcategories(response.data.data); // Set fetched subcategories
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        // Fetch companies from the API
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-company');
                setCompanies(response.data.data); // Set fetched companies
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchSubcategories();
        fetchCompanies();
    }, []);

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredient = () => setIngredients([...ingredients, '']);
    const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));

    const handleNutritionalInfoChange = (index, value) => {
        const newNutritionalInfo = [...nutritionalInfo];
        newNutritionalInfo[index] = value;
        setNutritionalInfo(newNutritionalInfo);
    };

    const addNutritionalInfo = () => setNutritionalInfo([...nutritionalInfo, '']);
    const removeNutritionalInfo = (index) => setNutritionalInfo(nutritionalInfo.filter((_, i) => i !== index));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('subcategory', subcategory); // Selected subcategory ID
        formData.append('price', price);
        formData.append('isVeg', String(isVeg));
        formData.append('description', description);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('nutritionalInfo', JSON.stringify(nutritionalInfo));
        formData.append('companyId', companyId); // Selected company ID
        formData.append('image', image);

        try {
            const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-customize-meal', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Customized Item added:', response.data);
            
            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);
            
            // Reset the form
            setItemName('');
            setSubcategory('');
            setPrice('');
            setIsVeg(true);
            setDescription('');
            setIngredients(['']);
            setNutritionalInfo(['']);
            setImage(null);
            setImagePreview(null);
            setCompanyId('');
        } catch (error) {
            console.error('Error adding customized item:', error);
        }
    };

    return (
        <div className="addItem-container">
            <div className="addItem-title">Add Customized Item</div>
            <form className="addItem-form" onSubmit={handleSubmit}>
                <div className="addItem-column">
                    <input 
                        className="addItem-input" 
                        type="text" 
                        placeholder="Item Name" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                    />

                    {/* Subcategory Dropdown */}
                    <select 
                        className="addItem-input" 
                        value={subcategory} 
                        onChange={(e) => setSubcategory(e.target.value)}
                    >
                        <option value="">Select Subcategory</option>
                        {subcategories.map((sub) => (
                            <option key={sub._id} value={sub._id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>

                    {/* Company Dropdown */}
                    <select 
                        className="addItem-input" 
                        value={companyId} 
                        onChange={(e) => setCompanyId(e.target.value)}
                    >
                        <option value="">Select Company</option>
                        {companies.map((company) => (
                            <option key={company._id} value={company._id}>
                                {company.name}
                            </option>
                        ))}
                    </select>

                    <input 
                        className="addItem-input" 
                        type="number" 
                        placeholder="Price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />

                    <textarea 
                        className="addItem-input addItem-textarea" 
                        placeholder="Item Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <div className="addItem-column">
                    <div className="addItem-vegOptions">
                        <label><input type="radio" value="true" checked={isVeg === true} onChange={() => setIsVeg(true)} /> Veg</label>
                        <label><input type="radio" value="false" checked={isVeg === false} onChange={() => setIsVeg(false)} /> Non Veg</label>
                    </div>

                    <div className="addItem-section">
                        {ingredients.map((ingredient, index) => (
                            <div key={index} className="addItem-dynamicInput">
                                <input 
                                    type="text" 
                                    placeholder={`${index + 1}. Ingredient`} 
                                    value={ingredient} 
                                    onChange={(e) => handleIngredientChange(index, e.target.value)} 
                                />
                                {ingredients.length > 1 && <button type="button" onClick={() => removeIngredient(index)}>-</button>}
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient}>+</button>
                    </div>

                    <div className="addItem-section">
                        {nutritionalInfo.map((info, index) => (
                            <div key={index} className="addItem-dynamicInput">
                                <input 
                                    type="text" 
                                    placeholder={`${index + 1}. Nutritional Info`} 
                                    value={info} 
                                    onChange={(e) => handleNutritionalInfoChange(index, e.target.value)} 
                                />
                                {nutritionalInfo.length > 1 && <button type="button" onClick={() => removeNutritionalInfo(index)}>-</button>}
                            </div>
                        ))}
                        <button type="button" onClick={addNutritionalInfo}>+</button>
                    </div>

                    <div className="addItem-fileUpload">
                        <label>Upload Image (optional)</label>
                        <input type="file" onChange={handleImageChange} />
                        {imagePreview && (
                            <div className="addItem-imagePreview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <button className="addItem-submitBtn" type="submit">Add Customized Item</button>
            </form>
            
            {showSuccessPopup && <div className="addItem-successPopup">Customized Item added successfully!</div>}
        </div>
    );
};

export default AddCustomizeItem;
