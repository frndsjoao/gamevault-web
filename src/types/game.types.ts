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