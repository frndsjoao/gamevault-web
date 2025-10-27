import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showErrorToast } from "@/utils/utils"
import { IApiError } from "@/@types/apiError"
import { toast } from "react-toastify"
import { gamesService, UpdateGameRequestProps } from "@/services/games.service"
import { IDashboard } from "@/@types/dashboard"
import { IGame } from "@/@types/game"

export const useAddGameQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: gamesService.add,
    onSuccess: () => {
      toast("Game added successfully!", { type: "success" })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
      queryClient.invalidateQueries({ queryKey: ["game-list"] })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}

export const useUpdateGameQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: gamesService.update,
    onMutate: async ({ id, game }: UpdateGameRequestProps) => {
      await queryClient.cancelQueries({ queryKey: ["dashboard"] })

      const previousDashboard = queryClient.getQueryData<IDashboard>([
        "dashboard",
      ])

      queryClient.setQueryData<IDashboard>(["dashboard"], (old) => {
        if (!old) return old

        const updateColumn = (
          games: IGame[],
          shouldInclude: boolean,
        ): IGame[] => {
          const filteredGames = games.filter((g) => g.id !== id)
          return shouldInclude ? [...filteredGames, game] : filteredGames
        }

        return {
          backlog: updateColumn(old.backlog, game.status === "Backlog"),
          playing: updateColumn(old.playing, game.status === "Playing"),
          finished: updateColumn(old.finished, game.status === "Finished"),
        }
      })

      return { previousDashboard }
    },
    onSuccess: () => {
      toast("Game updated successfully!", { type: "success" })
    },
    onError: (error: IApiError, _variables, context) => {
      if (context?.previousDashboard) {
        queryClient.setQueryData(["dashboard"], context.previousDashboard)
      }
      showErrorToast(error.message)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
      queryClient.invalidateQueries({ queryKey: ["game-list"] })
    },
  })
}

export const useDeleteGameQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: gamesService.delete,
    onSuccess: () => {
      toast("Game deleted successfully!", { type: "success" })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
      queryClient.invalidateQueries({ queryKey: ["game-list"] })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}
