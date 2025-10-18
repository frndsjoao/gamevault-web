import { IUser } from '@/types/user.types'
import { create } from 'zustand'

interface UserStore {
  user: IUser | null
  setUser: (user: IUser) => void
  clearUser: () => void
}

export const useUser = create<UserStore>((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
  clearUser: () => set({ user: null }),
}))