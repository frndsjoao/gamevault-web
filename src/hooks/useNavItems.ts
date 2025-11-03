import { useLocation } from "react-router-dom"
import { useAppNavigate } from "./useNavigation"
import { IconName } from "@/components/common/Icon"

export interface NavOptionsProps {
  icon: IconName
  label: string
  active?: boolean
  onPress: () => void
  disabled?: boolean
  message?: string
}

export interface SidebarNavProps {
  group: string
  nav: NavOptionsProps[]
}

export function useNavItems() {
  const navigate = useAppNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  const currentFilter = location.state?.filter

  const navItems: SidebarNavProps[] = [
    {
      group: "",
      nav: [
        {
          icon: "home",
          onPress: () => navigate("/dashboard"),
          label: "Home",
          active: currentPath === "/dashboard",
        },
      ],
    },
    {
      group: "Games",
      nav: [
        {
          icon: "whishlist",
          onPress: () => navigate("/games", { state: { filter: "Backlog" } }),
          label: "Backlog",
          active: currentPath === "/games" && currentFilter === "Backlog",
        },
        {
          icon: "gamepad",
          onPress: () => navigate("/games", { state: { filter: "Playing" } }),
          label: "Playing",
          active: currentPath === "/games" && currentFilter === "Playing",
        },
        {
          icon: "square-check",
          onPress: () => navigate("/games", { state: { filter: "Finished" } }),
          label: "Finished",
          active: currentPath === "/games" && currentFilter === "Finished",
        },
        {
          icon: "ban",
          onPress: () => navigate("/games", { state: { filter: "Abandoned" } }),
          label: "Abandoned",
          active: currentPath === "/games" && currentFilter === "Abandoned",
        },
      ],
    },
    {
      group: "Your Account",
      nav: [
        {
          icon: "chart",
          onPress: () => {},
          label: "Activity",
          disabled: true,
          message: "Soon...",
        },
      ],
    },
  ]

  return { navItems }
}
