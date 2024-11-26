import axios from 'axios'
const {VITE_URL} = import.meta.env 

export const axiosInstance = axios.create({ baseURL: VITE_URL});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);
