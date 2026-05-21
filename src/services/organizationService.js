import apiClient from '@/services/apiClient'
import { MASTER_API_PREFIX, SECURE_API_PREFIX } from '@/services/apiPaths'

const resources = {
  companies: `${SECURE_API_PREFIX}/companies`,
  branches: `${MASTER_API_PREFIX}/branches`,
  locations: `${MASTER_API_PREFIX}/locations`,
  departments: `${SECURE_API_PREFIX}/departments`,
  positions: `${SECURE_API_PREFIX}/positions`,
  jobLevels: `${MASTER_API_PREFIX}/job-levels`,
  costCenters: `${MASTER_API_PREFIX}/cost-centers`
}

function endpoint(resource) {
  return resources[resource] || `${SECURE_API_PREFIX}/${resource}`
}

export const organizationService = {
  getAll(resource, params) {
    return apiClient.get(endpoint(resource), { params })
  },
  getById(resource, id) {
    return apiClient.get(`${endpoint(resource)}/${id}`)
  },
  create(resource, payload) {
    return apiClient.post(endpoint(resource), payload)
  },
  update(resource, id, payload) {
    return apiClient.put(`${endpoint(resource)}/${id}`, payload)
  },
  delete(resource, id) {
    return apiClient.delete(`${endpoint(resource)}/${id}`)
  }
}

export default organizationService
