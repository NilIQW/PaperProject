// src/services/orderService.ts
import { Order } from '../models/Order';

const API_URL = "http://localhost:5074/api/orders"; // Adjust based on your API structure

export const getOrders = async (): Promise<Order[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Unable to fetch orders");
    }
    return await response.json();
};

export const createOrder = async (order: Order) => {
    try {
        const response = await fetch(`${API_URL}`, {
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

export const updateOrderStatus = async (order: Order) => {
    const response = await fetch(`${API_URL}/${order.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (!response.ok) {
        throw new Error("Unable to update order status");
    }
    return await response.json();
};


