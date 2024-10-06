import {Property} from "./Property.tsx";

export interface Paper {
    id: number;
    name: string;
    discontinued: boolean;
    stock: number;
    price: number;
    quantity?: number;
    imageUrl: string;
    sheetsPerPacket: number;
    customProperties?: Property[];

}