import { atom } from 'jotai';
import { Order } from '../models/Order'; // Adjust path if necessary

export const ordersAtom = atom<Order[]>([]);
export const filteredOrdersAtom = atom<Order[]>([]);
export const searchTermAtom = atom<string>('');
export const selectedOrderAtom = atom<Order | null>(null);
export const deliveryDateAtom = atom<string>('');
