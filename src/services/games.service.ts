import { api } from '@/api/client'
import { ENDPOINTS } from '@/api/endpoints'
import { IGameSearchResponse } from '@/types/game.types';

export interface SearchRequestProps {
  name: string;
  platform?: string;
}

export const gamesService = {
  search: async (query: SearchRequestProps): Promise<IGameSearchResponse> => {
    try {
      const { data } = await api.get<IGameSearchResponse>(ENDPOINTS.games.searchByName(query))

      return data
    } catch (error) {
      throw error
    }
  }
}