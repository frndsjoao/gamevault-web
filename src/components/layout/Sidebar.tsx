import { useState } from 'react'
import Icon, { IconName } from '../common/Icon'
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useUser } from '@/store/user';
import { useAppNavigate } from '@/hooks/useNavigation';
import { toast } from 'react-toastify';

interface NavOptionsProps {
  icon: IconName;
  label: string;
  active?: boolean;
  onPress: () => void;
  disabled?: boolean;
  message?: string;
}

interface SidebarNavProps {
  group: string;
  nav: NavOptionsProps[]
}



interface SidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (arg: boolean) => void;
}

export default function Sidebar({ sidebarOpen = false, setSidebarOpen }: SidebarProps = {}) {

  const navItems: SidebarNavProps[] = [
    {
      group: "", nav: [
        { icon: "home", onPress: () => { }, label: 'Home', active: true },
      ]
    },
    {
      group: "Games", nav: [
        { icon: "whishlist", onPress: () => { }, label: 'Backlog' },
        { icon: "gamepad", onPress: () => { }, label: 'Playing' },
        { icon: "square-check", onPress: () => { }, label: 'Finished' },
      ]
    },
    {
      group: "Your Account", nav: [
        { icon: "chart", onPress: () => { }, label: 'Activity', disabled: true, message: "Soon..." },
      ]
    },
  ];

  return (
    <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed flex flex-col py-6 p-4 h-screen inset-y-0 left-0 z-50 w-72 bg-bg-dark transition-transform duration-300 lg:translate-x-0`}>
      <SidebarHeader setSidebarOpen={setSidebarOpen} />

      <nav className="flex-1 space-y-2 overflow-y-auto">
        {navItems.map((item, idx) => (
          <div key={idx} className={item.group && "pt-4 space-y-1"}>
            <span className="text-sm font-semibold text-text-medium">{item.group}</span>

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

function SidebarHeader({ setSidebarOpen }: { setSidebarOpen?: (arg: boolean) => void }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-text-light">Gamevault</h1>

      <button onClick={() => setSidebarOpen?.(false)} className="lg:hidden">
        <Icon name='close' size={24} />
      </button>
    </div>
  )
}

function SidebarButton({ item }: { item: NavOptionsProps }) {
  return (
    <button
      disabled={item.disabled}
      className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-colors ease-in-out duration-300 disabled:hover:bg-transparent disabled:cursor-not-allowed ${item.active
        ? 'bg-btn-light'
        : 'bg-transparent hover:bg-btn-dark'
        }`}
    >
      <div className='flex items-center'>
        <Icon name={item.icon} size={16} className={`${item.disabled && "text-text-medium"} ${item.active ? "text-text-dark" : "text-text-light"} mr-2`} />
        <span className={`${item.disabled && "text-text-medium"} ${item.active ? "text-text-dark" : "text-text-light"} text-sm font-normal`}>{item.label}</span>
      </div>
      {item.message && (
        <span className="text-xs font-normal text-text-medium">{item.message}</span>
      )}
    </button>
  )
}

function SidebarUser() {
  const navigate = useAppNavigate()
  const { clearUser, user } = useUser(state => state)

  const handleLogout = () => {
    toast("You're now logged out. See you later", { type: "default" })
    localStorage.clear()
    clearUser()
    navigate("/signin")
  }

  return (
    <div className='w-full rounded-lg bg-transparent px-4 py-3 transition-colors duration-300 ease-in-out hover:bg-btn-dark'>
      <div className='flex items-center space-x-4'>
        <div className='rounded-full bg-white p-2 opacity-30'>
          <Icon name='user' size={20} />
        </div>

        <div className='flex w-full min-w-0 flex-1 flex-col'>
          <p className='truncate text-sm font-medium text-text-light'>{user?.name}</p>
          <p className='truncate text-xs font-normal text-text-medium'>{user?.email}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='hover:cursor-pointer'>
              <Icon name='ellipsis' className='ml-auto text-text-light' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" sideOffset={4} className="w-56">
            <DropdownMenuLabel className='text-base font-semibold'>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-border' />
            <DropdownMenuItem onClick={handleLogout} className='rounded-lg hover:cursor-pointer hover:bg-gray-700'>
              <Icon name='logout' className='text-text-medium' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
