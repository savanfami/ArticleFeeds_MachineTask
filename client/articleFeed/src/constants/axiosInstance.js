import axios from 'axios'
export const URL='http://localhost:8000/api'
console.log(URL,'USERLDLFJDSLFJDSFLDS')


export const axiosInstance = axios.create({ baseURL: URL});


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error);
        return Promise.reject(error);
    }
);
