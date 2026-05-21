import { defineStore } from 'pinia'
import {
  getAccessTokenFromCookies,
  getCurrentUserFromCookies,
  getCurrentUserIdFromCookies,
  getRefreshTokenFromCookies
} from '@/utils/cookieAuth'
import centraUserService from '@/services/centraUserService'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    userId: null,
    permissions: [],
    profileLoading: false,
    profileError: ''
  }),
  getters: {
    token: (state) => state.accessToken,
    isAuthenticated: (state) => Boolean(state.accessToken),
    displayName: (state) => {
      if (typeof state.user === 'string') {
        return UUID_PATTERN.test(state.user) ? 'HR User' : state.user
      }

      const firstNameEn = pickProfileValue(state.user, ['firstNameEn', 'first_name_en', 'firstNameEN'])
      const lastNameEn = pickProfileValue(state.user, ['lastNameEn', 'last_name_en', 'lastNameEN'])
      const firstName = pickProfileValue(state.user, ['firstName', 'first_name'])
      const lastName = pickProfileValue(state.user, ['lastName', 'last_name'])

      return (
        [firstNameEn, lastNameEn].filter(Boolean).join(' ') ||
        pickProfileValue(state.user, ['fullNameEn', 'full_name_en']) ||
        pickProfileValue(state.user, ['displayName', 'display_name']) ||
        pickProfileValue(state.user, ['fullName', 'full_name']) ||
        pickProfileValue(state.user, ['name']) ||
        [firstName, lastName].filter(Boolean).join(' ') ||
        pickProfileValue(state.user, ['username', 'userName']) ||
        pickProfileValue(state.user, ['email']) ||
        'HR User'
      )
    },
    workspaceName: (state) => {
      if (!state.user || typeof state.user === 'string') return 'HR Workspace'

      return (
        pickProfileValue(state.user, ['unitNameEn', 'unit_name_en', 'unitNameEN']) ||
        pickProfileValue(state.user, ['unitName', 'unit_name']) ||
        pickProfileValue(state.user, ['organizationNameEn', 'organization_name_en']) ||
        'HR Workspace'
      )
    }
  },
  actions: {
    loadSession() {
      return this.loadSessionFromCookies()
    },
    loadSessionFromCookies() {
      const userId = getCurrentUserIdFromCookies()
      const cookieUser = getCurrentUserFromCookies(userId)
      const shouldReplaceUser = this.userId !== userId || !hasResolvedProfile(this.user)

      this.userId = userId
      if (shouldReplaceUser) {
        this.user = cookieUser
      }
      this.accessToken = getAccessTokenFromCookies(userId)
      this.refreshToken = getRefreshTokenFromCookies(userId)
      this.permissions = Array.isArray(this.user?.permissions) ? this.user.permissions : []

      return {
        userId: this.userId,
        user: this.user,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken
      }
    },
    async fetchUserProfile(force = false) {
      if (!this.userId) {
        this.loadSessionFromCookies()
      }

      if (!this.userId || !import.meta.env.VITE_API_CENTRA_API) {
        this.profileError = 'VITE_API_CENTRA_API is not configured.'
        return null
      }
      if (!force && this.user && typeof this.user === 'object' && !UUID_PATTERN.test(this.displayName)) return this.user

      this.profileLoading = true
      this.profileError = ''

      try {
        const profile = await centraUserService.getProfile(this.userId)
        this.user = normalizeProfile(profile)
        this.permissions = Array.isArray(this.user?.permissions) ? this.user.permissions : this.permissions
        return this.user
      } catch (error) {
        this.profileError = error.message
        return null
      } finally {
        this.profileLoading = false
      }
    },
    clearSession() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.userId = null
      this.permissions = []
      this.profileLoading = false
      this.profileError = ''
    }
  }
})

function normalizeProfile(profile) {
  if (!profile || typeof profile !== 'object') return profile

  return findProfileCandidate(profile) || profile
}

function hasResolvedProfile(user) {
  if (!user || typeof user === 'string') return false

  return Boolean(
    pickProfileValue(user, ['firstNameEn', 'first_name_en', 'firstNameEN']) ||
    pickProfileValue(user, ['lastNameEn', 'last_name_en', 'lastNameEN']) ||
    pickProfileValue(user, ['unitNameEn', 'unit_name_en', 'unitNameEN']) ||
    pickProfileValue(user, ['displayName', 'display_name']) ||
    pickProfileValue(user, ['fullNameEn', 'full_name_en'])
  )
}

function findProfileCandidate(payload) {
  const queue = [payload]
  const visited = new Set()

  while (queue.length) {
    const current = queue.shift()
    if (!current || typeof current !== 'object' || visited.has(current)) continue

    visited.add(current)

    if (
      pickProfileValue(current, ['firstNameEn', 'first_name_en', 'firstNameEN']) ||
      pickProfileValue(current, ['lastNameEn', 'last_name_en', 'lastNameEN']) ||
      pickProfileValue(current, ['unitNameEn', 'unit_name_en', 'unitNameEN'])
    ) {
      return current
    }

    Object.values(current).forEach((value) => {
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) queue.push(...value)
        else queue.push(value)
      }
    })
  }

  return null
}

function pickProfileValue(profile, keys) {
  if (!profile || typeof profile !== 'object') return ''

  for (const key of keys) {
    const value = profile[key]
    if (value !== undefined && value !== null && value !== '') return value
  }

  return ''
}
