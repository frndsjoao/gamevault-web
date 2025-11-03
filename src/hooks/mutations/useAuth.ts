import { showErrorToast } from "@/utils/utils"
import { authService } from "@/services/auth.service"
import { useUser } from "@/store/user"
import { IApiError } from "@/@types/apiError"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { storage } from "@/utils/localStorage"

export const useSignInQuery = () => {
  const navigate = useNavigate()
  const setUser = useUser((state) => state.setUser)

  return useMutation({
    mutationFn: authService.signin,
    onSuccess: (data) => {
      const { accessToken, ...rest } = data
      storage.setToken(accessToken)
      setUser({ ...rest })

      navigate("/dashboard", { replace: true })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}

export const useSignUpQuery = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      toast("Account created! Now you can login.", { type: "success" })
      navigate("/signin", { replace: true })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}
