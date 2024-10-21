



//  泛型函数

function identity<T>(arg:T):T{
    return arg;
}

// 泛型类

class Box<T>{
    private value:T;
    constructor(value:T){
        this.value = value;
    }
    getValue():T {
        return this.value
    }
}

// 泛型接口

interface GenericIdentityFn<T>{
    (arg:T):T
}


interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

async function request<T>(method: string, url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await apiClient({
            method,
            url,
            data,
            ...config,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}




interface User {
    id: number;
    name: string;
}

interface UserResponse {
    code: number;
    message: string;
    data: User;
}

async function fetchUser(userId: number) {
    try {
        const response: UserResponse = await request<User>('GET', `/users/${userId}`);
        if (response.code === 200) {
            console.log('User fetched:', response.data);
        } else {
            console.error('Error fetching user:', response.message);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

// 调用 fetchUser 函数
fetchUser(1);
