import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import confetti from "canvas-confetti"

export interface ConfettiRef {
  fire: (options?: confetti.Options) => void
}

interface ConfettiProps {
  className?: string
}

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>(
  ({ className }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const confettiInstance = useRef<confetti.CreateTypes | null>(null)

    useEffect(() => {
      if (!canvasRef.current) return

      confettiInstance.current = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      })

      return () => {
        confettiInstance.current = null
      }
    }, [])

    const fire = useCallback((options: confetti.Options = {}) => {
      if (!confettiInstance.current) return

      const defaultOptions: confetti.Options = {
        particleCount: 100,
        spread: 70,
        origin: { y: 1.0, x: 0.5 }, // Start from bottom center
        angle: 90, // Shoot upwards
        startVelocity: 60,
        gravity: 0.8,
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

      confettiInstance.current({
        ...defaultOptions,
        ...options,
      })
    }, [])

    useImperativeHandle(ref, () => ({
      fire,
    }))

    return (
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      />
    )
  },
)

Confetti.displayName = "Confetti"
