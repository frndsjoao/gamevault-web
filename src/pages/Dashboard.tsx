import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';
import GameCard from '@/components/common/GameCard';
import Carousel from '@/components/common/Carousel';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const array = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className='flex flex-row overflow-x-hidden'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MainContent setSidebarOpen={setSidebarOpen}>
        <Carousel title="My Games">
          {array.map(card => (
            <GameCard key={card} />
          ))}
        </Carousel>
        <Carousel title="My Games">
          {array.map(card => (
            <GameCard key={card} />
          ))}
        </Carousel>
        <Carousel title="My Games">
          {array.map(card => (
            <GameCard key={card} />
          ))}
        </Carousel>
      </MainContent>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}