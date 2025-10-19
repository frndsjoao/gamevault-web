import { gamesService, SearchRequestProps } from "@/services/games.service"
import { IGameSearch } from "@/types/game.types"
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"

export function useSearchGameQuery(
  searchParams: SearchRequestProps,
  options?: Omit<UseQueryOptions<IGameSearch, Error, IGameSearch, QueryKey>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: ["search-game", searchParams],
    queryFn: () => gamesService.search(searchParams),
    staleTime: Infinity,
    ...options,
  })
}
