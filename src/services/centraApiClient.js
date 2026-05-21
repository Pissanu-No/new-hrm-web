import axios from 'axios'
import { getAccessTokenFromCookies } from '@/utils/cookieAuth'
import { unwrapApiResponse } from '@/services/apiClient'

const API_TIMEOUT = 30000
const baseURL = import.meta.env.VITE_API_CENTRA_API || ''

function normalizeError(error) {
  const response = error?.response
  const payload = response?.data

  return {
    status: response?.status || 0,
    message: payload?.message || payload?.error || error?.message || 'Unable to load user profile.',
    errors: payload?.errors || payload?.details || null,
    original: error
  }
}

export const centraApiClient = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

centraApiClient.interceptors.request.use((config) => {
  const token = getAccessTokenFromCookies()

  if (token) {
    setRequestHeader(config, 'Authorization', `Bearer ${token}`)
  }

  return config
})

centraApiClient.interceptors.response.use(
  (response) => unwrapApiResponse(response.data),
  (error) => Promise.reject(normalizeError(error))
)

export default centraApiClient

function setRequestHeader(config, name, value) {
  if (typeof config.headers?.set === 'function') {
    config.headers.set(name, value)
    return
  }

  config.headers = {
    ...config.headers,
    [name]: value
  }
}
