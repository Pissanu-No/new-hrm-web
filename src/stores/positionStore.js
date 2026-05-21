import { defineStore } from 'pinia'
import { positionService } from '@/services/positionService'
import { extractApiData, extractApiItems, normalizeApiError } from '@/utils/apiResponse'

export const usePositionStore = defineStore('positions', {
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
    async fetchPositions(params = {}) {
      this.loading = true
      this.clearError()

      try {
        const response = await positionService.list(params)
        this.items = extractApiItems(response)
        return this.items
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async fetchPosition(positionId) {
      this.loading = true
      this.clearError()

      try {
        const response = await positionService.getById(positionId)
        this.current = extractApiData(response) || null
        return this.current
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async createPosition(payload) {
      this.saving = true
      this.clearError()

      try {
        const response = await positionService.create(payload)
        return extractApiData(response)
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.saving = false
      }
    },
    async updatePosition(positionId, payload) {
      this.saving = true
      this.clearError()

      try {
        const response = await positionService.update(positionId, payload)
        this.current = extractApiData(response) || this.current
        return this.current
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.saving = false
      }
    },
    async deletePosition(positionId) {
      this.deleting = true
      this.clearError()

      try {
        await positionService.remove(positionId)
        this.items = this.items.filter((item) => item.id !== positionId && item.positionId !== positionId)
      } catch (error) {
        this.error = normalizeApiError(error)
        throw this.error
      } finally {
        this.deleting = false
      }
    }
  }
})
