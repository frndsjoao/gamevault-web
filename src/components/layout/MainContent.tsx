import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react'
import Icon from '../common/Icon';
import { useUser } from '@/store/user';
import { getUserToken } from '@/utils/utils';
import { useProfileQuery } from '@/hooks/queries/useProfile';

const SearchGameModal = lazy(() => import('./Modals/SearchGameModal'));

interface MainContentProps {
  children: React.ReactNode;
  setSidebarOpen: (arg: boolean) => void
}

export default function MainContent({ children, setSidebarOpen }: MainContentProps) {
  const accessToken = getUserToken()
  const setUser = useUser(state => state.setUser)
  const user = useUser(state => state.user)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const { data } = useProfileQuery({ enabled: !!accessToken && !user })

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data, setUser])

  const handleSearchOpen = useCallback(() => setIsSearchModalOpen(true), [])
  const handleSearchClose = useCallback(() => setIsSearchModalOpen(false), [])

  return (
    <div className='flex h-screen flex-1 flex-col overflow-x-hidden bg-bg-dark p-2 md:p-3 lg:ml-72 lg:p-4'>
      <div className='flex flex-1 flex-col overflow-hidden rounded-lg bg-bg-darkest md:rounded-xl'>
        <MainContentHeader setSidebarOpen={setSidebarOpen} onSearchClick={handleSearchOpen} />

        <main className='flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 md:px-4 md:py-3 lg:px-6 lg:py-4'>
          <div className='flex flex-col gap-6 md:gap-8'>
            {children}
          </div>
        </main>
      </div>

      {isSearchModalOpen && (
        <Suspense fallback={null}>
          <SearchGameModal isOpen={isSearchModalOpen} onClose={handleSearchClose} />
        </Suspense>
      )}
    </div>
  )
}

const MainContentHeader = React.memo((
  { setSidebarOpen, onSearchClick }: { setSidebarOpen: (arg: boolean) => void, onSearchClick: () => void }
) => {
  const name = useUser(state => state.user?.name)
  const firstName = name?.split(" ")[0]

  const handleSidebarToggle = useCallback(() => setSidebarOpen(true), [setSidebarOpen])

  return (
    <header className='flex flex-shrink-0 flex-row items-center justify-between border-b-2 border-bg-dark bg-transparent px-3 py-3 md:px-4 md:py-3.5 lg:px-6 lg:py-4'>
      <div className='flex flex-row items-center gap-2 max-lg:space-x-2 md:gap-2.5 lg:gap-0'>
        <button onClick={handleSidebarToggle} className="lg:hidden">
          <Icon name='panel' className='text-text-light' />
        </button>
        <h1 className='truncate text-base font-bold text-text-light md:text-lg lg:text-xl'>Welcome back, {firstName}</h1>
      </div>

      <button onClick={onSearchClick} className='flex flex-row items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors duration-200 hover:bg-gray-900 active:scale-95 md:gap-3 md:px-3 md:py-2 lg:px-4'>
        <Icon name='search' size={16} className='text-text-light' />
        <span className='text-xs text-text-light max-md:hidden md:text-sm'>Search game</span>
      </button>
    </header>
  )
})
