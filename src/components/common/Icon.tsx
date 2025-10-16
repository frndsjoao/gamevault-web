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
} from "lucide-react";

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
  squareCheck: SquareCheckBig,
  chart: ChartLine,
  home: House,
  panel: PanelLeft
};

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export default function Icon({ name, size = 20, className = "shrink-0 text-text-dark" }: IconProps) {
  const IconComponent = name ? icons[name] : null;

  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} />;
}

export type IconName = keyof typeof icons;