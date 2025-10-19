import { IGameSearchIGDB } from "@/@types/game"
import { gamesService, SearchRequestProps } from "@/services/games.service"
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"

export function useSearchGameQuery(
  searchParams: SearchRequestProps,
  options?: Omit<UseQueryOptions<{ games: IGameSearchIGDB[] }, Error, IGameSearchIGDB[], QueryKey>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: ["search-game", searchParams],
    queryFn: () => gamesService.search(searchParams),
    staleTime: Infinity,
    select: (data) => data.games,
    ...options,
  })
}
