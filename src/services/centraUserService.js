import centraApiClient from '@/services/centraApiClient'

export const centraUserService = {
  getProfile(userId) {
    return centraApiClient.get(`/v1/s/user/${userId}`)
  }
}

export default centraUserService
