import apiClient from '@/services/apiClient'
import { MASTER_API_PREFIX } from '@/services/apiPaths'

const BRANCH_PATH = `${MASTER_API_PREFIX}/branches`

export const branchService = {
  list(params = {}) {
    return apiClient.get(BRANCH_PATH, { params })
  },
  getById(branchId) {
    return apiClient.get(`${BRANCH_PATH}/${branchId}`)
  },
  create(payload) {
    return apiClient.post(BRANCH_PATH, payload)
  },
  update(branchId, payload) {
    return apiClient.put(`${BRANCH_PATH}/${branchId}`, payload)
  },
  remove(branchId) {
    return apiClient.delete(`${BRANCH_PATH}/${branchId}`)
  }
}

export default branchService
