import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './couponForm.css';

const CouponForm = () => {
    const [couponName, setCouponName] = useState('');
    const [redemptionLimit, setRedemptionLimit] = useState('');
    const [description, setDescription] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [couponType, setCouponType] = useState('employee');
    const [employeeName, setEmployeeName] = useState('');
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [companies, setCompanies] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        // Fetch companies from the API
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('https://clickmeal-backend.vercel.app/user/get-company');
                setCompanies(response.data.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            couponName,
            redemptionLimit,
            description,
            expiryDate,
            couponType,
        };

        if (couponType === 'employee') {
            formData.employeeName = employeeName;
            formData.employeeEmail = employeeEmail;
        } else if (couponType === 'company') {
            formData.companyId = companyId;
        }

        try {
            const response = await axios.post('https://clickmeal-backend.vercel.app/user/coupan-generate', formData);
            console.log('Coupon generated:', response.data);
            setShowSuccessPopup(true);

            // Reset form fields after success
            setCouponName('');
            setRedemptionLimit('');
            setDescription('');
            setExpiryDate('');
            setEmployeeName('');
            setEmployeeEmail('');
            setCompanyId('');

            // Hide success popup after 3 seconds
            setTimeout(() => setShowSuccessPopup(false), 3000);
        } catch (error) {
            console.error('Error generating coupon:', error.response?.data || error.message);
        }
    };

    return (
        <div className="addReward-container">
            <div className="addReward-title">Generate Coupon</div>
            <form onSubmit={handleSubmit} className="addReward-form">
                <div className="addReward-column">
                    <input
                        type="text"
                        placeholder="Coupon Name"
                        value={couponName}
                        onChange={(e) => setCouponName(e.target.value)}
                        className="addReward-input"
                    />
                    <input
                        type="date"
                        placeholder="Expiry Date (yyyy-mm-dd)"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="addReward-input"
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                    />
                    <input
                        type="number"
                        placeholder="Redemption Limit"
                        value={redemptionLimit}
                        onChange={(e) => setRedemptionLimit(e.target.value)}
                        className="addReward-input"
                    />
                    <textarea
                        placeholder="Coupon Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="addReward-input addReward-textarea"
                    />
                </div>
                <div className="addReward-column">
                    <select
                        value={couponType}
                        onChange={(e) => setCouponType(e.target.value)}
                        className="addReward-input"
                    >
                        <option value="employee">Employee Coupon</option>
                        <option value="company">Company Coupon</option>
                    </select>
                    {couponType === 'employee' ? (
                        <>
                            <input
                                type="text"
                                placeholder="Employee Name"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                                className="addReward-input"
                            />
                            <input
                                type="email"
                                placeholder="Employee Email"
                                value={employeeEmail}
                                onChange={(e) => setEmployeeEmail(e.target.value)}
                                className="addReward-input"
                            />
                        </>
                    ) : (
                        <select
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                            className="addReward-input"
                        >
                            <option value="">Select Company</option>
                            {companies.map((company) => (
                                <option key={company._id} value={company._id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <button type="submit" className="addReward-submitBtn">Post</button>
                </div>
            </form>

            {showSuccessPopup && (
                <div className="addReward-successPopup">
                    Coupon generated successfully!
                </div>
            )}
        </div>
    );
};

export default CouponForm;
