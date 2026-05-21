import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const employeeAddressesPath = (employeeId) => `${SECURE_API_PREFIX}/employees/${employeeId}/addresses`

export const employeeAddressService = {
  getAll(employeeId, params) {
    return apiClient.get(employeeAddressesPath(employeeId), { params })
  },
  getById(employeeId, addressId) {
    return apiClient.get(`${employeeAddressesPath(employeeId)}/${addressId}`)
  },
  create(employeeId, payload) {
    return apiClient.post(employeeAddressesPath(employeeId), payload)
  },
  update(employeeId, addressId, payload) {
    return apiClient.put(`${employeeAddressesPath(employeeId)}/${addressId}`, payload)
  },
  delete(employeeId, addressId) {
    return apiClient.delete(`${employeeAddressesPath(employeeId)}/${addressId}`)
  },
  setRegistered(employeeId, addressId) {
    return apiClient.put(`${employeeAddressesPath(employeeId)}/${addressId}/set-registered`)
  },
  setContact(employeeId, addressId) {
    return apiClient.put(`${employeeAddressesPath(employeeId)}/${addressId}/set-contact`)
  }
}

export default employeeAddressService
