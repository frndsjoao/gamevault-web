import { useState } from "react"
import Icon, { IconName } from "./Icon"
import Rating from "./Rating"
import GameModal from "../layout/Modals/GameModal"
import { GameStatusType, IGame } from "@/@types/game"
import { getFilteredStatus } from "@/utils/status"
import { useUpdateGameQuery } from "@/hooks/mutations/useGames"

interface StatusOptionsProps {
  activeColumn?: "Playing" | "Backlog" | "Completed"
  active?: GameStatusType
  changeGameStatus: (status: GameStatusType) => void
  loadingStatus?: GameStatusType | null
}

interface GameCardProps {
  game: IGame
}

export default function GameCard({ game }: GameCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState<GameStatusType | null>(null)

  const { mutate: updateGame } = useUpdateGameQuery()

  async function changeGameStatus(status: GameStatusType) {
    setLoadingStatus(status)
    updateGame(
      { id: game.id ?? 0, game: { ...game, status } },
      {
        onSuccess: () => setLoadingStatus(null),
        onError: () => setLoadingStatus(null),
      }
    )
  }

  return (
    <>
      <div className="relative w-48 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-gray-900 md:w-56 lg:w-64">
        <div className="aspect-[3/4] max-h-72 w-full overflow-hidden">
          <img
            className="h-full w-full cursor-pointer rounded-t-lg object-cover object-center transition-transform duration-300 hover:scale-105"
            src={game.cover}
            alt={`${game.name} cover`}
            loading="lazy"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="px-2 py-2 md:px-3">
          <div className="mb-2 flex flex-row items-center justify-between gap-3">
            <p className="truncate text-sm font-medium text-text-light md:text-base">
              {game.name}
            </p>
            {game.selectedPlatform && (
              <Icon
                name={`plat-${game.selectedPlatform}` as IconName}
                size={14}
                className="flex-shrink-0 text-text-light md:size-4"
              />
            )}
          </div>

          {game.status &&
            !["Backlog", "Playing"].includes(game?.status) &&
            game.rating &&
            game.rating > 0 && <Rating rating={game.rating} />}

          {game.status && (
            <StatusOptions
              changeGameStatus={changeGameStatus}
              active={game.status}
              loadingStatus={loadingStatus}
            />
          )}
        </div>
      </div>

      <GameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        game={game}
        update
      />
    </>
  )
}

function StatusOptions({
  activeColumn,
  active,
  changeGameStatus,
  loadingStatus,
}: StatusOptionsProps) {
  const filteredStatus = getFilteredStatus(activeColumn)

  return (
    <div className="mb-1 mt-2 flex w-full flex-row flex-wrap items-center gap-1 md:mb-2 md:mt-3">
      {filteredStatus.map((item) => {
        const isLoading = loadingStatus === item

        return (
          <button
            key={item}
            className={`rounded-md border border-border px-1.5 py-0.5 transition-colors duration-300 ease-in-out hover:bg-btn-dark active:scale-95 md:px-2 md:py-1 ${active === item ? "bg-btn-light hover:bg-btn-light" : "bg-transparent"} ${isLoading ? "opacity-50 cursor-wait" : ""}`}
            onClick={() => changeGameStatus(item)}
            disabled={isLoading}
          >
            <p
              className={`text-[10px] md:text-xs ${active === item ? "text-text-dark" : "text-text-light"}`}
            >
              {isLoading ? "..." : item}
            </p>
          </button>
        )
      })}
    </div>
  )
}
