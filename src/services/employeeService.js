import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const EMPLOYEE_PATH = `${SECURE_API_PREFIX}/employees`

export const employeeService = {
  getAll(params) {
    return apiClient.get(EMPLOYEE_PATH, { params })
  },
  getById(employeeId) {
    return apiClient.get(`${EMPLOYEE_PATH}/${employeeId}`)
  },
  create(payload) {
    return apiClient.post(EMPLOYEE_PATH, payload)
  },
  update(employeeId, payload) {
    return apiClient.put(`${EMPLOYEE_PATH}/${employeeId}`, payload)
  },
  delete(employeeId) {
    return apiClient.delete(`${EMPLOYEE_PATH}/${employeeId}`)
  }
}

export default employeeService
