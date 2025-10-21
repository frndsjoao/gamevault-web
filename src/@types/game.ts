import { platforms } from "@/utils/platforms";

type GamePlatformType = "All" | "PC" | "PlayStation" | "Xbox" | "Nintendo Switch"
export type GameStatusType = "Backlog" | "Replay" | "Playing" | "Abandoned" | "Completed"

export type PlatformId = typeof platforms[number]["id"]

export interface IPlatform {
  id: PlatformId;
  name: GamePlatformType;
  releaseDate?: number
}

export interface IGame {
  id: number;
  name: string;
  cover: string;
  platforms: IPlatform[]

  selectedPlatform?: PlatformId;
  rating?: number;
  platinum?: boolean;
  finishedAt?: string;
  user_id?: number;
  status?: GameStatusType;
  createdAt?: string;
}

export interface IGameSearchIGDB {
  id: number;
  name: string;
  cover: string;
  platforms: IPlatform[]
}