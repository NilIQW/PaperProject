import React from 'react';
import { useAtom } from 'jotai';
import { basketTotalAtom } from '../state/atoms/basketAtom';
import BasketIconSVG from '/assets/basket.svg';
import { useNavigate } from 'react-router-dom';

const BasketIcon: React.FC = () => {
    const [totalItems] = useAtom(basketTotalAtom);
    const navigate = useNavigate();

    const handleBasketClick = () => {
        navigate('/basket');
    };

    const handleOrderHistoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent triggering parent click handler
        navigate('/order-history'); // Navigate to the OrderHistory page
    };

    return (
        <div style={{ position: 'relative', top: '60px', left: '950px', display: 'flex', alignItems: 'center'}}>
            <div onClick={handleBasketClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <img src={BasketIconSVG} alt="Basket" style={{ width: '40px' }} />
                <span style={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '8px' }}>
                    {totalItems}
                </span>
            </div>

            <button
                onClick={handleOrderHistoryClick}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '10px'
                }}
            >
                See Order History
            </button>
        </div>
    );
};

export default BasketIcon;
