// src/components/AddCustomer.js
import React, { useState } from 'react';
import { addCustomer } from '../services/customerService';

const AddCustomer = ({ onCustomerAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCustomer = { name, email };
        try {
            const addedCustomer = await addCustomer(newCustomer);
            onCustomerAdded(addedCustomer);
            setName('');
            setEmail('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Customer</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddCustomer;
