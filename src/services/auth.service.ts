import { api } from "@/services/api/client"
import { ENDPOINTS } from "@/services/api/endpoints"
import { IUser } from "@/@types/user"
import { PlatformId } from "@/@types/game"

interface SigninProps {
  email: string
  password: string
}

interface SignupProps {
  name: string
  email: string
  password: string
  birthdate: string
  preferredPlatform: PlatformId
}

interface SignInResponseProps extends IUser {
  accessToken: string
}

export const authService = {
  signin: async (credentials: SigninProps): Promise<SignInResponseProps> => {
    const { data } = await api.post<SignInResponseProps>(
      ENDPOINTS.user.signin,
      credentials,
    )
    return data
  },
  signup: async (userData: SignupProps): Promise<{ success: boolean }> => {
    const { data } = await api.post<{ success: boolean }>(
      ENDPOINTS.user.signup,
      userData,
    )
    return data
  },
}
