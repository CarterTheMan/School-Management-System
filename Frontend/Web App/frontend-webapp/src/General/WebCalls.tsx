import axios from 'axios';
import { updateCookieTime } from '../General/Functions';
import { baseLink } from './variables';

const axiosInstance = axios.create({
    baseURL: baseLink
});

axiosInstance.interceptors.response.use(
    (response) => {
    
        // If the request method was POST, do the following
        if (response.config.method === 'post') {
            updateCookieTime();
        }

        // If the request method was POST, do the following
        if (response.config.method === 'get') {
            updateCookieTime();
        }

      return response;
    },
    (error) => {
      // Handle errors (optional)
      return Promise.reject(error);
    }
);

export default axiosInstance;