import React, { useEffect, useState } from 'react';
import './companylist.css';
import deleteimg from '../../assets/deleteimg.png';
import editimg from '../../assets/action.png';
import customerimg from '../../assets/customerimg.png';
import axios from 'axios'; // Import axios
import proimage from '../../assets/profile.png';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]); // Default to empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [deletePopup, setDeletePopup] = useState({ show: false, companyId: null });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true); // To show loading state
    const [error, setError] = useState(null); // To handle errors
    const [selectedCompany, setSelectedCompany] = useState(null); // To store selected company details

    useEffect(() => {
        // Fetch the list of companies
        axios.get('https://clouthing-ecommerce-backend.vercel.app/user/list')
            .then((response) => {
                if (response.data.message === 'Users fetched successfully') {
                    setCompanies(response.data.users || []); // Ensure the data is always an array
                } else {
                    setError('Failed to load customers');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching customers:', error);
                setError('Failed to load customers');
                setLoading(false);
            });
    }, []);

    const handleDeleteCompany = async (companyId) => {
        try {
            const response = await fetch(
                `https://clickmeal-backend.vercel.app/user/delete-company?id=${companyId}`,
                {
                    method: 'DELETE',
                }
            );
            const result = await response.json();
            if (result.message === 'Company deleted successfully') {
                setCompanies(companies.filter((company) => company._id !== companyId));
                setMessage('Company deleted successfully!');
            } else {
                setMessage('Failed to delete the company.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setDeletePopup({ show: false, companyId: null });
            setTimeout(() => setMessage(''), 3000); // Clear the message after 3 seconds
        }
    };

    // Fetch user details when a company row is clicked
    const handleViewDetails = async (company) => {
        try {
            const response = await axios.get(`https://clouthing-ecommerce-backend.vercel.app/user/details/${company._id}`);
            console.log('API Response:', response.data);  // Log the response to ensure it's correct
            setSelectedCompany(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Failed to fetch user details. Please try again.');
        }
    };
    
    
    
    

    // Filter companies based on search term and filter criteria
    const filteredCompanies = (companies || []).filter((company) => {
        const matchesSearchTerm =
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.email.toLowerCase().includes(searchTerm.toLowerCase()); // Changed to email instead of address

        return matchesSearchTerm;
    });

    return (
        <div className="companyList-container">
            <div className="expired-title-top" style={{ fontSize: '22px', fontWeight: '400', paddingBottom: '10px', color: '#1C2A53' }}>
                Customers
            </div>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="companyList-searchInput"
            />

            {message && <div className="companyList-message">{message}</div>}

            {loading ? (
                <p>Loading customers...</p>
            ) : error ? (
                <p>{error}</p>
            ) : selectedCompany ? (
<div className="customerDetails-container">
    <div className="customerDetails-header">
        <img src={customerimg} alt="Profile" className="customerDetails-profile" />
        <div className="customerDetails-info">
            <div className="flexinfo">
                <div>
                    <h2>{selectedCompany.name}</h2>
                    <div>Email: {selectedCompany.email}</div>
                </div>
                <div>
                    <div>Personal Information</div>
                    <p><strong>Phone No:</strong> {selectedCompany.phone || 'N/A'}</p>
                    <p><strong>Member Since:</strong> {new Date(selectedCompany.createdAt).toLocaleDateString() || 'N/A'}</p>
                </div>
                <div>
                    <div>Address</div>
                    {selectedCompany.address && selectedCompany.address.length > 0 ? (
                        selectedCompany.address.map((addr, index) => (
                            <div key={addr._id}>
                                <p><strong>Address {index + 1}:</strong></p>
                                <p>{addr.streetAddress}, {addr.townCity}, {addr.state}, {addr.country}, {addr.zipCode}</p>
                                {addr.isDefault && <p>(Default Address)</p>}
                            </div>
                        ))
                    ) : (
                        <p>No address available</p>
                    )}
                </div>
            </div>
        </div>
    </div>
    <div className="companyList-tabs">
        <button className="companytab-button active">All Orders</button>
        <button className="companytab-button">On the Way</button>
        <button className="companytab-button">Completed</button>
    </div>
    <div className="customerDetails-content">
        <div className="customerDetails-orders">
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date & Time</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment Method</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#123456</td>
                        <td>24 Dec 2024</td>
                        <td>{selectedCompany.name}</td>
                        <td>$200</td>
                        <td>Credit Card</td>
                    </tr>
                    {/* Add more rows dynamically if needed */}
                </tbody>
            </table>
        </div>
    </div>
</div>
            ) : (
                <div className="companyList-card">
                    <table className="companyList-table">
                        <thead>
                            <tr className="customertopname">
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>NO OF ORDERS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCompanies.map((company) => (
                                <tr key={company._id} onClick={() => handleViewDetails(company)}>
                                    <td style={{ display: "flex", alignItems: "center" }}>
                                        <img src={proimage} alt="Profile" className="companyList-profileImage" />
                                        {company.name}
                                    </td>
                                    <td>{company.email}</td>
                                    <td>{company.totalOrders}</td>
                                    <td>
                                        <button className="companyList-editBtn">
                                            <img src={editimg} alt="Action" className="companyList-action-img" />
                                        </button>
                                        <button
                                            className="companyList-deleteBtn"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering row click
                                                setDeletePopup({ show: true, companyId: company._id });
                                            }}
                                        >
                                            <img src={deleteimg} alt="Delete" className="companyList-action-img" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {deletePopup.show && (
                <div className="companyList-popup">
                    <div className="companyList-popupContent">
                        <p>Are you sure you want to delete this customer?</p>
                        <div className="companyList-popupActions">
                            <button onClick={() => setDeletePopup({ show: false, companyId: null })}>Cancel</button>
                            <button onClick={() => handleDeleteCompany(deletePopup.companyId)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyList;