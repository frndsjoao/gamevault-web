import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"
import { gamesService } from "@/services/games.service"
import { IDashboard } from "@/@types/dashboard"

export function useDashboardQuery(
  options?: Omit<
    UseQueryOptions<IDashboard, Error, IDashboard, QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: gamesService.dashboard,
    staleTime: 1000 * 60 * 10,
    ...options,
  })
}
