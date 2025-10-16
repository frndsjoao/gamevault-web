import React from 'react'
import Icon from '../common/Icon';

interface MainContentProps {
  children: React.ReactNode;
  header: string;
}

export default function MainContent({ children, header }: MainContentProps) {
  return (
    <div className='flex h-screen flex-1 flex-col bg-bg-dark p-4 lg:ml-72'>
      <div className='flex flex-1 flex-col overflow-hidden rounded-xl bg-bg-darkest'>
        <MainContentHeader header={header} />

        <main className='flex flex-1 flex-col overflow-y-auto px-6 py-4'>
          {children}
        </main>
      </div>
    </div>
  )
}

function MainContentHeader({ header }: { header: string }) {
  return (
    <header className='flex flex-shrink-0 flex-row items-center justify-between border-b-2 border-bg-dark bg-transparent px-6 py-4'>
      <h1 className='text-xl font-bold text-text-light'>{header}</h1>

      <button className='flex flex-row items-center space-x-3 rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-900'>
        <Icon name='search' size={16} className='text-text-light' />
        <span className='text-sm text-text-light'>Search game</span>
      </button>
    </header>
  )
}
