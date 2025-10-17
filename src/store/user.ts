import { IUser } from '@/types/user.types'
import { create } from 'zustand'

interface UserStore {
  user: IUser
  setUser: (user: IUser) => void
  clearUser: () => void
}

export const useUser = create<UserStore>((set) => ({
  user: {} as IUser,
  setUser: (user: IUser) => set({ user }),
  clearUser: () => set({ user: {} as IUser }),
}))