import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const certificationsPath = (employeeId) => `${SECURE_API_PREFIX}/employees/${employeeId}/certifications`

export const employeeCertificationService = {
  getAll(employeeId, params) {
    return apiClient.get(certificationsPath(employeeId), { params })
  },
  getById(employeeId, certificationId) {
    return apiClient.get(`${certificationsPath(employeeId)}/${certificationId}`)
  },
  create(employeeId, payload) {
    return apiClient.post(certificationsPath(employeeId), payload)
  },
  update(employeeId, certificationId, payload) {
    return apiClient.put(`${certificationsPath(employeeId)}/${certificationId}`, payload)
  },
  delete(employeeId, certificationId) {
    return apiClient.delete(`${certificationsPath(employeeId)}/${certificationId}`)
  }
}

export default employeeCertificationService
