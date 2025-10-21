import { getUserToken } from '@/utils/utils'
import axios, { AxiosError } from 'axios'

type ApiErrorResponse = {
  errors?: string[] | string
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_DEVURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
})

const publicRoutes = ['/signin', '/signup']

api.interceptors.request.use(
  (config) => {
    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.includes(route)
    )

    if (!isPublicRoute) {
      const token = getUserToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const isPublicRoute = publicRoutes.some((route) =>
      error.config?.url?.includes(route)
    )

    if (error.response?.status === 401) {
      if (!isPublicRoute) {
        // localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN)
        // window.location.href = '/signin'
      } else {
      }
    }

    const apiError = {
      message: error.response?.data.errors || ['Erro na requisição'],
      statusCode: error.response?.status,
    }

    return Promise.reject(apiError)
  }
)