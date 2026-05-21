import { defineStore } from 'pinia'
import employeeService from '@/services/employeeService'

function getEmployeeId(employee) {
  return employee?.employeeId || employee?.id
}

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    selectedEmployee: null,
    loading: false,
    saving: false,
    error: ''
  }),
  actions: {
    async fetchEmployees(params) {
      this.loading = true
      this.error = ''

      try {
        const result = await employeeService.getAll(params)
        this.employees = Array.isArray(result) ? result : result?.items || result?.content || []
        return result
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async fetchEmployeeById(employeeId) {
      this.loading = true
      this.error = ''

      try {
        const employee = await employeeService.getById(employeeId)
        this.selectedEmployee = employee
        return employee
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
    async saveEmployee(payload, employeeId) {
      this.saving = true
      this.error = ''

      try {
        const saved = employeeId
          ? await employeeService.update(employeeId, payload)
          : await employeeService.create(payload)

        const savedId = getEmployeeId(saved)
        if (employeeId || savedId) {
          this.selectedEmployee = saved
        }

        return saved
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    },
    async deleteEmployee(employeeId) {
      this.saving = true
      this.error = ''

      try {
        await employeeService.delete(employeeId)
        this.employees = this.employees.filter((employee) => getEmployeeId(employee) !== employeeId)
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.saving = false
      }
    }
  }
})
