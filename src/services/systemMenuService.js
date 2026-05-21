import apiClient from '@/services/apiClient'
import { SECURE_API_PREFIX } from '@/services/apiPaths'

const MENU_ITEM_PATH = `${SECURE_API_PREFIX}/system/menu-items`

export const systemMenuService = {
  list(params = {}) {
    return apiClient.get(MENU_ITEM_PATH, { params })
  },
  tree(params = {}) {
    return apiClient.get(`${MENU_ITEM_PATH}/tree`, { params })
  },
  getById(menuItemId) {
    return apiClient.get(`${MENU_ITEM_PATH}/${menuItemId}`)
  },
  create(payload) {
    return apiClient.post(MENU_ITEM_PATH, payload)
  },
  update(menuItemId, payload) {
    return apiClient.put(`${MENU_ITEM_PATH}/${menuItemId}`, payload)
  },
  remove(menuItemId) {
    return apiClient.delete(`${MENU_ITEM_PATH}/${menuItemId}`)
  }
}

export default systemMenuService
