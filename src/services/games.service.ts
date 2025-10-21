import { IGameSearchIGDB } from '@/@types/game';
import { api } from '@/services/api/client'
import { ENDPOINTS } from '@/services/api/endpoints'

export interface SearchRequestProps {
  name: string;
  platform?: string;
}

export const gamesService = {
  search: async (query: SearchRequestProps): Promise<{ games: IGameSearchIGDB[] }> => {
    const { data } = await api.get<{ games: IGameSearchIGDB[] }>(ENDPOINTS.games.searchByName(query))
    return data
  }
}