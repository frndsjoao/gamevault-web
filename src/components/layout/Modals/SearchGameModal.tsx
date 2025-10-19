import { useState, useEffect } from 'react'
import ModalContainer from './Modal'
import { GameModalContent } from './GameModal'
import Input from '@/components/common/Input'
import { useSearchGameQuery } from '@/hooks/queries/useSearchGame'

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
  isLoading: boolean
}

export default function SearchGameModal({ isOpen, onClose }: SearchGameModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 1500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data, isLoading } = useSearchGameQuery({ name: debouncedSearch }, {
    enabled: debouncedSearch.length >= 3
  })

  const filteredGames: Game[] = data?.games.map(game => ({
    id: game.id,
    name: game.name,
    image: game.cover
  })) || []

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
          isLoading={isLoading}
        />

        <GameModalContent game={{ image: selectedGame?.image ?? "", name: selectedGame?.name ?? "" }} />
      </div>
    </ModalContainer>
  )
}

function SearchByName({
  setSearchTerm,
  searchTerm,
  filteredGames,
  handleGameSelect,
  isLoading
}: SearchByNameProps) {
  return (
    <div className="flex h-[50vh] min-w-full flex-col p-3 md:h-[55vh] md:p-4 lg:h-[60vh] lg:p-6">
      <div className='mb-3 md:mb-4'>
        <Input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          icon="search"
          placeholder='Enter the name of the game...'
          className=''
        />
        {searchTerm.length > 0 && searchTerm.length < 3 && (
          <p className="mt-1 text-xs text-gray-500">
            Digite pelo menos 3 caracteres para buscar
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {isLoading ? (
            <p className="py-6 text-center text-sm text-gray-500 md:py-8 md:text-base">
              Buscando...
            </p>
          ) : filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameSelect(game)}
                className="w-full rounded-lg bg-gray-800 px-3 py-2.5 text-left text-sm text-text-light transition-all duration-200 hover:bg-gray-700 hover:shadow-md active:scale-[0.98] md:px-4 md:py-3 md:text-base"
              >
                {game.name}
              </button>
            ))
          ) : searchTerm.length >= 3 ? (
            <p className="py-6 text-center text-sm text-gray-500 md:py-8 md:text-base">
              Nenhum jogo encontrado
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}