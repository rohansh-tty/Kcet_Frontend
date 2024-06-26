import axios from 'axios'
import Cookies from 'universal-cookie'
import { create } from 'zustand'
import { CutoffArgs } from '../types/Base'
import { client } from '../api/axiosInstance'

export interface LoginResponseAPI {}

type CutoffStoreType = {
  getBranch: () => any
  getCutoffResults: (args: CutoffArgs)=>Promise<any>
  cutoffResponse: LoginResponseAPI
  setCutoff: (response: LoginResponseAPI) => void
}

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
      const res = await client.get(
        `/api/resource/Branch?fields=["branch_name", "branch_short_name"]&limit_page_length=0`,
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
    const userInfo = JSON.parse(localStorage.getItem('user') || '')
    try {
      const res = await client.get(
        `/api/resource/Cutoff?filters=[["cutoff", ">", "${args.min_cutoff}"], ["cutoff", "<", "${args.max_cutoff}"], ["branch", "in", "${args.branch}"], ["round", "=", "${args.round}"], ["year", "in", "${args.year}"], ["category", "in", "${args.category}"]]&fields=["college_code", "cutoff", "branch", "category", "college_name", "year"]&limit_page_length=0`,
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
