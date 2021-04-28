import axios from 'axios';
import { getToken } from '@/utils/auth';
// Create axios instance


const service = axios.create({
  baseURL: process.env.VUE_APP_MIX_BASE_API, // baseUrl as defined in .env.development and .env.production
  timeout: 300000, // Request timeout
});

// console.log(process.env.);
// Request intercepter
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + getToken(); // Set JWT token
    }

    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  response => {
    // if (response.headers.authorization) {
    //   setToken(response.headers.authorization);
    //   response.data.token = response.headers.authorization;
    // }    
    // setToken(response.tk);
    // response.data.token = response.tk;
    return response.data;
  },
  error => {
    // let message = error.message;
    // if (error.response.data && error.response.data.messages) {
    //   message = error.response.data.messages;
    // } else if (error.response.data && error.response.data.message) {
    //   message = error.response.data.message;
    // }
    return Promise.reject(error);
  },
);

export default service;
