import { forwardRef, useCallback, useImperativeHandle } from "react"
import confetti from "canvas-confetti"

export interface ConfettiRef {
  fire: (options?: confetti.Options) => void
}

interface ConfettiProps {
  className?: string
}

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>((_, ref) => {
  const fire = useCallback((options: confetti.Options = {}) => {
    const defaultOptions: confetti.Options = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      startVelocity: 45,
      gravity: 1,
      ticks: 200,
      colors: [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#FFA07A",
        "#98D8C8",
        "#FFD93D",
        "#6C5CE7",
        "#A8E6CF",
      ],
    }

    confetti({
      ...defaultOptions,
      ...options,
      angle: 60,
      origin: { x: 0.3, y: 0.6 },
    })

    confetti({
      ...defaultOptions,
      ...options,
      angle: 120,
      origin: { x: 0.7, y: 0.6 },
    })
  }, [])

  useImperativeHandle(ref, () => ({
    fire,
  }))

  return null
})

Confetti.displayName = "Confetti"
