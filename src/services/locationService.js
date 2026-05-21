import apiClient from '@/services/apiClient'
import { MASTER_API_PREFIX } from '@/services/apiPaths'

const LOCATION_PATH = `${MASTER_API_PREFIX}/locations`

export const locationService = {
  list(params = {}) {
    return apiClient.get(LOCATION_PATH, { params })
  },
  getById(locationId) {
    return apiClient.get(`${LOCATION_PATH}/${locationId}`)
  },
  create(payload) {
    return apiClient.post(LOCATION_PATH, payload)
  },
  update(locationId, payload) {
    return apiClient.put(`${LOCATION_PATH}/${locationId}`, payload)
  },
  remove(locationId) {
    return apiClient.delete(`${LOCATION_PATH}/${locationId}`)
  }
}

export default locationService
