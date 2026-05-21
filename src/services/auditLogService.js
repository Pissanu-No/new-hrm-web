import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const AUDIT_LOG_PATH = `${SECURE_API_PREFIX}/audit-logs`

export const auditLogService = {
  list(params = {}) {
    return apiClient.get(AUDIT_LOG_PATH, { params })
  },
  getById(auditLogId) {
    return apiClient.get(`${AUDIT_LOG_PATH}/${auditLogId}`)
  }
}

export default auditLogService
