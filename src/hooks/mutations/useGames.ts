import { useMutation, useQueryClient } from "@tanstack/react-query"
import { showErrorToast } from "@/utils/utils"
import { IApiError } from "@/@types/apiError"
import { toast } from "react-toastify"
import { gamesService } from "@/services/games.service"

export const useAddGameQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: gamesService.add,
    onSuccess: () => {
      toast("Game added successfully!", { type: "success" })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
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
    onSuccess: () => {
      toast("Game updated successfully!", { type: "success" })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
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
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}
