export type GamePlatformType = "PC (Microsoft Windows)" | "PlayStation" | "PlayStation 2" | "PlayStation 3" | "PlayStation 4" | "PlayStation 5" | "Xbox Series X|S" | "Xbox One" | "Nintendo Switch"
export type GameStatusType = "Backlog" | "Replay" | "Playing" | "On Hold" | "Abandoned" | "Completed"

export interface IPlatform {
  id: number;
  name: GamePlatformType;
  releaseDate: number
}

export interface IGame {
  name: string;
  platform: GamePlatformType;
  rating: number;
  platinum: boolean;
  finishedAt: string;
  id: number;
  user_id: number;
  status: GameStatusType;
  createdAt: string;
}

export interface IGameSearchIGDB {
  id: number;
  name: string;
  cover: string;
  platforms: IPlatform[]
}