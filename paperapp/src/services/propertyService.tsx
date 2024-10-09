const API_URL = 'http://localhost:5074/api/PaperProperty'; // Replace with your actual API base URL

// Fetch custom properties for a specific paper from the API
export const fetchProperties = async (paperId: number) => {
    try {
        const response = await fetch(`${API_URL}/${paperId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        const properties = await response.json();
        return properties; // Return the fetched properties
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error; // Rethrow error for handling in the component
    }
};

export const fetchAllProperties = async () => {
    try {
        const response = await fetch(API_URL); // Fetch all properties
        if (!response.ok) {
            throw new Error('Failed to fetch properties');
        }
        const properties = await response.json();
        return properties; // Return the fetched properties
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error; // Rethrow error for handling in the component
    }
};
