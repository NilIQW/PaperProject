import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { addCustomer } from '../services/customerService';
import { createOrder } from '../services/orderService';
import { useAtom } from 'jotai';
import { nameAtom, emailAtom, phoneAtom, addressAtom } from '../atoms/customerAtom';
import { basketAtom, basketTotalPriceAtom } from '../atoms/basketAtom';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order.tsx'; // Adjust the path as needed

const AddCustomer: React.FC = () => {
    const navigate = useNavigate(); // Get the navigate function
    const [name, setName] = useAtom(nameAtom);
    const [email, setEmail] = useAtom(emailAtom);
    const [phone, setPhone] = useAtom(phoneAtom);
    const [address, setAddress] = useAtom(addressAtom);
    const [basket, setBasket] = useAtom(basketAtom);
    const [totalPrice] = useAtom(basketTotalPriceAtom);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newCustomer: Customer = { name, email, phone, address };

        try {
            // Create a new customer
            const addedCustomer = await addCustomer(newCustomer);

            if (!addedCustomer.id) {
                throw new Error("Customer ID is undefined after creation.");
            }

            // Prepare order details
            const orderDetails: Order = {
                totalAmount: totalPrice,
                customerId: addedCustomer.id,
                status: "Pending", // Add a default status
                orderEntries: basket.map(item => ({
                    productId: item.id,
                    quantity: item.quantity ?? 0,  // Ensure quantity is defined; default to 0 if undefined
                })),
            };

            // Create the order
            const createdOrder = await createOrder(orderDetails);

            // Navigate to the confirmation page and pass the order details, customer details, and basket info
            navigate('/order-confirmation', {
                state: {
                    orderDetails: createdOrder,
                    customer: newCustomer,  // Pass customer details
                    basket,                 // Pass basket items
                    totalPrice,             // Pass total price
                },
            });

            // Reset the fields
            setName('');
            setEmail('');
            setPhone('');
            setAddress('');
            setBasket([]);

        } catch (error) {
            console.error('Error in handleSubmit:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>Customer Details</h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
            />

            <input
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={styles.input}
            />

            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={styles.input}
            />

            <button type="submit" style={styles.button}>
                Add
            </button>
        </form>
    );
};

const styles = {
    form: {
        padding: '16px',
        maxWidth: '400px',
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
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default AddCustomer;
