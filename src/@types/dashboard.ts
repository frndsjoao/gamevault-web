import { IGame } from "./game"

export interface IDashboard {
  backlog: IGame[]
  playing: IGame[]
  completed: IGame[]
}
