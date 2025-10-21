import { GameStatusType } from "@/@types/game"

export const gameStatus: GameStatusType[] = ["Backlog", "Replay", "Playing", "Abandoned", "Completed"]

export const getFilteredStatus = (activeColumn?: "Playing" | "Backlog" | "Completed"): GameStatusType[] => {
  if (activeColumn === "Completed") return [];

  const quickStatus: GameStatusType[] = ["Backlog", "Playing", "Completed"]

  if (activeColumn === "Playing") {
    return quickStatus.filter(item => item !== "Backlog")
  }

  return quickStatus
}
