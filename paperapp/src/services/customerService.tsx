// src/services/customerService.ts
import { Customer } from '../models/Customer';

const API_URL = "http://localhost:5074/api/customer";

// Define the API service for fetching customers
export const getCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            const errorData = await response.json(); // Get the error message from the response
            throw new Error(`Unable to fetch customers: ${errorData.message || response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error; // Rethrow the error for further handling
    }
}

// Define the API service for adding a customer
export const addCustomer = async (customer: Customer): Promise<Customer> => {
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(customer),
        headers: { 'Content-Type': 'application/json' },
    });

    // Log the raw response for debugging
    const textResponse = await response.text(); // Get the response as text
    if (!response.ok) {
        console.error("Error creating customer:", textResponse); // Log the error response
        throw new Error("Unable to create customer");
    }

    return JSON.parse(textResponse); // Parse the response as JSON
}

// Define the API service for updating a customer
export const updateCustomer = async (customerId: number, customer: Customer): Promise<Customer> => {
    try {
        const response = await fetch(`${API_URL}/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            const errorData = await response.json(); // Get the error message from the response
            throw new Error(`Failed to update customer: ${errorData.message || response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Define the API service for deleting a customer
export const deleteCustomer = async (customerId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/${customerId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const errorData = await response.json(); // Get the error message from the response
            throw new Error(`Failed to delete customer: ${errorData.message || response.statusText}`);
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error; // Rethrow the error for further handling
    }
};
