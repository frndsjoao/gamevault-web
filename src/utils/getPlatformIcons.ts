import { IPlatform } from "@/@types/game";

type Icon = "plat-pc" | "plat-playstation" | "plat-xbox" | "plat-nintendo"

export function getPlatformIcons(platforms: IPlatform[]): Icon[] {
  const iconMap: Record<string, string> = {
    "PC (Microsoft Windows)": "plat-pc",
    "PlayStation": "plat-playstation",
    "PlayStation 2": "plat-playstation",
    "PlayStation 3": "plat-playstation",
    "PlayStation 4": "plat-playstation",
    "PlayStation 5": "plat-playstation",
    "Xbox Series X|S": "plat-xbox",
    "Xbox One": "plat-xbox",
    "Nintendo Switch": "plat-nintendo",
  }

  const icons = platforms
    .map(platform => iconMap[platform.name])
    .filter((icon): icon is Icon => Boolean(icon))

  return [...new Set(icons)]
}
