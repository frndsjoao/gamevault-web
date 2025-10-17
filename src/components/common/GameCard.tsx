import { IGameStatus } from '@/types/gameStatus.types'
import Icon from './Icon'
import Rating from './Rating'

interface StatusOptionsProps {
  activeColumn?: "Playing" | "Backlog" | "Completed"
  active?: IGameStatus
}

export default function GameCard() {
  const game = {
    name: "The witcher 3: Wild Hunt GOTY Premium Edition",
    platform: "Playstation",
    rating: 5,
    platinum: false,
    imgurl: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg",
    status: "Playing"
  }

  return (
    <div className='relative w-60 rounded-lg border border-border bg-gray-900'>
      <img
        className="h-64 w-60 rounded-t-lg object-cover"
        src={game.imgurl}
        alt={`${game.name} cover`}
        loading='lazy'
      />

      <div className='px-3 py-2'>
        <div className='mb-2 flex flex-row items-center justify-between gap-1'>
          <p className='text-base font-medium text-text-light'>{game.name}</p>
          <Icon name="playstation" size={16} className='text-text-light' />
        </div>

        <Rating rating={4} />

        {game.status && (
          <StatusOptions activeColumn="Playing" active="Playing" />
        )}
      </div>
    </div>
  )
}



function StatusOptions({ activeColumn, active }: StatusOptionsProps) {
  const status = ["Backlog", "Playing", "On Hold", "Completed"]

  const filteredStatusByColumn = () => {
    if (activeColumn === "Completed") return [];

    return status.filter((item) => {
      if (activeColumn === "Backlog") return item !== "On Hold";
      if (activeColumn === "Playing") return item !== "Backlog";
      return true;
    });
  }

  return (
    <div className='mb-2 mt-3 flex w-full flex-row items-center gap-1'>
      {filteredStatusByColumn().map((item) => (
        <button
          className={`rounded-md border border-border px-2 py-1 hover:bg-btn-dark transition-colors duration-300 ease-in-out ${active === item ? "bg-btn-light hover:bg-btn-light" : "bg-transparent"}`}
          onClick={() => { }}
        >
          <p className={`text-xs ${active === item ? "text-text-dark" : "text-text-light"}`}>{item}</p>
        </button>
      ))}
    </div>
  )

}
