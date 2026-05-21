import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

export const positionService = {
  list(params = {}) {
    return apiClient.get(`${SECURE_API_PREFIX}/positions`, { params })
  },
  getById(positionId) {
    return apiClient.get(`${SECURE_API_PREFIX}/positions/${positionId}`)
  },
  create(payload) {
    return apiClient.post(`${SECURE_API_PREFIX}/positions`, payload)
  },
  update(positionId, payload) {
    return apiClient.put(`${SECURE_API_PREFIX}/positions/${positionId}`, payload)
  },
  remove(positionId) {
    return apiClient.delete(`${SECURE_API_PREFIX}/positions/${positionId}`)
  }
}
