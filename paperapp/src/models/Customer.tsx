import {Order} from "./Order.tsx";

export interface Customer {
    id: number;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    orders: Order[];
}
