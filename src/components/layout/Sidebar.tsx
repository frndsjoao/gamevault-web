import Icon from "../common/Icon"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useUser } from "@/store/user"
import { useAppNavigate } from "@/hooks/useNavigation"
import { toast } from "react-toastify"
import { storage } from "@/utils/localStorage"
import { useNavItems, NavOptionsProps } from "@/hooks/useNavItems"
import { APP_VERSION } from "@/constants/app"

interface SidebarProps {
  sidebarOpen?: boolean
  setSidebarOpen?: (arg: boolean) => void
}

export default function Sidebar({
  sidebarOpen = false,
  setSidebarOpen,
}: SidebarProps = {}) {
  const { navItems } = useNavItems()

  return (
    <aside
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed flex flex-col py-6 p-4 h-screen inset-y-0 left-0 z-50 w-72 bg-bg-dark transition-transform duration-300 lg:translate-x-0`}
    >
      <SidebarHeader setSidebarOpen={setSidebarOpen} />

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems.map((item, idx) => (
          <div key={idx} className={item.group && "pt-4 space-y-1"}>
            <span className="text-sm font-semibold text-text-medium">
              {item.group}
            </span>

            {item.nav.map((nav, index) => (
              <SidebarButton key={index} item={nav} />
            ))}
          </div>
        ))}
      </nav>

      <SidebarUser />
    </aside>
  )
}

function SidebarHeader({
  setSidebarOpen,
}: {
  setSidebarOpen?: (arg: boolean) => void
}) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-text-light">Gamevault</h1>

      <button onClick={() => setSidebarOpen?.(false)} className="lg:hidden">
        <Icon name="close" size={24} />
      </button>
    </div>
  )
}

function SidebarButton({ item }: { item: NavOptionsProps }) {
  return (
    <button
      onClick={item.onPress}
      disabled={item.disabled}
      className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors ease-in-out duration-300 disabled:hover:bg-transparent disabled:cursor-not-allowed ${
        item.active ? "bg-btn-light" : "bg-transparent hover:bg-btn-dark"
      }`}
    >
      <div className="flex items-center">
        <Icon
          name={item.icon}
          size={16}
          className={`${item.disabled && "text-text-medium"} ${item.active ? "text-text-dark" : "text-text-light"} mr-2`}
        />
        <span
          className={`${item.disabled && "text-text-medium"} ${item.active ? "text-text-dark" : "text-text-light"} text-sm font-normal`}
        >
          {item.label}
        </span>
      </div>
      {item.message && (
        <span className="text-xs font-normal text-text-medium">
          {item.message}
        </span>
      )}
    </button>
  )
}

function SidebarUser() {
  const navigate = useAppNavigate()
  const { clearUser, user } = useUser((state) => state)

  const handleLogout = () => {
    toast("You're now logged out. See you later", { type: "default" })
    storage.removeToken()
    clearUser()
    navigate("/signin")
  }

  return (
    <div className="w-full rounded-lg bg-transparent px-4 py-3 transition-colors duration-300 ease-in-out hover:bg-btn-dark">
      <div className="flex items-center space-x-4">
        {user?.avatar ? (
          <div className="h-10 w-10 rounded-full shadow-lg">
            <img
              src={user.avatar}
              alt="Profile icon"
              loading="lazy"
              decoding="async"
              className="h-10 w-10 rounded-full object-cover shadow-lg"
            />
          </div>
        ) : (
          <div className="rounded-full bg-white p-2 opacity-30">
            <Icon name="user" size={24} />
          </div>
        )}

        <div className="flex w-full min-w-0 flex-1 flex-col">
          <p className="truncate text-sm font-medium text-text-light">
            {user?.name}
          </p>
          <p className="truncate text-xs font-normal text-text-medium">
            {user?.email}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:cursor-pointer">
              <Icon name="ellipsis" className="ml-auto text-text-light" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="end"
            sideOffset={4}
            className="w-56"
          >
            <DropdownMenuLabel className="flex flex-row items-center justify-between">
              <p className="text-base font-semibold">Settings</p>
              <p className="text-xs font-normal text-gray-400">
                v{APP_VERSION}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="rounded-lg hover:cursor-pointer hover:bg-gray-700"
            >
              <Icon name="logout" className="text-text-medium" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
