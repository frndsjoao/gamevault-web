import { storage } from "@/utils/localStorage"
import { handleLogout } from "@/utils/auth"
import axios, { AxiosError } from "axios"

type ApiErrorResponse = {
  error?: {
    code: string
    message: string
    timestamp: string
    path: string
  }
  errors?: string[] | string
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_DEVURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
})

const publicRoutes = ["/signin", "/signup"]

api.interceptors.request.use(
  (config) => {
    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.includes(route),
    )

    if (!isPublicRoute) {
      const token = storage.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const isPublicRoute = publicRoutes.some((route) =>
      error.config?.url?.includes(route),
    )

    // Se for erro 401 (não autorizado) em rota privada, faz logout completo
    if (error.response?.status === 401 && !isPublicRoute) {
      handleLogout()
      return Promise.reject({ message: "Session expired", statusCode: 401 })
    }

    const apiError = {
      message: error.response?.data.error?.message || "Request error.",
      statusCode: error.response?.status,
    }

    return Promise.reject(apiError)
  },
)
