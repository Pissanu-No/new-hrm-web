import { defineStore } from 'pinia'
import { departmentService } from '@/services/departmentService'
import { extractApiData, extractApiItems, normalizeApiError } from '@/utils/apiResponse'

export const useDepartmentStore = defineStore('departments', {
  state: () => ({
    items: [],
    current: null,
    loading: false,
    saving: false,
    deleting: false,
    error: null
  }),
  actions: {
    clearError() {
      this.error = null
    },
    async fetchDepartments(params = {}) {
      this.loading = true
      this.clearError()

      try {
        const response = await departmentService.list(params)
        this.items = extractApiItems(response)
        return this.items
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async fetchDepartment(departmentId) {
      this.loading = true
      this.clearError()

      try {
        const response = await departmentService.getById(departmentId)
        this.current = extractApiData(response) || null
        return this.current
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async createDepartment(payload) {
      this.saving = true
      this.clearError()

      try {
        const response = await departmentService.create(payload)
        return extractApiData(response)
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.saving = false
      }
    },
    async updateDepartment(departmentId, payload) {
      this.saving = true
      this.clearError()

      try {
        const response = await departmentService.update(departmentId, payload)
        this.current = extractApiData(response) || this.current
        return this.current
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.saving = false
      }
    },
    async deleteDepartment(departmentId) {
      this.deleting = true
      this.clearError()

      try {
        await departmentService.remove(departmentId)
        this.items = this.items.filter((item) => item.id !== departmentId && item.departmentId !== departmentId)
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.deleting = false
      }
    }
  }
})
