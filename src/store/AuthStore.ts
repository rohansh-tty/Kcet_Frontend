import axios from 'axios'
import { create } from 'zustand'

export interface LoginResponseAPI {
  message: string
  home_page: string
  full_name: string
  token: string
  access_token: string
  expires_in: number
  token_type: string
  scopes: string
  refresh_token: string
  id_token: string
}

type AuthStoreType = {
  login: (usr:string, pwd:string) => {} 
  loginResponse: LoginResponseAPI
  setLoginResponse: (response: LoginResponseAPI) => void
}

export const BASE_URL = 'http://development.localhost:8000'

export const useAuthStore = create<AuthStoreType>()((set) => ({
  login: async (usr: string, pwd: string) => {
    const res = await axios.get(
      `${BASE_URL}/api/method/cutoff_app.core.auth.get_token?usr=${usr}&pwd=${pwd}`,
      { headers: {} }
    )
    return res
  },
  loginResponse: {} as LoginResponseAPI,
  setLoginResponse: (response: LoginResponseAPI) =>
    set(() => ({ loginResponse: response }))
}))
