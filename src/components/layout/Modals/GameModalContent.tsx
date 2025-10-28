import { IGame, IPlatform, PlatformId } from "@/@types/game"
import Button from "@/components/common/Button"
import Checkbox from "@/components/common/Checkbox"
import DatePicker from "@/components/common/DatePicker"
import Icon, { IconName } from "@/components/common/Icon"
import Rating from "@/components/common/Rating"
import { GameFormData, gameFormSchema } from "@/schemas/gameFormSchema"
import { gameStatus } from "@/utils/status"
import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useAddGameQuery, useUpdateGameQuery } from "@/hooks/mutations/useGames"
import { formatDateToString, showErrorToast } from "@/utils/utils"
import { parseSchemaErrors } from "@/utils/parseSchemaError"

interface SearchGameModalProps {
  game: IGame
  platform?: PlatformId
  update?: boolean
}

export function GameModalContent({
  game,
  platform,
  update,
}: SearchGameModalProps) {
  const getInitialPlatform = (): PlatformId => {
    if (platform && platform !== "all") return platform
    if (game.selectedPlatform) return game.selectedPlatform
    return game.platforms[0]?.id || "pc"
  }

  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(gameFormSchema),
    defaultValues: {
      platform: getInitialPlatform(),
      rating: game.rating || 0,
      platinum: game.platinum || false,
      status: (game.status as GameFormData["status"]) || "Backlog",
      finishedDate: undefined,
    },
    mode: "onChange",
  })

  const selectedStatus = watch("status")
  const selectedPlatform = watch("platform")

  const addGame = useAddGameQuery()
  const updateGame = useUpdateGameQuery()

  const platformIcon = useCallback(
    (platform: IPlatform) => `plat-${platform.id}` as IconName,
    [],
  )
  const releaseDate = game.platforms.find(
    (p) => p.id === selectedPlatform,
  )?.releaseDate

  const onSubmit = async (data: GameFormData) => {
    const gameData = {
      name: game.name,
      cover: game.cover,
      platforms: game.platforms,
      finishedAt: formatDateToString(data.finishedDate),
      igdbId: game.igdbId ? game.igdbId : game.id,
      platinum: data.platinum,
      rating: data.rating,
      selectedPlatform: data.platform,
      status: data.status,
    }

    if (update) {
      updateGame.mutate({ id: game.id ?? 0, game: gameData })
    } else {
      addGame.mutate(gameData)
    }
  }

  const onError = (err: any) => {
    showErrorToast(
      parseSchemaErrors(err) ||
        addGame.error?.message ||
        updateGame.error?.message ||
        "",
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex min-w-full flex-col items-center gap-3 p-2 md:gap-4 md:p-3 lg:p-4"
    >
      <div className="flex w-full flex-col gap-3 md:flex-row md:gap-6">
        <img
          src={game.cover}
          alt={game.name}
          loading="lazy"
          decoding="async"
          className="w-40 self-center rounded-lg object-cover shadow-lg md:w-64"
        />
        <div className="w-full space-y-3 text-start md:space-y-4">
          <div>
            <h2 className="text-base font-bold text-text-light md:text-xl lg:text-2xl">
              {game.name}
            </h2>
            <span className="text-xs text-text-light md:text-sm">
              {releaseDate}
            </span>
          </div>

          <Controller
            name="platform"
            control={control}
            render={({ field }) => (
              <div className="my-3 flex flex-row items-center gap-2">
                {game.platforms.map((plat) => {
                  const isActive = selectedPlatform === plat.id
                  return (
                    <button
                      key={plat.id}
                      onClick={() => field.onChange(plat.id)}
                      disabled={isActive}
                      className={`${isActive ? "border-btn-light bg-btn-light cursor-not-allowed" : "border-border hover:bg-gray-700 cursor-pointer"} rounded-md border p-2 transition-colors`}
                      aria-label={`Selecionar plataforma ${plat.name}`}
                    >
                      <Icon
                        name={platformIcon(plat)}
                        size={18}
                        className={
                          isActive ? "text-text-dark" : "text-text-light"
                        }
                      />
                    </button>
                  )
                })}
              </div>
            )}
          />

          <div className="mt-2 md:mt-4">
            <span className="mb-2 text-sm font-medium text-text-medium">
              Rating:
            </span>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rating
                  enabled
                  rating={field.value}
                  size={20}
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

          <div>
            <p className="text-base font-semibold text-text-medium">Status:</p>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex w-full flex-wrap gap-2">
                  {gameStatus.map((status) => {
                    const isStatusActive = field.value === status
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => field.onChange(status)}
                        disabled={isStatusActive}
                        className={`${
                          isStatusActive
                            ? "border-btn-light bg-btn-light text-text-dark cursor-not-allowed"
                            : "border-border text-text-light hover:bg-gray-700 cursor-pointer"
                        } rounded-md border px-3 py-1.5 transition-colors font-medium text-xs md:px-4 md:py-2 md:text-sm`}
                        aria-label={`Selecionar status ${status}`}
                      >
                        {status}
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>

          {selectedStatus === "Finished" && (
            <div className="animate-fadeIn">
              <Controller
                name="finishedDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Completion date:"
                    placeholder="Select the date"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          )}
        </div>
      </div>

      <Button
        label="Save"
        className="ml-auto w-full md:max-w-44"
        isLoading={addGame.isPending || updateGame.isPending}
      />
    </form>
  )
}
