import React, { useEffect, useState } from 'react';
import { Order } from '../models/Order'; // Adjust the import path as necessary

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchOrders();
    }, [searchQuery]);

    const fetchOrders = async () => {
        try {
            const url = searchQuery ?
                `http://localhost:5074/api/Orders/search?query=${searchQuery}` :
                `http://localhost:5074/api/Orders`; // Fetch all orders if search query is empty

            const response = await fetch(url);

            // Check if the response is ok (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Check if the response contains valid data
            const fetchedOrders = data.$values ? data.$values.map((order: any) => ({
                $id: order.$id,
                id: order.id,
                orderDate: order.orderDate,
                deliveryDate: order.deliveryDate,
                status: order.status,
                totalAmount: order.totalAmount,
                customerId: order.customerId,
                customer: order.customer, // Assuming this matches your Customer model
                orderEntries: order.orderEntries?.$values.map((entry: any) => ({
                    $id: entry.$id,
                    id: entry.id,
                    productId: entry.productId,
                    quantity: entry.quantity,
                    orderId: entry.orderId,
                    product: entry.product // Include the product details
                })) || [] // Default to an empty array if undefined
            })) : []; // Default to an empty array if $values is not present

            console.log("Fetched Orders: ", fetchedOrders);
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="order-history">
            <h1>Order History</h1>
            <input
                type="text"
                placeholder="Search by customer name or email"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <table>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Total Amount</th>
                    <th>Order Entries</th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <tr key={order.$id}>
                            <td>{order.id}</td>
                            <td>{order.customer?.name}</td>
                            <td>{order.customer?.email}</td>
                            <td>{order.totalAmount}</td>
                            <td>
                                {order.orderEntries.length > 0 ? (
                                    order.orderEntries.map(entry => (
                                        <div key={entry.$id}> {/* Ensure each entry has a unique key */}
                                            Product ID: {entry.productId}, Quantity: {entry.quantity}
                                        </div>
                                    ))
                                ) : (
                                    <div>No entries</div>  // Handle case when there are no order entries
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5}>No orders found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
