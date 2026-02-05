import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Karena sudah di-proxy, cukup tulis /api
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;