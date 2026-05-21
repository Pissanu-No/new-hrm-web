import apiClient from '@/services/apiClient'
import { MASTER_API_PREFIX } from '@/services/apiPaths'

const COST_CENTER_PATH = `${MASTER_API_PREFIX}/cost-centers`

export const costCenterService = {
  list(params = {}) {
    return apiClient.get(COST_CENTER_PATH, { params })
  },
  getById(costCenterId) {
    return apiClient.get(`${COST_CENTER_PATH}/${costCenterId}`)
  },
  create(payload) {
    return apiClient.post(COST_CENTER_PATH, payload)
  },
  update(costCenterId, payload) {
    return apiClient.put(`${COST_CENTER_PATH}/${costCenterId}`, payload)
  },
  remove(costCenterId) {
    return apiClient.delete(`${COST_CENTER_PATH}/${costCenterId}`)
  }
}

export default costCenterService
