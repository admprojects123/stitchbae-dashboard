import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './couponList.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';

const CouponList = () => {
    const [coupons, setCoupons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [deletePopup, setDeletePopup] = useState({ show: false, couponId: null });
    const [message, setMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [isAddCouponPage, setIsAddCouponPage] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        limit: '1',
        description: '',
        expiryDate: ''
    });

    useEffect(() => {
        fetch('https://stitch-commerce-admaya.vercel.app/coupon/listCoupons')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setCoupons(data.coupons);
                } else {
                    setMessage('Failed to fetch coupons.');
                }
            })
            .catch(error => {
                console.error('Error fetching coupons:', error);
                setMessage('Error fetching coupons.');
            });
    }, []);

    const showToast = (text) => {
        setMessage(text);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
            setMessage('');
        }, 3000);
    };
    const handleDeleteCoupon = async (couponId) => {
        try {
            // Log the API request details
            console.log('Sending DELETE request to delete coupon with ID:', couponId);
    
            // Updated API URL format
            const response = await fetch(`https://stitch-commerce-admaya.vercel.app/coupon/deleteCoupon/${couponId}`, {
                method: 'DELETE',
            });
    
            // Log the response details
            console.log('API Response:', response);
    
            // Check if the response is OK (status 200)
            if (!response.ok) {
                showToast(`Failed to delete the coupon. Status: ${response.status}`);
                console.error('Failed to delete the coupon. Status:', response.status);
                return;
            }
    
            // Parse the response body (assuming it's JSON)
            const result = await response.json();
            console.log('API Result:', result);
    
            // Handle successful deletion based on the response content
            if (result.message === 'Coupon deleted successfully.') {
                // Remove the deleted coupon from the state
                setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
                showToast('Coupon deleted successfully!');
            } else {
                showToast('Failed to delete the coupon.');
            }
        } catch (error) {
            console.error('Error while deleting coupon:', error);
            showToast(`Error: ${error.message}`);
        } finally {
            setDeletePopup({ show: false, couponId: null });
        }
    };
    

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://stitch-commerce-admaya.vercel.app/coupon/addCoupon', {
                name: formData.name,
                limit: parseInt(formData.limit, 10),
                description: formData.description,
                expiryDate: formData.expiryDate
            });
            if (response.data.message === "Coupon added successfully.") {
                showToast('Coupon added successfully!');
                setIsAddCouponPage(false);
                setFormData({
                    name: '',
                    limit: '1',
                    description: '',
                    expiryDate: ''
                });
                fetch('https://stitch-commerce-admaya.vercel.app/coupon/listCoupons')
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setCoupons(data.coupons);
                        } else {
                            showToast('Failed to fetch updated coupons.');
                        }
                    })
                    .catch(error => console.error("Error fetching coupons:", error));
            } else {
                showToast('Failed to add the coupon.');
            }
        } catch (error) {
            showToast(`Error: ${error.message}`);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const filteredCoupons = coupons.filter(coupon => {
        const matchesSearchTerm =
            coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDate = filterDate
            ? new Date(coupon.createdAt).toISOString().split('T')[0] === filterDate
            : true;

        return matchesSearchTerm && matchesDate;
    });

    const getStatus = (expiryDate) => {
        const today = new Date();
        const expirationDate = new Date(expiryDate);
        return expirationDate > today ? 'Active' : 'Expired';
    };

    return (
        <div className="couponList-container">
            {isAddCouponPage ? (
                <div className="addCoupon-page">
                    <div className='titleaddcoupon'>
                        <button className="backButton" onClick={() => setIsAddCouponPage(false)}>
                            &larr;
                        </button>
                        <div className="addCoupon-title">Add Coupon</div>
                    </div>
                    <form className="addCoupon-form" onSubmit={handleAddCoupon}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Coupon Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter coupon name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Redemption Limit</label>
                                <input
                                    type="number"
                                    name="limit"
                                    value={formData.limit}
                                    onChange={handleInputChange}
                                    required
                                    min="1"
                                    placeholder="Enter redemption limit"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>
                        </div>
                        <div className="form-row buttons-row">
                            <button className="saveButton" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="couponList-title">Coupons</div>
                    <div className="couponList-searchFilter">
                        <div className="flexgrpforbutton">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="couponList-searchInput"
                            />
                            <button
                                className="addcouponbutton"
                                onClick={() => setIsAddCouponPage(true)}
                            >
                                Add Coupon
                            </button>
                        </div>
                    </div>

                    <div className="couponList-card">
                        <table className="couponList-table">
                            <thead>
                                <tr>
                                    <th>Coupon Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Description</th>
                                    <th>Code</th>
                                    <th>Limit</th>
                                    <th>Status</th>
                                    <th>Action</th> {/* NEW */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoupons.map(coupon => (
                                    <tr key={coupon._id}>
                                        <td>{coupon.name}</td>
                                        <td>{new Date(coupon.createdAt).toLocaleDateString()}</td>
                                        <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                                        <td>{coupon.description}</td>
                                        <td>{coupon.code}</td>
                                        <td>{coupon.limit}</td>
                                        <td className={
                                            getStatus(coupon.expiryDate) === 'Active'
                                                ? 'status-active'
                                                : 'status-expired'
                                        }>
                                            {getStatus(coupon.expiryDate)}
                                        </td>
                                        <td>
                                            <button
                                                className="delete-btn-icon"
                                                onClick={() => setDeletePopup({ show: true, couponId: coupon._id })}
                                            >
                                                <img src={deleteimg} alt="Delete" width="18" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {deletePopup.show && (
                <div className="couponList-popup">
                    <div className="couponList-popupContent">
                        <p>Are you sure you want to delete this coupon?</p>
                        <div className="couponList-popupActions">
                            <button onClick={() => setDeletePopup({ show: false, couponId: null })}>
                                Cancel
                            </button>
                            <button onClick={() => handleDeleteCoupon(deletePopup.couponId)}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Message */}
            {toastVisible && (
                <div className="toast-notification">
                    {message}
                </div>
            )}
        </div>
    );
};

export default CouponList;
