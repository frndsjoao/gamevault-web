import ModalContainer from './Modal'

interface Game { name: string; image: string }
interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  game: Game
}

export default function GameModal({ isOpen, onClose, game }: GameModalProps) {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <GameModalContent game={game} />
    </ModalContainer>
  )
}

export function GameModalContent({ game }: { game: Game }) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4 p-3 md:p-4 lg:p-6">
      <img
        src={game.image}
        alt={game.name}
        className="max-h-48 md:max-h-72 lg:max-h-96 w-auto rounded-lg object-cover shadow-lg"
      />
      <h2 className="text-center text-lg md:text-xl lg:text-2xl font-bold text-text-light">{game.name}</h2>
    </div>
  )
}
