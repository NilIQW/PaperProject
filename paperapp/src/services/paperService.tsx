import { Paper } from '../models/Paper.tsx';

const API_URL = "http://localhost:5074/api/paper";

// Fetch all papers
export const getPapers = async (): Promise<Paper[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch papers');
    }
    const data = await response.json();
    console.log('Fetched papers:', data); // Add this to check the response
    return data;
};


// Fetch a single paper by ID
export const getPaperById = async (id: number): Promise<Paper> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch paper with id ${id}`);
    }
    return await response.json();
};

// Create a new paper
export const createPaper = async (paper: Paper): Promise<Paper> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper),
    });

    if (!response.ok) {
        throw new Error('Failed to create paper');
    }

    return await response.json();
};

// Update an existing paper
export const updatePaper = async (id: number, paper: Paper): Promise<Paper> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper),
    });

    if (!response.ok) {
        throw new Error(`Failed to update paper with id ${id}`);
    }

    return await response.json();
};

// Delete a paper by ID
export const deletePaper = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete paper with id ${id}`);
    }
};
