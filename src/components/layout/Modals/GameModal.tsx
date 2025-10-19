import ModalContainer from './Modal'

interface Game { name: string | undefined; image: string | undefined }
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
    <div className="flex flex-col items-center gap-3 p-3 md:gap-4 md:p-4 lg:p-6">
      <img
        src={game.image}
        alt={game.name}
        className="max-h-48 w-auto rounded-lg object-cover shadow-lg md:max-h-72 lg:max-h-96"
      />
      <h2 className="text-center text-lg font-bold text-text-light md:text-xl lg:text-2xl">{game.name}</h2>
    </div>
  )
}
