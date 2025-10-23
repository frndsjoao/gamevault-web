import { showErrorToast } from "@/utils/utils"
import { authService } from "@/services/auth.service"
import { useUser } from "@/store/user"
import { IApiError } from "@/@types/apiError"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const useSignInQuery = () => {
  const navigate = useNavigate()
  const setUser = useUser((state) => state.setUser)

  return useMutation({
    mutationFn: authService.signin,
    onSuccess: (data) => {
      const { accessToken, ...rest } = data
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN, accessToken)
      setUser({ ...rest })

      navigate("/dashboard")
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
      navigate("/signin")
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}
