import axios from 'axios'
import { normalizeApiError } from '@/utils/apiResponse'
import { getAccessTokenFromCookies } from '@/utils/cookieAuth'

const apiBaseURL = import.meta.env.VITE_API_HRIS_ENDPOINT

export const httpClient = axios.create({
  baseURL: apiBaseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 20000
})

httpClient.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromCookies()

    if (token) {
      setRequestHeader(config, 'Authorization', `Bearer ${token}`)
    }

    setRequestHeader(config, 'X-Requested-With', 'XMLHttpRequest')

    return config
  },
  (error) => Promise.reject(normalizeApiError(error))
)

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeApiError(error)

    if (normalized.status === 401) {
      window.dispatchEvent(new CustomEvent('hris:unauthorized'))
    }

    return Promise.reject(normalized)
  }
)

export default httpClient

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
