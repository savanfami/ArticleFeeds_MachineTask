import axios from 'axios'
export const URL='http://localhost:8000/api'


export const axiosInstance = axios.create({ baseURL: URL});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);
