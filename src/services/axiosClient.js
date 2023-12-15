import axios from "axios";
import {API_URL, PROFILE_STORAGE_KEY} from "@/constant/constant";
import queryString from 'query-string';


const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(config => {
    const accessToken = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

axiosClient.interceptors.response.use(response => {
    if (response && response.data) {
        return response.data
    }
    return response
}, (error) => {
    if (error.response) {
        error = {
            statusCode: error.response.status,
            message: error.response.data.message,
            error: error.response.data.error,
        }
    }
    throw error;
})

export default axiosClient;