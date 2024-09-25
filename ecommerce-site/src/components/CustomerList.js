import React, { useState, useEffect } from "react";
import { getCustomers, deleteCustomer } from "../services/customerService";

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                console.log("Fetched customers:", data); // Should log customer data
                setCustomers(data);
            } catch (error) {
                console.error("Error fetching customers:", error); // Log any errors
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteCustomer(id);
            setCustomers(customers.filter(customer => customer.id !== id));
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    return (
        <div>
            <h2>Customer List</h2>
            {customers.length === 0 ? (
                <p>No customers available.</p>
            ) : (
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            {customer.name} - {customer.email}
                            <button onClick={() => handleDelete(customer.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomerList;
