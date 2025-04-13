import React, { useState } from 'react';
import axios from 'axios';
import './addCompany.css';

const AddCompany = () => {
    const [name, setName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState("");
    const [email, setEmail] = useState(''); // New state for email
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://clickmeal-backend.vercel.app/user/add-company', {
                name,
                deliveryAddress,
                numberOfEmployees:parseInt(numberOfEmployees),
                email, // Added email field to API payload
            });
            console.log('Company added:', response.data);
            
            // Show the success popup
            setShowSuccessPopup(true);
            
            // Optionally, reset the form fields
            setName('');
            setDeliveryAddress('');
            setNumberOfEmployees('');
            setEmail(''); // Reset email field
            
            // Hide the popup after 3 seconds
            setTimeout(() => setShowSuccessPopup(false), 3000);
        } catch (error) {
            console.error('Error adding company:', error);
        }
    };

    return (
        <div>
            <div className='addCompany-toptitle'>Add Company</div>
            <div className='addCompany-outsideContainer'> 
                <div className="addCompany-container">
                    <div className="addCompany-formContainer">
                        <div className='addCompany-formTitle'>Add New Company</div>
                        <form className='addCompany-form' onSubmit={handleSubmit}>
                            <div className="addCompany-formRow">
                                <input 
                                    className='addCompany-input' 
                                    type="text" 
                                    placeholder="Company Name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                                <input 
                                    className='addCompany-input' 
                                    type="text" 
                                    placeholder="Delivery Address" 
                                    value={deliveryAddress} 
                                    onChange={(e) => setDeliveryAddress(e.target.value)} 
                                />
                            </div>
                            <div className="addCompany-formRow">
                                <input 
                                    className='addCompany-input' 
                                    type="number" 
                                    placeholder="Number of Employees" 
                                    value={numberOfEmployees} 
                                    onChange={(e) => setNumberOfEmployees(e.target.value)} 
                                />
                                <input 
                                    className='addCompany-input' 
                                    type="email" 
                                    placeholder="Email Address" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>   
                            <button className="addCompany-submitBtn" type="submit">Add Company</button>
                        </form>
                    </div>
                </div>
            </div>
            
            {showSuccessPopup && (
                <div className="addCompany-successPopup">
                    Company added successfully!
                </div>
            )}
        </div>
    );
};

export default AddCompany;
