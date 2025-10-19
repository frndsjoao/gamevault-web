import { userService } from "@/services/user.service"
import { IUser } from "@/@types/user"
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query"

export function useProfileQuery(
  options?: Omit<UseQueryOptions<IUser, Error, IUser, QueryKey>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: userService.profile,
    staleTime: Infinity,
    ...options,
  })
}
