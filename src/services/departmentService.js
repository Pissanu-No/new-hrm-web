import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

export const departmentService = {
  list(params = {}) {
    return apiClient.get(`${SECURE_API_PREFIX}/departments`, { params })
  },
  getById(departmentId) {
    return apiClient.get(`${SECURE_API_PREFIX}/departments/${departmentId}`)
  },
  create(payload) {
    return apiClient.post(`${SECURE_API_PREFIX}/departments`, payload)
  },
  update(departmentId, payload) {
    return apiClient.put(`${SECURE_API_PREFIX}/departments/${departmentId}`, payload)
  },
  remove(departmentId) {
    return apiClient.delete(`${SECURE_API_PREFIX}/departments/${departmentId}`)
  }
}
