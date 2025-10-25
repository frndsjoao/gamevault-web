import { IGame, IGameSearchIGDB } from "@/@types/game"
import { api } from "@/services/api/client"
import { ENDPOINTS } from "@/services/api/endpoints"

export interface SearchRequestProps {
  name: string
  platform?: string
}

export interface UpdateGameRequestProps {
  id: string
  game: IGame
}

export const gamesService = {
  search: async (
    query: SearchRequestProps,
  ): Promise<{ games: IGameSearchIGDB[] }> => {
    const { data } = await api.get<{ games: IGameSearchIGDB[] }>(
      ENDPOINTS.games.searchByName(query),
    )
    return data
  },

  add: async (game: IGame): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(
      ENDPOINTS.games.add,
      game,
    )
    return data
  },

  update: async ({
    id,
    game,
  }: UpdateGameRequestProps): Promise<{ message: string }> => {
    const { data } = await api.put<{ message: string }>(
      ENDPOINTS.games.updateById(id),
      game,
    )
    return data
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(
      ENDPOINTS.games.deleteById(id),
    )
    return data
  },
}
