import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const educationsPath = (employeeId) => `${SECURE_API_PREFIX}/employees/${employeeId}/educations`

export const employeeEducationService = {
  getAll(employeeId, params) {
    return apiClient.get(educationsPath(employeeId), { params })
  },
  getById(employeeId, educationId) {
    return apiClient.get(`${educationsPath(employeeId)}/${educationId}`)
  },
  create(employeeId, payload) {
    return apiClient.post(educationsPath(employeeId), payload)
  },
  update(employeeId, educationId, payload) {
    return apiClient.put(`${educationsPath(employeeId)}/${educationId}`, payload)
  },
  delete(employeeId, educationId) {
    return apiClient.delete(`${educationsPath(employeeId)}/${educationId}`)
  },
  setHighest(employeeId, educationId) {
    return apiClient.put(`${educationsPath(employeeId)}/${educationId}/set-highest`)
  }
}

export default employeeEducationService
