import axios from 'axios'
import { API_URLS } from '../constants/urls'
import { getToken as getAuthToken } from '~services/auth'

export interface LoginParams {
  email: string
  password: string
}

export interface Tokens {
  access_token: string
}

export interface Profile {
  id: string
}

const getToken = () => `Bearer ${getAuthToken()}`

export const login = (data: LoginParams) => {
  return axios.post<Tokens>(`${API_URLS.user}/auth/login`, data, {
    headers: {
      Authorization: getToken()
    }
  })
    .then((res) => res.data)
}
export const getProfile = () => {
  return axios.get<Profile>(`${API_URLS.user}/profile`, {
    headers: {
      Authorization: getToken()
    }
  })
    .then((res) => res.data)
}
