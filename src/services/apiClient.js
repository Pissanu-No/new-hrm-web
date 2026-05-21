import axios from 'axios'
import { getAccessTokenFromCookies } from '@/utils/cookieAuth'

const API_TIMEOUT = 30000

const baseURL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_HRIS_ENDPOINT || ''

export function unwrapApiResponse(payload) {
  if (payload && typeof payload === 'object' && Object.prototype.hasOwnProperty.call(payload, 'data')) {
    return payload.data
  }

  return payload
}

function normalizeError(error) {
  const response = error?.response
  const payload = response?.data
  const message =
    payload?.message ||
    payload?.error ||
    error?.message ||
    'Unable to complete the request. Please try again.'

  return {
    status: response?.status || 0,
    message,
    errors: payload?.errors || payload?.details || null,
    original: error
  }
}

export const apiClient = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessTokenFromCookies()

  if (token) {
    setRequestHeader(config, 'Authorization', `Bearer ${token}`)
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => unwrapApiResponse(response.data),
  (error) => {
    const normalized = normalizeError(error)

    if (normalized.status === 401) {
      window.dispatchEvent(new CustomEvent('hris:unauthorized'))
    }

    return Promise.reject(normalized)
  }
)

export default apiClient

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
