import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ergast.com/api/f1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Интерцептор для обработки ошибок
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
