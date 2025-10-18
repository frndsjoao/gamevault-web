import { api } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { IUser } from '@/types/user.types';

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