import axios from 'axios'
import Cookies from 'universal-cookie'
import { create } from 'zustand'
import { client } from '../api/axiosInstance'

type ProfileStoreType = {
  updateProfileDetails: (data: any) => any
}


const myHeaders = new Headers()
myHeaders.append('Access-Control-Allow-Origin', '*')

const requestOptions = {
  method: 'GET',
  headers: myHeaders
}

export const useProfileStore = create<ProfileStoreType>()((set) => ({
  updateProfileDetails: async (data: { full_name: string; email: string }) => {
    const userInfo = JSON.parse(localStorage.getItem('user') || '')
    try {
      const res = await client.post(
        `api/resource/Branch?fields=["branch_name", "branch_short_name"]&limit_page_length=0`,
        {},
        { headers: { Authorization: `Bearer ${userInfo?.access_token}` } }
      )
      if (res?.status === 200) {
        return res.data
      }
    } catch (error) {
      return `Failed to get branch list, ${error}`
    }
  }
}))
