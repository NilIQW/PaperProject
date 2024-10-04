import { atom } from 'jotai';
import { Paper } from '../../models/Paper.tsx';

export const paperAtom = atom<Paper>({
    id: 0,
    name: '',
    price: 0,
    stock: 0,
    quantity: 0,
    sheetsPerPacket: 0,
    imageUrl: '',
    discontinued: false
});

export const customPropertiesAtom = atom<{ key: string, value: string }[]>([]);
