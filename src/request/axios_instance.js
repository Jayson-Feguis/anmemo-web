import axios from "axios";
import { XML_HTTP_REQUEST } from "../utils/constant";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'X-Requested-With': XML_HTTP_REQUEST,
    }
});

export function setToken(token) {
    axiosInstance.defaults.headers.common = { 'Access-Control-Allow-Origin': '*' };
    axiosInstance.defaults.headers.common = { 'Authorization': `Bearer ${ token } `};
}

export default axiosInstance;