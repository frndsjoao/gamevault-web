import { useState } from 'react'
import ModalContainer from './Modal'
import Input from '../Input'
import { GameModalContent } from './GameModal'

interface Game {
  id: number
  name: string
  image: string
}

interface SearchGameModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchByNameProps {
  setSearchTerm: (arg: string) => void
  searchTerm: string
  filteredGames: Game[]
  handleGameSelect: (game: Game) => void
}

const mockGames: Game[] = [
  { id: 1, name: 'The Witcher 3: Wild Hunt', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
  { id: 2, name: 'Cyberpunk 2077', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
  { id: 3, name: 'Red Dead Redemption 2', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
  { id: 4, name: 'God of War', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
  { id: 5, name: 'Elden Ring', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
  { id: 6, name: 'Baldur\'s Gate 3', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
  { id: 7, name: 'Hollow Knight', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
  { id: 8, name: 'Stardew Valley', image: "https://images.igdb.com/igdb/image/upload/t_cover_big/coaarl.jpg" },
]

export default function SearchGameModal({ isOpen, onClose }: SearchGameModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isSliding, setIsSliding] = useState(false)

  const filteredGames = mockGames.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleGameSelect = (game: Game) => {
    setIsSliding(true)
    setTimeout(() => {
      setSelectedGame(game)
    }, 150)
  }

  const handleBackToSearch = () => {
    setIsSliding(false)
    setTimeout(() => {
      setSelectedGame(null)
    }, 150)
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      goBack={!!selectedGame ? handleBackToSearch : undefined}
      title="Search game:"
    >
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{
          transform: isSliding ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        <SearchByName
          filteredGames={filteredGames}
          handleGameSelect={handleGameSelect}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <GameModalContent game={{ image: selectedGame?.image ?? "", name: selectedGame?.name ?? "" }} />
      </div>
    </ModalContainer>

  )
}

function SearchByName({ setSearchTerm, searchTerm, filteredGames, handleGameSelect }: SearchByNameProps) {
  return (
    <div className="flex h-[50vh] md:h-[55vh] lg:h-[60vh] min-w-full flex-col p-3 md:p-4 lg:p-6">
      <div className='mb-3 md:mb-4'>
        <Input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          icon="search"
          placeholder='Enter the name of the game...'
          className=''
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameSelect(game)}
                className="w-full rounded-lg bg-gray-800 px-3 py-2.5 md:px-4 md:py-3 text-left text-sm md:text-base text-text-light transition-all duration-200 hover:bg-gray-700 hover:shadow-md active:scale-[0.98]"
              >
                {game.name}
              </button>
            ))
          ) : (
            <p className="py-6 md:py-8 text-center text-sm md:text-base text-gray-500">Nenhum jogo encontrado</p>
          )}
        </div>
      </div>
    </div>
  )
}