import { gamesService, SearchRequestProps } from "@/services/games.service"
import { IGameSearchResponse } from "@/types/game.types"
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"

export function useSearchGameQuery(
  searchParams: SearchRequestProps,
  options?: Omit<UseQueryOptions<IGameSearchResponse, Error, IGameSearchResponse, QueryKey>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: ["search-game", searchParams],
    queryFn: () => gamesService.search(searchParams),
    staleTime: Infinity,
    ...options,
  })
}
