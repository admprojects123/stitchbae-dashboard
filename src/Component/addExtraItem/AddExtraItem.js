import React, { useState } from 'react';
import axios from 'axios';
import './AddExtraItem.css';

const AddExtraItem = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-extrameal', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Extra item added:', response.data);

            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);

            // Reset the form
            setName('');
            setDescription('');
            setPrice('');
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error adding extra item:', error.response?.data || error.message);
        }
    };

    return (
        <div className="addExtraItem-container">
            <div className="addExtraItem-title">Add Extra Item</div>
            <form className="addExtraItem-form" onSubmit={handleSubmit}>
                <div className="addExtraItem-column">
                    <input
                        className="addExtraItem-input"
                        type="text"
                        placeholder="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        className="addExtraItem-input addExtraItem-textarea"
                        placeholder="Item Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        className="addExtraItem-input"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="addExtraItem-column">
                    <div className="addExtraItem-fileUpload">
                        <label>Upload Image (optional)</label>
                        <input type="file" onChange={handleImageChange} />
                        {imagePreview && (
                            <div className="addExtraItem-imagePreview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <button className="addExtraItem-submitBtn" type="submit">
                    Add Extra Item
                </button>
            </form>

            {showSuccessPopup && <div className="addExtraItem-successPopup">Extra item added successfully!</div>}
        </div>
    );
};

export default AddExtraItem;
