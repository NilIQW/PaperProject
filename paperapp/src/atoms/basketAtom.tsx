import { atom } from 'jotai';
import { Paper} from '../models/Paper.tsx';



export const basketAtom = atom<Paper[]>([]);

// Atom to calculate total quantity of products in the basket
export const basketTotalAtom = atom((get) => {
    const basket = get(basketAtom);
    // @ts-ignore
    return basket.reduce((total, item) => total + item.quantity, 0);
});

// Atom to calculate the total price of items in the basket
export const basketTotalPriceAtom = atom((get) => {
    const basket = get(basketAtom);
    return basket.reduce((total, item) => total + item.price*item.quantity, 0);
});