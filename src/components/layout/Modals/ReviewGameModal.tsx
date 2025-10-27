import { GameStatusType, IGame } from "@/@types/game"
import ModalContainer from "./Modal"
import { useUpdateGameQuery } from "@/hooks/mutations/useGames"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CompleteGameFormData,
  completeGameFormSchema,
} from "@/schemas/gameFormSchema"
import { formatDateToString, showErrorToast } from "@/utils/utils"
import { parseSchemaErrors } from "@/utils/parseSchemaError"
import Button from "@/components/common/Button"
import Checkbox from "@/components/common/Checkbox"
import Rating from "@/components/common/Rating"

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  game: IGame
  onConfirm?: () => void
}

export default function ReviewGameModal({
  isOpen,
  onClose,
  game,
  onConfirm,
}: GameModalProps) {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(completeGameFormSchema),
    defaultValues: {
      rating: game.rating || 0,
      platinum: game.platinum || false,
    },
    mode: "onChange",
  })

  const { mutate: updateGame, error, isPending } = useUpdateGameQuery()

  const handleConfirm = async (data: CompleteGameFormData) => {
    const today = new Date()
    const finishedStatus: GameStatusType = "Finished"
    const gameData = {
      ...game,
      finishedAt: formatDateToString(today),
      platinum: data.platinum,
      rating: data.rating,
      status: finishedStatus,
    }

    updateGame({ id: game.id ?? 0, game: gameData })
    onConfirm?.()
    onClose()
  }

  const handleConfirmWithoutReview = async () => {
    const today = new Date()
    const finishedStatus: GameStatusType = "Finished"
    const gameData = {
      ...game,
      finishedAt: formatDateToString(today),
      status: finishedStatus,
    }

    updateGame({ id: game.id ?? 0, game: gameData })
    onConfirm?.()
    onClose()
  }

  const onError = (err: any) => {
    showErrorToast(parseSchemaErrors(err) || error?.message)
  }

  return (
    <ModalContainer isOpen={isOpen} onClose={handleConfirmWithoutReview}>
      <form
        onSubmit={handleSubmit(handleConfirm, onError)}
        className="flex min-w-full flex-col items-center gap-3 p-2 md:gap-4 md:p-3 lg:p-4"
      >
        <h2 className="text-xl font-semibold text-text-light">
          Review {game.name}
        </h2>

        <div className="flex flex-1 flex-col items-center">
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Rating
                enabled
                rating={field.value}
                size={32}
                onChange={field.onChange}
              />
            )}
          />

          <div className="mt-6">
            <Controller
              name="platinum"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  label="Platinum"
                  icon="platinum"
                />
              )}
            />
          </div>
        </div>

        <Button
          label="Save"
          className="mx-auto w-full md:max-w-44"
          isLoading={isPending}
        />
      </form>
    </ModalContainer>
  )
}
