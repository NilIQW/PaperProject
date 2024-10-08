import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation: React.FC = () => {
    const location = useLocation();
    const { orderDetails, customer, basket, totalPrice } = location.state || {};

    if (!orderDetails || !customer || !basket) {
        return <h2 style={{ color: 'red', textAlign: 'center' }}>No order details found</h2>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>Order Placed Successfully!</h2>

            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                <h3>Order Summary:</h3>
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Total Amount:</strong> {totalPrice.toFixed(2)} DKK</p>
                <p><strong>Number of Items:</strong> {basket.length}</p>
                <p><strong>Customer Name:</strong> {customer.name}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Address:</strong> {customer.address}</p>
            </div>

            <div style={{ textAlign: 'left' }}>
                <h3>Order Items:</h3>
                <ul>
                    {basket.map((item: any) => (
                        <li key={item.id}>
                            {item.name} - Quantity: {item.quantity}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderConfirmation;
