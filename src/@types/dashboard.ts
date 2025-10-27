import { IGame } from "./game"

export interface IDashboard {
  backlog: IGame[]
  playing: IGame[]
  finished: IGame[]
}
