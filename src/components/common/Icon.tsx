import {
  User,
  EllipsisVertical,
  Eye,
  EyeOff,
  X,
  LogOut,
  Search,
  Bookmark,
  Gamepad2,
  SquareCheckBig,
  ChartLine,
  House,
  PanelLeft,
  Star,
  StarHalf,
  Trophy,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  AtSign,
  KeyRound,
  Calendar1,
  Plus,
} from "lucide-react"
import {
  BsNintendoSwitch,
  BsPlaystation,
  BsWindows,
  BsXbox,
} from "react-icons/bs"

export const icons = {
  user: User,
  eye: Eye,
  eyeOff: EyeOff,
  ellipsis: EllipsisVertical,
  close: X,
  logout: LogOut,
  search: Search,
  whishlist: Bookmark,
  gamepad: Gamepad2,
  "square-check": SquareCheckBig,
  chart: ChartLine,
  home: House,
  panel: PanelLeft,
  star: Star,
  "star-half": StarHalf,
  platinum: Trophy,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  at: AtSign,
  key: KeyRound,
  calendar: Calendar1,
  plus: Plus,

  "plat-playstation": BsPlaystation,
  "plat-nintendo": BsNintendoSwitch,
  "plat-xbox": BsXbox,
  "plat-pc": BsWindows,
}

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export default function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = name ? icons[name] : null

  if (!IconComponent) return null

  return (
    <IconComponent
      size={size}
      className={`shrink-0 text-text-dark ${className}`}
    />
  )
}

export type IconName = keyof typeof icons
