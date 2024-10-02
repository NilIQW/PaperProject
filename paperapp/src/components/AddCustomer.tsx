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
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Customer Details</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
            />

            <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={styles.input}
            />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={styles.input}
            />

            <button type="submit" style={styles.button}>
                Add
            </button>
        </form>
    );
};

const styles = {
    form: {
        padding: '16px',
        maxWidth: '400px',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default AddCustomer;
