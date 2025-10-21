import { IGame } from '@/@types/game'
import ModalContainer from './Modal'
import { GameModalContent } from './GameModalContent'

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  game: IGame
}

export default function GameModal({ isOpen, onClose, game }: GameModalProps) {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <GameModalContent game={game} />
    </ModalContainer>
  )
}


