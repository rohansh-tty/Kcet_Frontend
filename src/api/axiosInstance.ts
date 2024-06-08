import axios from 'axios'
import { useAuthStore } from '../store/AuthStore';

const BACKEND_DEV_URL = ""
const BACKEND_PROD_URL = ""


export const client = axios.create({
    baseURL: "http://development.localhost:8000"
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