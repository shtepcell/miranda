import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://127.0.0.1:3333/',
    timeout: 5000,
    responseType: 'json'
})