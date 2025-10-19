import { api } from '@/services/api/client'
import { ENDPOINTS } from '@/services/api/endpoints'
import { IUser } from '@/@types/user';

export const userService = {
  profile: async (): Promise<IUser> => {
    try {
      const { data } = await api.get<IUser>(ENDPOINTS.user.profile)

      return data
    } catch (error) {
      throw error
    }
  }
}