
import axios from 'axios';

export const signupUser = async (userData) => {
    console.log(userData)
    try {
        const response = await axios.post('http://localhost:4000/auth/signup', userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Signup failed';
        throw new Error(errorMessage);
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/login', { username, password }, {
            headers: { 'Content-Type': 'application/json' },
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        console.log('Login successful, token:', token);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        throw new Error(errorMessage);
    }
};

