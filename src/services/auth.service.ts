import { api } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { IUser } from '@/types/user.types';

interface SigninProps {
  email: string;
  password: string;
}

interface SignInResponseProps extends IUser {
  accessToken: string;
}

export const authService = {
  signin: async (credentials: SigninProps): Promise<SignInResponseProps> => {
    try {
      const { data } = await api.post<SignInResponseProps>(ENDPOINTS.user.signin, credentials)

      return data
    } catch (error) {
      throw error
    }
  }
}