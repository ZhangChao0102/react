import Cookies from 'js-cookie';
import axios from 'axios';

const instance = axios.create({
    baseURL: window.location.origin,
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (!config.headers.token) {
        config.headers.token = Cookies.get(`token`);
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.code === 4001) {

    }
    return response;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default instance;