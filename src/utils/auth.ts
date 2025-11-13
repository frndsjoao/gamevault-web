import { storage } from "./localStorage"
import { useUser } from "@/store/user"

export function handleLogout() {
  // Remove token do storage
  storage.removeToken()

  // Limpa o estado do Redux/Zustand
  useUser.getState().clearUser()

  // Redireciona para login com replace (sem histórico)
  window.location.replace("/signin")
}
