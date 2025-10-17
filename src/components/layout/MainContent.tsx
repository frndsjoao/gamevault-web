import React from 'react'
import Icon from '../common/Icon';
import { IUser } from '@/types/user.types';

interface MainContentProps {
  children: React.ReactNode;
  user: IUser;
  setSidebarOpen: (arg: boolean) => void
}

export default function MainContent({ children, user, setSidebarOpen }: MainContentProps) {
  return (
    <div className='flex h-screen flex-1 flex-col bg-bg-dark p-4 lg:ml-72'>
      <div className='flex flex-1 flex-col overflow-hidden rounded-xl bg-bg-darkest'>
        <MainContentHeader username={user.name} setSidebarOpen={setSidebarOpen} />

        <main className='flex flex-1 flex-col overflow-y-auto px-6 py-4'>
          {children}
        </main>
      </div>
    </div>
  )
}

function MainContentHeader({ username, setSidebarOpen }: { username: string; setSidebarOpen: (arg: boolean) => void }) {
  const name = username.split(' ')[0]

  return (
    <header className='flex flex-shrink-0 flex-row items-center justify-between border-b-2 border-bg-dark bg-transparent px-6 py-4'>
      <div className='flex flex-row items-center max-lg:space-x-2'>
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <Icon name='panel' className='text-text-light' />
        </button>
        <h1 className='text-lg font-bold text-text-light lg:text-xl'>Welcome back, {name}</h1>
      </div>

      <button className='flex flex-row items-center space-x-3 rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-900'>
        <Icon name='search' size={16} className='text-text-light' />
        <span className='text-sm text-text-light max-lg:hidden'>Search game</span>
      </button>
    </header>
  )
}
