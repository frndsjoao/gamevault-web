import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_DEVURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN);
      // window.location.href = '/signin';
      console.error('Não autorizado')
    }

    if (error.response?.status === 500) {
      console.error('Erro no servidor')
    }

    return Promise.reject(error)
  }
)