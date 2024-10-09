import { OrderEntry } from './OrderEntry';
import { PaperProperty } from './PaperProperty';

export interface Paper {
    quantity?: number;
    id: number;
    name: string;
    discontinued: boolean;
    stock: number;
    price: number;
    sheetsPerPacket: number;
    imageUrl?: string;
    orderEntries: OrderEntry[];
    paperProperties?: PaperProperty[];
}
