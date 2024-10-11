// src/components/CustomerList.tsx
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { customerAtom, loadCustomersAtom } from '../atoms/customerAtom';

const CustomerList: React.FC = () => {
    const [customers] = useAtom(customerAtom); // `customers` comes from the global atom
    const [, loadCustomers] = useAtom(loadCustomersAtom); // Action atom to load customers

    useEffect(() => {
        loadCustomers(); // Trigger loading customers into the `customerAtom`
    }, [loadCustomers]);

    return (
        <div>
            <h2>Customer List</h2>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.email}>
                        {customer.name} - {customer.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerList;
