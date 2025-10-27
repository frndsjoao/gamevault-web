import { GameStatusType } from "@/@types/game"
import { SearchRequestProps } from "@/services/games.service"

export const ENDPOINTS = {
  games: {
    dashboard: "/dashboard",
    list: (filter: GameStatusType) =>
      `/games${filter ? `?filter=${filter}` : ""}`,
    add: "/games",
    // byId: (id: string) => `/games/${id}`,
    deleteById: (id: string) => `/games/${id}`,
    updateById: (id: number) => `/games/${id}`,
    searchByName: ({ name, platform }: SearchRequestProps) =>
      `/search?search=${name}${platform ? `&platform=${platform}` : ""}`,
  },
  user: {
    signup: "/signup",
    signin: "/signin",
    profile: "/profile",
    // stats: "/stats"
  },
} as const
