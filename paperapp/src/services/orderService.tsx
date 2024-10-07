import {Order} from "../models/Order.tsx";

const BASE_URL = 'http://localhost:5074/api/Orders'; // Replace with your actual API URL

export const createOrder = async (order: Order) => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            const errorDetails = await response.text(); // Capture error details from the response
            throw new Error(`Failed to create order: ${response.status} - ${errorDetails}`);
        }

        return await response.json(); // Assuming the API returns the created order
    } catch (error) {
        console.error('Error creating order:', error);
        throw error; // Rethrow the error to handle it in the component
    }
};
