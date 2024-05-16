import axios from 'axios'
import Cookies from 'universal-cookie'
import { create } from 'zustand'
import { CutoffArgs } from '../components/Cutoff'

export interface LoginResponseAPI {}

type CutoffStoreType = {
  getBranch: () => any
  getCutoffResults: (args: CutoffArgs)=>Promise<any>
  cutoffResponse: LoginResponseAPI
  setCutoff: (response: LoginResponseAPI) => void
}

export const BASE_URL = 'http://development.localhost:8000'

const myHeaders = new Headers()
myHeaders.append('Access-Control-Allow-Origin', '*')

const requestOptions = {
  method: 'GET',
  headers: myHeaders
}

export const useCutoffStore = create<CutoffStoreType>()((set) => ({
  getBranch: async () => {
    const userInfo = JSON.parse(localStorage.getItem('user') || '')
    try {
      const res = await axios.get(
        `${BASE_URL}/api/resource/Branch?fields=["branch_name", "branch_short_name"]&limit_page_length=0`,
        { headers: { Authorization: `Bearer ${userInfo?.access_token}` } }
      )
      if (res?.status === 200) {
        return res.data
      }
    } catch (error) {
      return `Failed to get branch list, ${error}`
    }
  },

  getCutoffResults: async (args: CutoffArgs) => {
    console.log('cutoff args >>', args)
    const userInfo = JSON.parse(localStorage.getItem('user') || '')
    try {
      const res = await axios.get(
        `${BASE_URL}/api/resource/Cutoff?filters=[["cutoff", ">", "${args.min_cutoff}"], ["cutoff", "<", "${args.max_cutoff}"], ["branch", "in", "${args.branch}"], ["round", "=", "${args.round}"], ["year", "in", "${args.year}"], ["category", "=", "${args.category}"]]&fields=["college_code", "cutoff", "branch", "category", "college_name", "year"]&limit_page_length=0`,
        { headers: { Authorization: `Bearer ${userInfo?.access_token}` } }
      )
      if (res?.status === 200) {
        return res.data
      }
    } catch (error) {
      return `Failed to get cutoff results, ${error}`
    }
  },

  cutoffResponse: {} as LoginResponseAPI,
  setCutoff: (response: LoginResponseAPI) => {}
}))
