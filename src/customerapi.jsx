import axios from "axios";

const API_URL = "http://192.168.10.152:4000/api/CustomerAPI";

// Fetch all customers
export const fetchCustomer = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Customers:", error);
    return [];
  }
};

// Add a new customer
export const addCustomer = async (newCustomer) => {
  try {
    const response = await axios.post(API_URL, newCustomer);
    return response.data;
  } catch (error) {
    console.error("Error Adding Customer:", error);
    throw error;
  }
};

// Update an existing customer
export const updateCustomer = async (id, updatedCustomer) => {
  try {
    const response = await axios.put(`${API_URL}`, updatedCustomer);
    return response.data;
  } catch (error) {
    console.error("Error Updating Customer:", error);
    throw error;
  }
};

// Delete a customer
export const deleteCustomer = async (id) => {
  try {
    await axios.delete(`${API_URL}?id=${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error Deleting Customer:", error);
    throw error;
  }
};
