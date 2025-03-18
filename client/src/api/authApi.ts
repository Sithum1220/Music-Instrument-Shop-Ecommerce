import axios, { AxiosError } from 'axios';

export const signupUser = async (userData: any) => {
    console.log(userData)
    try {
        const response = await axios.post('http://localhost:4000/auth/signup', userData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{message: string}>;
        const errorMessage = axiosError.response?.data?.message || 'Signup failed';
        throw new Error(errorMessage);
    }
};

export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/login', { username, password }, {
            headers: { 'Content-Type': 'application/json' },
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        console.log('Login successful, token:', token);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{message: string}>;
        const errorMessage = axiosError.response?.data?.message || 'Login failed';
        throw new Error(errorMessage);
    }
};