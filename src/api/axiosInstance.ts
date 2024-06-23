import axios from 'axios'
import { useAuthStore } from '../store/AuthStore';

// const BACKEND_DEV_URL = ""
export const BACKEND_PROD_URL = "https://dev.kcetcutoff.xyz"
export const BASE_URL = 'https://dev.kcetcutoff.xyz'

export const client = axios.create({
    // baseURL: import.meta.env.VITE_APP_BACKEND_URL
    baseURL: 'https://dev.kcetcutoff.xyz'

})


const loginInfo = useAuthStore((state)=>state.loginResponse)
axios.interceptors.request.use(
    config => {
        if ('access_token' in loginInfo && !!loginInfo['access_token'].trim()){
            // console.log('passing auth header....')
            config.headers['Authorization'] = `Bearer ${loginInfo['access_token']}`;
        }
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );