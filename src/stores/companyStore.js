import { defineStore } from 'pinia'
import { companyService } from '@/services/companyService'
import { extractApiData, extractApiItems, normalizeApiError } from '@/utils/apiResponse'

export const useCompanyStore = defineStore('companies', {
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
    async fetchCompanies(params = {}) {
      this.loading = true
      this.clearError()

      try {
        const response = await companyService.list(params)
        this.items = extractApiItems(response)
        return this.items
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async fetchCompany(companyId) {
      this.loading = true
      this.clearError()

      try {
        const response = await companyService.getById(companyId)
        this.current = extractApiData(response) || null
        return this.current
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async createCompany(payload) {
      this.saving = true
      this.clearError()

      try {
        const response = await companyService.create(payload)
        return extractApiData(response)
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.saving = false
      }
    },
    async updateCompany(companyId, payload) {
      this.saving = true
      this.clearError()

      try {
        const response = await companyService.update(companyId, payload)
        this.current = extractApiData(response) || this.current
        return this.current
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.saving = false
      }
    },
    async deleteCompany(companyId) {
      this.deleting = true
      this.clearError()

      try {
        await companyService.remove(companyId)
        this.items = this.items.filter((company) => company.id !== companyId && company.companyId !== companyId)
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.deleting = false
      }
    }
  }
})
