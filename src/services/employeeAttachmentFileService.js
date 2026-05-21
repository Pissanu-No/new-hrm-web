import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const attachmentFilesPath = (employeeId) => `${SECURE_API_PREFIX}/employees/${employeeId}/attachment-files`

function buildUploadFormData(file, metadata = {}) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.entries(metadata).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, value)
    }
  })

  return formData
}

export const employeeAttachmentFileService = {
  getAll(employeeId, params) {
    return apiClient.get(attachmentFilesPath(employeeId), { params })
  },
  getById(employeeId, attachmentFileId) {
    return apiClient.get(`${attachmentFilesPath(employeeId)}/${attachmentFileId}`)
  },
  createMetadata(employeeId, payload) {
    return apiClient.post(attachmentFilesPath(employeeId), payload)
  },
  updateMetadata(employeeId, attachmentFileId, payload) {
    return apiClient.put(`${attachmentFilesPath(employeeId)}/${attachmentFileId}`, payload)
  },
  delete(employeeId, attachmentFileId) {
    return apiClient.delete(`${attachmentFilesPath(employeeId)}/${attachmentFileId}`)
  },
  download(employeeId, attachmentFileId) {
    return apiClient.get(`${attachmentFilesPath(employeeId)}/${attachmentFileId}/download`, {
      responseType: 'blob'
    })
  },
  upload(employeeId, file, metadata = {}) {
    return apiClient.post(
      `${attachmentFilesPath(employeeId)}/upload`,
      buildUploadFormData(file, metadata),
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }
}

export default employeeAttachmentFileService
