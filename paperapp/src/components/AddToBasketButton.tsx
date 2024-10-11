// src/components/AddToBasketButton.tsx
import React from 'react';
import { useAtom } from 'jotai';
import { basketAtom } from '../atoms/basketAtom';
import { Paper } from '../models/Paper';

interface AddToBasketButtonProps {
    paper: Paper;
}

const AddToBasketButton: React.FC<AddToBasketButtonProps> = ({ paper }) => {
    const [basket, setBasket] = useAtom(basketAtom);

    const handleAddToBasket = () => {
        const existingItem = basket.find(item => item.id === paper.id);
        if (existingItem) {
            // Update the quantity of the existing item
            setBasket(basket.map(item =>
                item.id === paper.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            // Add new item to the basket
            setBasket([...basket, { ...paper, quantity: 1 }]);
        }
    };

    return (
        <button onClick={handleAddToBasket}>
            Add to Basket
        </button>
    );
};

export default AddToBasketButton;
