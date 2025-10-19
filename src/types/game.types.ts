import { IGamePlatform } from "./gamePlatform.types";
import { IGameStatus } from "./gameStatus.types";

export interface IGame {
  name: string;
  platform: IGamePlatform;
  rating: number;
  platinum: boolean;
  finishedAt: string;
  id: number;
  user_id: number;
  status: IGameStatus;
  createdAt: string;
}

export interface IGameSearch {
  games: {
    id: number;
    name: string;
    cover: string;
    platforms: { id: number; name: IGamePlatform; releaseDate: number }[]
  }[]
}