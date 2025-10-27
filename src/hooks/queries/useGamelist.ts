import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { gamesService } from "@/services/games.service"
import { GameStatusType, IGame } from "@/@types/game"

export function useGamelistQuery(
  filter: GameStatusType,
  options?: Omit<
    UseQueryOptions<{ games: IGame[] }, Error, IGame[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["game-list", filter],
    queryFn: () => gamesService.list(filter),
    staleTime: 1000 * 60 * 10,
    select: (data) => data.games,
    ...options,
  })
}
