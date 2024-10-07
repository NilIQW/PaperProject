import React from 'react';
import { useAtom } from 'jotai';
import { basketAtom, basketTotalPriceAtom } from '../state/atoms/basketAtom';
import { Paper } from '../models/Paper';
import { useNavigate } from 'react-router-dom';

const BasketPage: React.FC = () => {
    const [basket] = useAtom(basketAtom);
    const [totalPrice] = useAtom(basketTotalPriceAtom);
    const navigate = useNavigate();

    const handleOrder = () => {
        const orderDetails = {
            totalAmount: totalPrice,
            customerId: 5, // Update to use the actual customer ID when available
            orderEntries: basket.map(item => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        };

        // Navigate to customer info or directly save the order
        navigate('/customer-info', { state: orderDetails });
    };

    return (
        <div>
            <h2>Your Basket</h2>
            {basket.length === 0 ? (
                <p>Your basket is empty.</p>
            ) : (
                <div>
                    <ul>
                        {basket.map((item: Paper) => (
                            <li key={item.id}>
                                {item.name} - {item.quantity} x {item.price.toFixed(2)} DKK
                            </li>
                        ))}
                    </ul>
                    <h3>Total Price: {totalPrice.toFixed(2)} DKK</h3>
                    <button onClick={handleOrder}>Order</button>
                </div>
            )}
        </div>
    );
};

export default BasketPage;
