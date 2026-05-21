import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

export const userRoleService = {
  listUsers(params = {}) {
    return apiClient.get(`${SECURE_API_PREFIX}/users`, { params })
  },
  listRoles(params = {}) {
    return apiClient.get(`${SECURE_API_PREFIX}/roles`, { params })
  }
}
