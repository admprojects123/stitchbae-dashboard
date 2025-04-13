import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addBanner.css';

const AddBanner = () => {
    const [bannerName, setBannerName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [currentBanners, setCurrentBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-banner');
                setCurrentBanners(response.data.banners);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Set image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', bannerName);
        formData.append('image', image);

        try {
            const response = await axios.post('https://clothing-backend-one.vercel.app/user/add-banner', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Banner added:', response.data);

            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);

            // Reset the form
            setBannerName('');
            setImage(null);
            setImagePreview(null);

            // Refresh banners
            const updatedBanners = await axios.get('https://clickmeal-backend.vercel.app/user/get-banner');
            setCurrentBanners(updatedBanners.data.banners);
        } catch (error) {
            console.error('Error adding banner:', error);
        }
    };

    return (
        <div className="addBanner-container">
            <div className="addBanner-title">Add Banner</div>
            <form className="addBanner-form" onSubmit={handleSubmit}>
                <div className="addBanner-left">
                    <div>Home Page Banner</div>
                    <input
                        className="addBanner-input"
                        type="text"
                        placeholder="Banner Name"
                        value={bannerName}
                        onChange={(e) => setBannerName(e.target.value)}
                    />
                </div>

                <div className="addBanner-right">
                    <div className="addBanner-fileUpload">
                        <label>Upload Image</label><br />
                        <input type="file" onChange={handleImageChange} />
                        {imagePreview && (
                            <div className="addBanner-imagePreview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <button className="addBanner-submitBtn" type="submit">Add Banner</button>
            </form>

            {showSuccessPopup && <div className="addBanner-successPopup">Banner added successfully!</div>}

            <div className="currentBanners-container">
                <h2 className="currentBanners-title">Current Banners</h2>
                <div className="currentBanners-list">
                    {currentBanners.map((banner) => (
                        <div key={banner._id} className="currentBanner-item">
                            {banner.name && <p>{banner.name}</p>}
                            <img src={banner.image} alt="Banner" className="currentBanner-image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddBanner;
