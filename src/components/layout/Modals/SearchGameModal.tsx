import { useState, useEffect, useCallback } from 'react'
import ModalContainer from './Modal'
import Input from '@/components/common/Input'
import { useSearchGameQuery } from '@/hooks/queries/useSearchGame'
import React from 'react'
import DumbGameCover from '@/components/common/DumbGameCover'
import { IGameSearchIGDB } from '@/@types/game'
import Select from '@/components/common/Select'
import Icon, { IconName } from '@/components/common/Icon'
import { platforms } from '@/utils/platforms'
import { GameModalContent } from './GameModalContent'

interface SearchGameModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchByNameProps {
  setSearchTerm: (arg: string) => void
  searchTerm: string
  gameList: IGameSearchIGDB[] | undefined
  handleGameSelect: (game: IGameSearchIGDB) => void
  isLoading: boolean
  setFilterPlatform: (arg: string) => void
  filterPlatform: string
}

const DEBOUNCE_TIMER = 800

export default function SearchGameModal({ isOpen, onClose }: SearchGameModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [debounceLoader, setDebounceLoader] = useState(false)
  const [selectedGame, setSelectedGame] = useState<IGameSearchIGDB | null>(null)
  const [isSliding, setIsSliding] = useState(false)
  const [filterPlatform, setFilterPlatform] = useState(platforms[0].id)

  const { data: gameList, isLoading } = useSearchGameQuery({
    name: debouncedSearch,
    platform: filterPlatform
  }, { enabled: debouncedSearch.length >= 3 })

  const handleGameSelect = useCallback((game: IGameSearchIGDB) => {
    setIsSliding(true)
    setTimeout(() => {
      setSelectedGame(game)
    }, 150)
  }, [])

  const handleBackToSearch = useCallback(() => {
    setIsSliding(false)
    setTimeout(() => {
      setSelectedGame(null)
    }, 150)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    setSearchTerm("")
    setSelectedGame(null)
    setDebouncedSearch("")
    setDebounceLoader(false)
    setIsSliding(false)
  }, [onClose])

  useEffect(() => {
    setDebounceLoader(true)
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setDebounceLoader(false)
    }, DEBOUNCE_TIMER)

    return () => clearTimeout(timer)
  }, [searchTerm])

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={handleClose}
      goBack={selectedGame ? handleBackToSearch : undefined}
      title="Search game:"
    >
      <div
        className="flex h-auto transition-transform duration-300 ease-in-out"
        style={{
          transform: isSliding ? 'translateX(-100%)' : 'translateX(0)',
        }}
      >
        <SearchByName
          gameList={gameList}
          handleGameSelect={handleGameSelect}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading || debounceLoader}
          setFilterPlatform={setFilterPlatform}
          filterPlatform={filterPlatform}
        />
        {selectedGame && (
          <GameModalContent game={selectedGame} platform={filterPlatform} />
        )}
      </div>
    </ModalContainer>
  )
}

const SearchByName = React.memo(({
  setSearchTerm,
  searchTerm,
  gameList,
  handleGameSelect,
  isLoading,
  filterPlatform,
  setFilterPlatform,
}: SearchByNameProps) => {

  return (
    <div className="flex h-[50vh] min-w-full flex-col p-3 md:p-4 lg:p-6">
      <div className='flex w-full flex-row items-start gap-3'>
        <div className='flex-1'>
          <Input
            type='text'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            icon="search"
            placeholder='Enter the name of the game...'
            description={(searchTerm.length > 0 && searchTerm.length < 3) ? "Digite pelo menos 3 caracteres para buscar" : ""}
          />
        </div>
        <Select
          setValue={setFilterPlatform}
          value={filterPlatform}
          placeholder='Platform'
          items={platforms}
          className='w-32'
        />
      </div>

      <div className="mt-3 flex-1 overflow-y-auto md:mt-4">
        <div className="space-y-2">
          {(isLoading && searchTerm.length >= 3) && (
            <p className="py-6 text-center text-sm text-gray-500 md:py-8 md:text-base">
              Buscando...
            </p>
          )}
          {(gameList && gameList.length > 0 && !isLoading && searchTerm.length >= 3) && (
            <>
              {gameList.map(game => (
                <GameSelectionBtn key={game.id} game={game} handleGameSelect={handleGameSelect} />
              ))}
            </>
          )}
          {(gameList && gameList.length === 0 && !isLoading && searchTerm.length >= 3) && (
            <p className="py-6 text-center text-sm text-gray-500 md:py-8 md:text-base">
              Game not found.
            </p>
          )}
        </div>
      </div>
    </div >
  )
})

const GameSelectionBtn = React.memo(({ game, handleGameSelect }: { game: IGameSearchIGDB, handleGameSelect: (game: IGameSearchIGDB) => void }) => {
  const handleClick = useCallback(() => {
    handleGameSelect(game)
  }, [game, handleGameSelect])

  return (
    <button
      key={game.id}
      onClick={handleClick}
      className="flex w-full flex-row items-center gap-4 rounded-lg bg-gray-800 px-2 py-2 text-left text-sm text-text-light transition-all duration-200 hover:bg-gray-700 hover:shadow-md active:scale-[0.98] md:px-3 md:py-2 md:text-base"
    >
      {game.cover ? (
        <img
          src={game.cover}
          alt={game.name}
          className="h-14 w-10 rounded object-cover shadow-lg md:max-h-72 lg:max-h-96"
        />
      ) : (
        <DumbGameCover className="h-14 w-10 rounded" />
      )}
      <div className=''>
        <p className='text-sm font-semibold text-text-light md:text-base'>{game.name} - {game.platforms[0].releaseDate}</p>
        {game.platforms.map((p, index) => {
          function getPlatformIcon(): IconName {
            return `plat-${p.id}` as IconName;
          }

          return (
            <Icon key={`${p}-${index}`} name={getPlatformIcon()} size={14} className='mr-3 inline text-text-medium' />
          )
        })}
      </div>
    </button>
  )
})

SearchByName.displayName = "SearchByName"
GameSelectionBtn.displayName = "GameSelectionBtn"