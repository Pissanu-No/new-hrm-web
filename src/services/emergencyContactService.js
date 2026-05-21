import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const emergencyContactsPath = (employeeId) => `${SECURE_API_PREFIX}/employees/${employeeId}/emergency-contacts`

export const emergencyContactService = {
  getAll(employeeId, params) {
    return apiClient.get(emergencyContactsPath(employeeId), { params })
  },
  getById(employeeId, emergencyContactId) {
    return apiClient.get(`${emergencyContactsPath(employeeId)}/${emergencyContactId}`)
  },
  create(employeeId, payload) {
    return apiClient.post(emergencyContactsPath(employeeId), payload)
  },
  update(employeeId, emergencyContactId, payload) {
    return apiClient.put(`${emergencyContactsPath(employeeId)}/${emergencyContactId}`, payload)
  },
  delete(employeeId, emergencyContactId) {
    return apiClient.delete(`${emergencyContactsPath(employeeId)}/${emergencyContactId}`)
  },
  setPrimary(employeeId, emergencyContactId) {
    return apiClient.put(`${emergencyContactsPath(employeeId)}/${emergencyContactId}/set-primary`)
  }
}

export default emergencyContactService
