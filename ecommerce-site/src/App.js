import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';

const App = () => {
  const [customers, setCustomers] = useState([]);

  const handleCustomerAdded = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  return (
      <div>
        <h1>Customer Management</h1>
        <AddCustomer onCustomerAdded={handleCustomerAdded} />
        <CustomerList />
      </div>
  );
};

export default App;
