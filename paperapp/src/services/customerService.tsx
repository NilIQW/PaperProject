// src/services/customerService.ts
import { Customer } from '../models/Customer';

const API_URL = "http://localhost:5074/api/customer";

// Define the API service for fetching customers
export const getCustomers = async (): Promise<Customer[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Unable to fetch customers");
    }
    return await response.json();
}

// Define the API service for adding a customer
export const addCustomer = async (customer: Customer): Promise<Customer> => {
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(customer),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        throw new Error("Unable to create customer");
    }

    return await response.json();
}

// Define the API service for updating a customer
export const updateCustomer = async (customerId: number, customer: Customer): Promise<Customer> => {
    const response = await fetch(`${API_URL}/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error('Failed to update customer');
    }
    return await response.json();
};

// Define the API service for deleting a customer
export const deleteCustomer = async (customerId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${customerId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete customer');
    }
};
