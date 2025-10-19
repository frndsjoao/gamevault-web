import { IGamePlatform } from "@/types/gamePlatform.types";

type Platform = { id: number; name: IGamePlatform; releaseDate: number }

export function getPlatformIcons(platforms: Platform[]): string[] {
  const iconMap: Record<string, string> = {
    "PC (Microsoft Windows)": "pc",
    "PlayStation": "playstation",
    "PlayStation 2": "playstation",
    "PlayStation 3": "playstation",
    "PlayStation 4": "playstation",
    "PlayStation 5": "playstation",
    "Xbox Series X|S": "xbox",
    "Xbox One": "xbox",
    "Nintendo Switch": "switch",
  }

  const icons = platforms
    .map(platform => iconMap[platform.name])
    .filter((icon): icon is string => Boolean(icon)) // remove undefined

  // remove duplicados
  return [...new Set(icons)]
}
