import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';
import GameCard from '@/components/common/GameCard';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex flex-row'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MainContent setSidebarOpen={setSidebarOpen}>
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4 xl:grid-cols-5'>
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>
      </MainContent>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}