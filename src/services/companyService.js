import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

export const companyService = {
  list(params = {}) {
    return apiClient.get(`${SECURE_API_PREFIX}/companies`, { params })
  },
  getById(companyId) {
    return apiClient.get(`${SECURE_API_PREFIX}/companies/${companyId}`)
  },
  create(payload) {
    return apiClient.post(`${SECURE_API_PREFIX}/companies`, payload)
  },
  update(companyId, payload) {
    return apiClient.put(`${SECURE_API_PREFIX}/companies/${companyId}`, payload)
  },
  remove(companyId) {
    return apiClient.delete(`${SECURE_API_PREFIX}/companies/${companyId}`)
  }
}
