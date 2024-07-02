import axios from 'axios'
import { useAuthStore } from '../store/AuthStore'

// const BACKEND_DEV_URL = ""
export const BACKEND_PROD_URL = 'https://dev.kcetcutoff.xyz'
export const BACKEND_DEBUG_URL = 'http://development.localhost:8000'


export const client = axios.create({
  // baseURL: import.meta.env.VITE_APP_BACKEND_URL
  baseURL: BACKEND_PROD_URL,
  // baseURL: BACKEND_DEBUG_URL
})

axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('user') === null) {
      const loginInfo = JSON.parse(localStorage.getItem('user') ?? ' ')
      if (
        loginInfo.trim().len > 0 &&
        'access_token' in loginInfo &&
        !!loginInfo['access_token'].trim()
      ) {
        config.headers['Authorization'] = `Bearer ${loginInfo['access_token']}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
