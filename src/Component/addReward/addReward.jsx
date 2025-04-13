import React, { useState } from 'react';
import axios from 'axios';
import './addReward.css';

const AddReward = () => {
    const [rewardName, setRewardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [requiredPoints, setRequiredPoints] = useState('');
    const [rewardCode, setRewardCode] = useState('');
    const [rewardDescription, setRewardDescription] = useState('');
    const [redemptionLimit, setRedemptionLimit] = useState('');
    const [aboutOffer, setAboutOffer] = useState(['']);
    const [termsOfUse, setTermsOfUse] = useState(['']);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleAddField = (stateSetter, stateValue) => {
        stateSetter([...stateValue, '']);
    };

    const handleRemoveField = (stateSetter, stateValue, index) => {
        stateSetter(stateValue.filter((_, i) => i !== index));
    };

    const handleFieldChange = (stateSetter, stateValue, index, value) => {
        const newValues = [...stateValue];
        newValues[index] = value;
        stateSetter(newValues);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('rewardName', rewardName);
        formData.append('expiryDate', expiryDate);
        formData.append('requiredPointsToRedeemReward', requiredPoints);
        formData.append('rewardCode', rewardCode);
        formData.append('rewardDescription', rewardDescription);
        formData.append('redemptionLimit', redemptionLimit);
        formData.append('aboutOffer', JSON.stringify(aboutOffer));
        formData.append('termsOfUse', JSON.stringify(termsOfUse));
        formData.append('image', image);

        try {
            const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-reward', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Reward added:', response.data);

            setShowSuccessPopup(true);
            setTimeout(() => setShowSuccessPopup(false), 3000);

            // Reset form fields
            setRewardName('');
            setExpiryDate('');
            setRequiredPoints('');
            setRewardCode('');
            setRewardDescription('');
            setRedemptionLimit('');
            setAboutOffer(['']);
            setTermsOfUse(['']);
            setImage(null);
            setImagePreview(null);
        } catch (error) {
            console.error('Error adding reward:', error);
        }
    };

    return (
        <div className="addReward-container">
            <div className="addReward-title">Add New Reward</div>
            <form className="addReward-form" onSubmit={handleSubmit}>
                <div className="addReward-column">
                    <input
                        className="addReward-input"
                        type="text"
                        placeholder="Reward Name"
                        value={rewardName}
                        onChange={(e) => setRewardName(e.target.value)}
                    />
                    <input
                        className="addReward-input"
                        type="date"
                        placeholder="Expiry Date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    <input
                        className="addReward-input"
                        type="number"
                        placeholder="Required Points to Redeem Reward"
                        value={requiredPoints}
                        onChange={(e) => setRequiredPoints(e.target.value)}
                    />
                    <input
                        className="addReward-input"
                        type="text"
                        placeholder="Reward Code"
                        value={rewardCode}
                        onChange={(e) => setRewardCode(e.target.value)}
                    />
                    <textarea
                        className="addReward-input addReward-textarea"
                        placeholder="About Offer Description"
                        value={rewardDescription}
                        onChange={(e) => setRewardDescription(e.target.value)}
                    />
                </div>

                <div className="addReward-column">
                    <input
                        className="addReward-input"
                        type="number"
                        placeholder="Redemption Limit"
                        value={redemptionLimit}
                        onChange={(e) => setRedemptionLimit(e.target.value)}
                    />
                    <div className="addReward-fileUpload">
                        <label>Upload Image (optional)</label><br></br>
                        <input type="file" onChange={handleImageChange} />
                        {imagePreview && (
                            <div className="addReward-imagePreview">
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className="addReward-section">
                        <div className="addReward-subtitle">About Offer</div>
                        {aboutOffer.map((offer, index) => (
                            <div key={index} className="addReward-dynamicInput">
                                <input
                                    type="text"
                                    placeholder={`About Offer ${index + 1}`}
                                    value={offer}
                                    onChange={(e) => handleFieldChange(setAboutOffer, aboutOffer, index, e.target.value)}
                                />
                                {aboutOffer.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveField(setAboutOffer, aboutOffer, index)}>-</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddField(setAboutOffer, aboutOffer)}>+</button>
                    </div>

                    <div className="addReward-section">
                        <div className="addReward-subtitle">Terms of Use</div>
                        {termsOfUse.map((term, index) => (
                            <div key={index} className="addReward-dynamicInput">
                                <input
                                    type="text"
                                    placeholder={`Term ${index + 1}`}
                                    value={term}
                                    onChange={(e) => handleFieldChange(setTermsOfUse, termsOfUse, index, e.target.value)}
                                />
                                {termsOfUse.length > 1 && (
                                    <button type="button" onClick={() => handleRemoveField(setTermsOfUse, termsOfUse, index)}>-</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddField(setTermsOfUse, termsOfUse)}>+</button>
                    </div>
                </div>

                <button className="addReward-submitBtn" type="submit">Add Reward</button>
            </form>

            {showSuccessPopup && <div className="addReward-successPopup">Reward added successfully!</div>}
        </div>
    );
};

export default AddReward;
