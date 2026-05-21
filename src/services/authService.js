import apiClient from '@/services/apiClient'

export const authService = {
  login(payload) {
    return apiClient.post('/api/auth/login', payload)
  },
  me() {
    return apiClient.get('/api/auth/me')
  }
}

export default authService
