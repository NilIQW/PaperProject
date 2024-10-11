import { Paper } from '../models/Paper.tsx';

const API_URL = "http://localhost:5074/api/Paper";

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


export const fetchPaperById = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch paper');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching paper:', error);
        throw error;
    }}
export const createPaper = async (paperData: any) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Explicitly setting the content type to JSON
        },
        body: JSON.stringify(paperData), // Convert the paper data to JSON
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to create paper: ${errorMessage}`);
    }

    return response.json();
};
export const updatePaper = async (paperId: number, paperData: Paper): Promise<boolean> => {
    try {
        const response = await fetch(`${API_URL}/${paperId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paperData),
        });

        if (response.status === 204) {
            // Return true for success, since there's no content to return
            return true;
        }

        // Handle other response statuses if necessary
        if (!response.ok) {
            throw new Error(`Error updating paper: ${response.statusText}`);
        }

        // In case of other response statuses, you might return false or handle as needed
        const result = await response.json();
        return result ? true : false;

    } catch (error) {
        console.error(`Error updating paper: ${error}`);
        return false; // Return false if there's an error
    }
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
