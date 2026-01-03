import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// --- REQUEST INTERCEPTOR ---
// Before sending any request, check if we have a token and attach it
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- API CALLS ---
export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/login";

};

export const getCart = async () => {
    const response = await api.get('/cart');
    return response.data;
}

export const addToCart = async (productId, quantity) => {
    const response = await  api.post('/cart/add', {productId, quantity});
    return response.data;
}

export const removeFromCart = async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
}

export const placeOrder = async () => {
    const response = await api.post('/orders/checkout');
    return response.data;
};

export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

export default api;