import { useState } from 'react'
import Icon from './Icon'
import Rating from './Rating'
import GameModal from '../layout/Modals/GameModal'
import { GameStatusType } from '@/@types/game'

interface StatusOptionsProps {
  activeColumn?: "Playing" | "Backlog" | "Completed"
  active?: GameStatusType
}

export default function GameCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const game = {
    name: "The witcher 3: Wild Hunt GOTY Premium Edition",
    platform: "Playstation",
    rating: 5,
    platinum: false,
    imgurl: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg",
    status: "Playing"
  }

  return (
    <>
      <div className='relative w-48 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-gray-900 md:w-56 lg:w-64'>
        <div className='aspect-[3/4] max-h-72 w-full overflow-hidden'>
          <img
            className="h-full w-full cursor-pointer rounded-t-lg object-cover object-center transition-transform duration-300 hover:scale-105"
            src={game.imgurl}
            alt={`${game.name} cover`}
            loading='lazy'
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className='px-2 py-2 md:px-3'>
          <div className='mb-2 flex flex-row items-center justify-between gap-1'>
            <p className='truncate text-sm font-medium text-text-light md:text-base'>{game.name}</p>
            <Icon name="plat-playstation" size={14} className='flex-shrink-0 text-text-light md:size-4' />
          </div>

          <Rating rating={4} />

          {game.status && (
            <StatusOptions activeColumn="Playing" active="Playing" />
          )}
        </div>
      </div>

      <GameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        game={{ image: game.imgurl, name: game.name }}
      />
    </>
  )
}

function StatusOptions({ activeColumn, active }: StatusOptionsProps) {
  const status = ["Backlog", "Playing", "Completed"]

  const filteredStatusByColumn = () => {
    if (activeColumn === "Completed") return [];

    return status.filter((item) => {
      if (activeColumn === "Playing") return item !== "Backlog";
      return true;
    });
  }

  return (
    <div className='mb-1 mt-2 flex w-full flex-row flex-wrap items-center gap-1 md:mb-2 md:mt-3'>
      {filteredStatusByColumn().map((item) => (
        <button
          key={item}
          className={`rounded-md border border-border px-1.5 py-0.5 transition-colors duration-300 ease-in-out hover:bg-btn-dark active:scale-95 md:px-2 md:py-1 ${active === item ? "bg-btn-light hover:bg-btn-light" : "bg-transparent"}`}
          onClick={() => { }}
        >
          <p className={`text-[10px] md:text-xs ${active === item ? "text-text-dark" : "text-text-light"}`}>{item}</p>
        </button>
      ))}
    </div>
  )

}
