const API_URL = 'http://localhost:3000/api';

// Token management
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API requests
const request = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    console.log(`Making request to: ${API_URL}${endpoint}`); // Debug log
    
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    console.log('Response status:', response.status); // Debug log
    
    // Try to parse JSON even if response is not OK
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { error: await response.text() };
    }
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API Error Details:', {
      message: error.message,
      endpoint: endpoint,
      url: `${API_URL}${endpoint}`
    });
    
    // Provide user-friendly error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Make sure backend is running on http://localhost:3000');
    }
    
    throw error;
  }
};

// Products API
export const productAPI = {
  getAll: async (page = 1, limit = 8, category = '') => {
    let url = `/products?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    console.log('Fetching products from:', url); // Debug log
    return request(url);
  },
  
  getOne: async (id) => {
    return request(`/products/${id}`);
  },
  
  create: async (productData) => {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
};

// Orders API
export const orderAPI = {
  create: async (items) => {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  },
  
  getAll: async () => {
    return request('/orders');
  },
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  login: async (credentials) => {
    const data = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      setAuthToken(data.token);
    }
    
    return data;
  },
  
  logout: () => {
    setAuthToken(null);
    localStorage.removeItem('user');
  },
};