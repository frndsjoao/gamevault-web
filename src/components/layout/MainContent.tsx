import React, { useEffect, useState } from 'react'
import Icon from '../common/Icon';
import { useUser } from '@/store/user';
import { getUserToken } from '@/lib/utils';
import { useProfileQuery } from '@/hooks/queries/useProfile';
import SearchGameModal from '../common/Modals/SearchGameModal';

interface MainContentProps {
  children: React.ReactNode;
  setSidebarOpen: (arg: boolean) => void
}

export default function MainContent({ children, setSidebarOpen }: MainContentProps) {
  const accessToken = getUserToken()
  const { setUser, user } = useUser(state => state)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const { data } = useProfileQuery({ enabled: !!accessToken && !user })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  return (
    <div className='flex h-screen flex-1 flex-col bg-bg-dark p-4 lg:ml-72'>
      <div className='flex flex-1 flex-col overflow-hidden rounded-xl bg-bg-darkest'>
        <MainContentHeader setSidebarOpen={setSidebarOpen} onSearchClick={() => setIsSearchModalOpen(true)} />

        <main className='flex flex-1 flex-col overflow-y-auto px-6 py-4'>
          {children}
        </main>
      </div>

      <SearchGameModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </div>
  )
}

function MainContentHeader({ setSidebarOpen, onSearchClick }: { setSidebarOpen: (arg: boolean) => void, onSearchClick: () => void }) {
  const name = useUser(state => state.user?.name)
  const firstName = name?.split(" ")[0]

  return (
    <header className='flex flex-shrink-0 flex-row items-center justify-between border-b-2 border-bg-dark bg-transparent px-6 py-4'>
      <div className='flex flex-row items-center max-lg:space-x-2'>
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
          <Icon name='panel' className='text-text-light' />
        </button>
        <h1 className='text-lg font-bold text-text-light lg:text-xl'>Welcome back, {firstName}</h1>
      </div>

      <button onClick={onSearchClick} className='flex flex-row items-center space-x-3 rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-900'>
        <Icon name='search' size={16} className='text-text-light' />
        <span className='text-sm text-text-light max-lg:hidden'>Search game</span>
      </button>
    </header>
  )
}
