// src/components/OrderHistory.tsx

import React, { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus } from '../services/orderService'; // Ensure this service has the update function
import { Order } from '../models/Order';
import { OrderEntry } from '../models/OrderEntry'; // Adjust path if necessary

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [deliveryDate, setDeliveryDate] = useState<string>('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getOrders();
                setOrders(fetchedOrders);
                setFilteredOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const results = orders.filter(order => {
            const customerName = order.customer?.name.toLowerCase() || '';
            const customerEmail = order.customer?.email.toLowerCase() || '';
            return (
                customerName.includes(searchTerm.toLowerCase()) ||
                customerEmail.includes(searchTerm.toLowerCase())
            );
        });
        setFilteredOrders(results);
    }, [searchTerm, orders]);

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
    };

    const handleStatusChange = async () => {
        if (selectedOrder && deliveryDate) {
            const updatedOrder = {
                ...selectedOrder,
                status: 'Delivered',
                deliveryDate
            };

            try {
                await updateOrderStatus(updatedOrder);
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === updatedOrder.id ? updatedOrder : order
                    )
                );
                setSelectedOrder(null); // Close the details view
                setDeliveryDate(''); // Reset delivery date
            } catch (error) {
                console.error("Error updating order status:", error);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Order History</h2>

            <input
                type="text"
                placeholder="Search by customer name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />

            <table style={styles.table}>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Total Amount</th>
                    <th>Order Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.map(order => (
                    <tr key={order.id} onClick={() => handleOrderClick(order)} style={styles.row}>
                        <td>{order.id}</td>
                        <td>{order.customer?.name}</td>
                        <td>{order.customer?.email}</td>
                        <td>{order.totalAmount.toFixed(2)} $</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div style={styles.details}>
                    <h3>Order Details</h3>
                    <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                    <p><strong>Customer Name:</strong> {selectedOrder.customer?.name}</p>
                    <p><strong>Email:</strong> {selectedOrder.customer?.email}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>

                    <h4>Papers Ordered:</h4>
                    <ul>
                        {selectedOrder.orderEntries.map((entry: OrderEntry) => (
                            <li key={entry.id}>{entry.product?.name} (Quantity: {entry.quantity})</li>
                        ))}
                    </ul>
                    <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        placeholder="Delivery Date"
                        style={styles.deliveryInput}
                    />
                    <button onClick={handleStatusChange} style={styles.updateButton}>
                        Mark as Delivered
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '16px',
        maxWidth: '800px',
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
    searchInput: {
        width: '100%',
        padding: '8px',
        marginBottom: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    row: {
        cursor: 'pointer',
    },
    details: {
        marginTop: '16px',
        padding: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
    },
    deliveryInput: {
        marginTop: '8px',
        width: '100%',
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    updateButton: {
        marginTop: '8px',
        padding: '10px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default OrderHistory;
