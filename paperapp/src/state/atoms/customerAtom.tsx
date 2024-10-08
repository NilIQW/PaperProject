// src/atoms/customerAtom.ts
import { atom } from 'jotai';
import { Customer } from '../../models/Customer';
import { getCustomers } from "../../services/customerService";

// Atom to store the list of customers
export const customerAtom = atom<Customer[]>([]);

// Asynchronous atom to load customers into `customerAtom`
export const loadCustomersAtom = atom(
    null,
    async (_get, set) => {
        try {
            const customers = await getCustomers();
            set(customerAtom, customers);
        } catch (error) {
            console.error("Failed to load customers:", error);
        }
    }
);
