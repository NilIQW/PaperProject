const API_URL = "http://localhost:5074/api/customer";

export const getCustomers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Unable to fetch customers");
    }

    return await response.json();
}

export const addCustomer = async (customer) => {
    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {'Content-Type': 'application/json'},
    });
    if (!response.ok) {
        throw new Error("Unable to create customer");
    }

    return await response.json();
}

export const updateCustomer = async (customerId, customer) => {
    const response = await fetch(`${API_URL}/${customerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });
    if (!response.ok) {
        throw new Error('Failed to update customer');
    }
    return response.json();
};

export const deleteCustomer = async (customerId) => {
    const response = await fetch(`${API_URL}/${customerId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete customer');
    }
};