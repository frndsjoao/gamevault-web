const tokenId = import.meta.env.VITE_LOCALSTORAGE_TOKEN
const emailId = import.meta.env.VITE_LOCALSTORAGE_EMAIL

export const storage = {
  getToken: () => localStorage.getItem(tokenId),
  setToken: (token: string) => localStorage.setItem(tokenId, token),
  removeToken: () => localStorage.removeItem(tokenId),

  getEmail: () => localStorage.getItem(emailId),
  setEmail: (email: string) => localStorage.setItem(emailId, email),
  removeEmail: () => localStorage.removeItem(emailId),
}
