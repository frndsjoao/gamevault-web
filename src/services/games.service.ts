import { api } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { IGameSearch } from '@/types/game.types';

export interface SearchRequestProps {
  name: string;
  platform?: string;
}

export const gamesService = {
  search: async (query: SearchRequestProps): Promise<IGameSearch> => {
    try {
      const { data } = await api.get<IGameSearch>(ENDPOINTS.games.searchByName(query))

      return data
    } catch (error) {
      throw error
    }
  }
}