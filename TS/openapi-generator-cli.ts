
// openapi-generator-cli generate -i openapi.yaml -g typescript-axios -o ./generated-client

// yanml

// typescript-axios

// 产物  generated-client


import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiClient } from './generated-client/apiClient'; // 引入生成的客户端库

// 创建一个 Axios 实例
const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
apiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在发送请求之前做些什么，例如添加身份验证 token
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
    },
    (error: AxiosError) => {
        // 对响应错误做点什么，例如统一处理错误码
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 处理未授权错误
                    console.error('Unauthorized');
                    break;
                case 404:
                    // 处理未找到资源错误
                    console.error('Not Found');
                    break;
                default:
                    console.error('An error occurred', error.response.data);
            }
        } else if (error.request) {
            console.error('No response received', error.request);
        } else {
            console.error('Error setting up the request', error.message);
        }
        return Promise.reject(error);
    }
);

// 封装生成的 API 客户端
const customApiClient = new ApiClient(undefined, apiClient);

export default customApiClient;