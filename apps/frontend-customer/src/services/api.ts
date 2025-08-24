/**
 * API service for interacting with the backend API
 */

// Use API_URL from environment or fallback to default
const API_URL = import.meta.env.API_URL || 'http://localhost:3000';
const API_BASE_URL = `${API_URL}/api`;

/**
 * Fetch all users from the API
 */
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Fetch a specific user by ID
 */
export const getUserById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch all products from the API
 */
export const getProducts = async (category?: string, inStock?: boolean) => {
  try {
    let url = `${API_BASE_URL}/products`;
    const params = new URLSearchParams();
    
    if (category) {
      params.append('category', category);
    }
    
    if (inStock !== undefined) {
      params.append('inStock', inStock.toString());
    }
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a specific product by ID
 */
export const getProductById = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};