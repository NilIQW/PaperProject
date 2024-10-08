import { Order } from './Order';
import { Paper } from './Paper';

export interface OrderEntry {
    id: number;
    quantity: number;
    productId?: number; // Nullable in the database
    orderId?: number; // Nullable in the database
    order?: Order;
    product?: Paper;
}
