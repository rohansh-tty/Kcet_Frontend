import axios from 'axios'
import { create } from 'zustand'
import { FrappeResponse } from '../types/Frappe'

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
  signup: (name: string, usr: string, pwd: string) => any
  login: (usr: string, pwd: string) => any
  verifySignup: (token: string) => any

  loginResponse: LoginResponseAPI
  setLoginResponse: (response: LoginResponseAPI) => void
}

const BASE_URL = 'https://dev.kcetcutoff.xyz'

export const useAuthStore = create<AuthStoreType>()((set) => ({
  login: async (usr: string, pwd: string) => {
    const res = await axios.get(
      `${BASE_URL}/api/method/cutoff_app.core.auth.get_token?usr=${usr}&pwd=${pwd}`,
      { headers: {} }
    )
    return res
  },
  signup: async (name: string, email: string, password: string) => {
    try {
      const res: any = await axios.post(
        `${BASE_URL}/api/method/cutoff_app.core.auth.custom_signup_user`, //?name=${name}&email=${email}&password=${password}`,
        { email: email, name: name, password: password },
        { headers: {} }
      )
      return res
    } catch (error:any) {
      return error
    }
  },
  verifySignup: async (token: string) => {
    const res = await axios.post(
      `${BASE_URL}/api/method/cutoff_app.core.auth.email_verification_handler?token=${token}`,
      { token: token },
      { headers: {} }
    )
    return res
  },
  loginResponse: {} as LoginResponseAPI,
  setLoginResponse: (response: LoginResponseAPI) =>
    set(() => ({ loginResponse: response }))
}))
