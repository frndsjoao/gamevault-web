import { api } from '@/services/api/client'
import { ENDPOINTS } from '@/services/api/endpoints'
import { IUser } from '@/@types/user';

interface SigninProps {
  email: string;
  password: string;
}

interface SignInResponseProps extends IUser {
  accessToken: string;
}

export const authService = {
  signin: async (credentials: SigninProps): Promise<SignInResponseProps> => {
    const { data } = await api.post<SignInResponseProps>(ENDPOINTS.user.signin, credentials)
    return data
  }
}