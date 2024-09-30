import React from 'react';
import AddCustomer from './components/AddCustomer';
import CustomerList from './components/CustomerList';
import BrowseProducts from './components/BrowseProducts';
import { useAtom } from 'jotai';
import { customerAtom } from './state/atoms/customerAtom';
import { Customer } from './models/Customer';

const App: React.FC = () => {
    // Using Jotai to manage customers' state globally
    const [customers, setCustomers] = useAtom(customerAtom);

    // Function to handle when a customer is added
    const handleCustomerAdded = (newCustomer: Customer) => {
        setCustomers([...customers, newCustomer]); // Update the atom with the new customer
    };

    return (
        <div>
            <h1>Customer Management</h1>
            <AddCustomer onCustomerAdded={handleCustomerAdded} />
            <BrowseProducts />
            <CustomerList />
        </div>
    );
};

export default App;
