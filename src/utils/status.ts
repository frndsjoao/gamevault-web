import { GameStatusType } from "@/@types/game"

export const gameStatus: GameStatusType[] = [
  "Backlog",
  "Replay",
  "Playing",
  "Abandoned",
  "Finished",
]

export const getFilteredStatus = (
  activeColumn?: GameStatusType,
  activeStatus?: GameStatusType,
): GameStatusType[] => {
  const quickStatus: GameStatusType[] = ["Backlog", "Playing", "Finished"]

  if (activeColumn === "Finished") return ["Finished", "Playing", "Replay"]
  if (activeColumn === "Backlog" && activeStatus === "Backlog")
    return ["Backlog", "Playing", "Finished"]
  if (activeColumn === "Backlog" && activeStatus === "Replay")
    return ["Replay", "Playing", "Finished"]

  if (activeColumn === "Playing") return ["Playing", "Finished"]

  return quickStatus
}
