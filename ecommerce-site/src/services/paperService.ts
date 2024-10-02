import { Paper } from '../models/Paper';

const API_URL = "http://localhost:5074/api/paper";

export const getPapers = async (): Promise<Paper[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch papers');
    }
    return await response.json();
};