// src/models/Order.ts
import { OrderEntry } from './OrderEntry'; // Ensure you import OrderEntry

export interface Order {
    totalAmount: number;
    customerId: number; // Must be a number, not undefined
    orderEntries: OrderEntry[]; // Use OrderEntry interface here
}