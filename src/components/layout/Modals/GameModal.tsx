import { IGame } from "@/@types/game"
import ModalContainer from "./Modal"
import { GameModalContent } from "./GameModalContent"

interface GameModalProps {
  isOpen: boolean
  onClose: () => void
  game: IGame
  update?: boolean
}

export default function GameModal({
  isOpen,
  onClose,
  game,
  update,
}: GameModalProps) {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <GameModalContent game={game} update={update} />
    </ModalContainer>
  )
}
