import axios from 'axios'
const {VITE_URL} = import.meta.env 
console.log(VITE_URL,'VITE')
export const axiosInstance = axios.create({ baseURL: 'articlefeedsmachinetask-production.up.railway.app'});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);
