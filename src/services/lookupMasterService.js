import apiClient from '@/services/apiClient'
import { MASTER_API_PREFIX } from '@/services/apiPaths'

const LOOKUP_GROUP_PATH = `${MASTER_API_PREFIX}/lookup-groups`
const LOOKUP_VALUE_PATH = `${MASTER_API_PREFIX}/lookup-values`

export const lookupMasterService = {
  listGroups(params = {}) {
    return apiClient.get(LOOKUP_GROUP_PATH, { params })
  },
  getGroupById(lookupGroupId) {
    return apiClient.get(`${LOOKUP_GROUP_PATH}/${lookupGroupId}`)
  },
  createGroup(payload) {
    return apiClient.post(LOOKUP_GROUP_PATH, payload)
  },
  updateGroup(lookupGroupId, payload) {
    return apiClient.put(`${LOOKUP_GROUP_PATH}/${lookupGroupId}`, payload)
  },
  removeGroup(lookupGroupId) {
    return apiClient.delete(`${LOOKUP_GROUP_PATH}/${lookupGroupId}`)
  },
  listValues(params = {}) {
    return apiClient.get(LOOKUP_VALUE_PATH, { params })
  },
  listValuesByGroupCode(lookupGroupCode, params = {}) {
    return apiClient.get(`${LOOKUP_GROUP_PATH}/${lookupGroupCode}/values`, { params })
  },
  getValueById(lookupValueId) {
    return apiClient.get(`${LOOKUP_VALUE_PATH}/${lookupValueId}`)
  },
  createValue(payload) {
    return apiClient.post(LOOKUP_VALUE_PATH, payload)
  },
  updateValue(lookupValueId, payload) {
    return apiClient.put(`${LOOKUP_VALUE_PATH}/${lookupValueId}`, payload)
  },
  removeValue(lookupValueId) {
    return apiClient.delete(`${LOOKUP_VALUE_PATH}/${lookupValueId}`)
  }
}

export default lookupMasterService
