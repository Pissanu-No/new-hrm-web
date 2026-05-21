import apiClient from '@/services/apiClient'
import { MASTER_API_PREFIX } from '@/services/apiPaths'

const JOB_LEVEL_PATH = `${MASTER_API_PREFIX}/job-levels`

export const jobLevelService = {
  list(params = {}) {
    return apiClient.get(JOB_LEVEL_PATH, { params })
  },
  getById(jobLevelId) {
    return apiClient.get(`${JOB_LEVEL_PATH}/${jobLevelId}`)
  },
  create(payload) {
    return apiClient.post(JOB_LEVEL_PATH, payload)
  },
  update(jobLevelId, payload) {
    return apiClient.put(`${JOB_LEVEL_PATH}/${jobLevelId}`, payload)
  },
  remove(jobLevelId) {
    return apiClient.delete(`${JOB_LEVEL_PATH}/${jobLevelId}`)
  }
}

export default jobLevelService
