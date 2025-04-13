import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './couponList.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';

const CouponList = () => {
    const [coupons, setCoupons] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [deletePopup, setDeletePopup] = useState({ show: false, couponId: null });
    const [message, setMessage] = useState('');
    const [isAddCouponPage, setIsAddCouponPage] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        limit: '1',
        description: '',
        expiryDate: ''
    });

    // Fetch coupons from the new API
    useEffect(() => {
        fetch('https://clouthing-ecommerce-backend.vercel.app/coupon/listCoupons')
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

    const handleDeleteCoupon = async (couponId) => {
        try {
            const response = await fetch(`https://clouthing-ecommerce-backend.vercel.app/coupon/deleteCoupon?id=${couponId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.message === 'Coupon deleted successfully.') {
                setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
                setMessage('Coupon deleted successfully!');
            } else {
                setMessage('Failed to delete the coupon.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setDeletePopup({ show: false, couponId: null });
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleAddCoupon = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://clouthing-ecommerce-backend.vercel.app/coupon/addCoupon', {
                name: formData.name,
                limit: parseInt(formData.limit, 10), // Ensure limit is a number
                description: formData.description,
                expiryDate: formData.expiryDate
            });
            if (response.data.message === "Coupon added successfully.") {
                setMessage('Coupon added successfully!');
                setIsAddCouponPage(false);
                setFormData({
                    name: '',
                    limit: '1',
                    description: '',
                    expiryDate: ''
                });
                // Refresh the coupon list
                fetch('https://clouthing-ecommerce-backend.vercel.app/coupon/listCoupons')
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setCoupons(data.coupons);
                        } else {
                            setMessage('Failed to fetch updated coupons.');
                        }
                    })
                    .catch(error => console.error("Error fetching coupons:", error));
            } else {
                setMessage('Failed to add the coupon.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setTimeout(() => setMessage(''), 3000);
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
                                <select
                                    name="limit"
                                    value={formData.limit}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="1">1</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </select>
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

                    {message && <div className="couponList-message">{message}</div>}

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
                                    <th>Action</th>
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
                                        <td
                                            className={
                                                getStatus(coupon.expiryDate) === 'Active'
                                                    ? 'status-active'
                                                    : 'status-expired'
                                            }
                                        >
                                            {getStatus(coupon.expiryDate)}
                                        </td>
                                        <td>
                                            <button className="couponList-editBtn">
                                                <img src={editimg} alt="Edit" className="couponList-action-img" />
                                            </button>
                                            <button
                                                className="couponList-deleteBtn"
                                                onClick={() => setDeletePopup({ show: true, couponId: coupon._id })}
                                            >
                                                <img src={deleteimg} alt="Delete" className="couponList-action-img" />
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
        </div>
    );
};

export default CouponList;
