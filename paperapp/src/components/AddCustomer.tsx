import React, { useState } from 'react';
import { addCustomer } from '../services/customerService';
import {Customer} from "../models/Customer.tsx";
import {useAtom} from "jotai";
import {customerAtom} from "../state/atoms/customerAtom.tsx";


interface AddCustomerProps {
    onCustomerAdded?: (customer: Customer) => void;
}



const AddCustomer: React.FC<AddCustomerProps> = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [customer, setCustomer] = useAtom(customerAtom);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCustomer: Customer = { name, email, phone, address };
        try {
            const addedCustomer = await addCustomer(newCustomer);
            setCustomer([...customer, addedCustomer]);
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
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

            <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required/>

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required/>

            <button type="submit">Add</button>
        </form>
    );
};

export default AddCustomer;
