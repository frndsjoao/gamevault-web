import { useState } from 'react'
import Icon, { IconName } from '../common/Icon'
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface SidebarNavOptionsProps {
  icon: IconName;
  label: string;
  active?: boolean;
  onPress: () => void;
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems: SidebarNavOptionsProps[] = [
    { icon: "eye", onPress: () => { }, label: 'Dashboard', active: true },
    { icon: "eye", onPress: () => { }, label: 'Orders' },
    { icon: "eye", onPress: () => { }, label: 'Products' },
    { icon: "eye", onPress: () => { }, label: 'Customers' },
    { icon: "eye", onPress: () => { }, label: 'Analytics' },
  ];

  return (
    <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col py-6 p-4 h-screen fixed inset-y-0 left-0 z-50 w-72 bg-bg-dark transition-transform duration-300 lg:translate-x-0 lg:static`}>
      <SidebarHeader setSidebarOpen={setSidebarOpen} />

      <nav className="flex-1 space-y-2">
        {navItems.map((item, idx) => (
          <SidebarButton key={idx} item={item} />
        ))}
      </nav>

      <SidebarUser />
    </aside>
  )
}

function SidebarHeader({ setSidebarOpen }: { setSidebarOpen: (arg: boolean) => void }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-xl font-bold text-text-light">Gamevault</h1>

      <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
        <Icon name='close' size={24} />
      </button>
    </div>
  )
}

function SidebarButton({ item }: { item: SidebarNavOptionsProps }) {
  return (
    <button
      className={`flex items-center w-full px-4 py-2 rounded-lg transition-all ${item.active
        ? 'bg-btn-light'
        : 'bg-transparent hover:bg-btn-dark'
        }`}
    >
      <Icon name={item.icon} size={16} className={`${item.active ? "text-text-dark" : "text-text-light"} mr-2`} />
      <span className={`${item.active ? "text-text-dark" : "text-text-light"} text-sm font-normal`}>{item.label}</span>
    </button>
  )
}

function SidebarUser() {
  const username = "Fulano de tal"
  const useremail = "testetestetestetesteteste@gmail.com"

  const handleLogout = () => {
    console.log('Logout clicked')
  }

  return (
    <div className='w-full rounded-lg bg-transparent px-4 py-3 transition-all hover:bg-btn-dark'>
      <div className='flex items-center space-x-4'>
        <div className='rounded-full bg-white p-2 opacity-30'>
          <Icon name='user' size={20} />
        </div>

        <div className='flex w-full min-w-0 flex-1 flex-col'>
          <p className='truncate text-sm font-medium text-text-light'>{username}</p>
          <p className='truncate text-xs font-normal text-text-medium'>{useremail}</p>
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
