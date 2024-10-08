import { OrderEntry } from './OrderEntry';
import { Customer } from './Customer';

export interface Order {
    id: number;
    orderDate: string; // Date in ISO string format
    deliveryDate?: string | null; // Delivery date could be null
    status: string;
    totalAmount: number;
    customerId: number;
    customer?: Customer; // Optional, in case you want to include customer details
    orderEntries: OrderEntry[]; // List of OrderEntry
}
