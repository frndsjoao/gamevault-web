import { useMutation } from "@tanstack/react-query"
import { showErrorToast } from "@/utils/utils"
import { IApiError } from "@/@types/apiError"
import { toast } from "react-toastify"
import { gamesService } from "@/services/games.service"

export const useAddGameQuery = () => {
  return useMutation({
    mutationFn: gamesService.add,
    onSuccess: () => {
      toast("Game added successfully!", { type: "success" })
      // queryClient.invalidateQueries({ queryKey: ["games"] })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}

export const useUpdateGameQuery = () => {
  return useMutation({
    mutationFn: gamesService.update,
    onSuccess: () => {
      toast("Game updated successfully!", { type: "success" })
      // queryClient.invalidateQueries({ queryKey: ["games"] })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}

export const useDeleteGameQuery = () => {
  return useMutation({
    mutationFn: gamesService.delete,
    onSuccess: () => {
      toast("Game deleted successfully!", { type: "success" })
      // queryClient.invalidateQueries({ queryKey: ["games"] })
    },
    onError: (error: IApiError) => {
      showErrorToast(error.message)
    },
  })
}
