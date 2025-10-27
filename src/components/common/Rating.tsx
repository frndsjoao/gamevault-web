import { useState } from "react"
import Icon from "./Icon"

interface RatingProps {
  rating: number
  size?: number
  className?: string
  enabled?: boolean
  onChange?: (rating: number) => void
}

const roundToHalf = (value: number): number => {
  return Math.round(value * 2) / 2
}

export default function Rating({
  rating,
  size = 16,
  className = "",
  enabled = false,
  onChange,
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null)

  const clampedRating = Math.min(Math.max(rating, 0), 5)
  const roundedRating = roundToHalf(clampedRating)

  const displayRating = hoveredRating !== null ? hoveredRating : roundedRating
  const fullStars = Math.floor(displayRating)
  const hasHalfStar = displayRating % 1 >= 0.5

  const handleStarClick = (
    starIndex: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (enabled && onChange) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const isHalf = x < rect.width / 2
      onChange(starIndex + (isHalf ? 0.5 : 1))
    }
  }

  const handleStarHover = (
    starIndex: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (enabled) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const isHalf = x < rect.width / 2
      setHoveredRating(starIndex + (isHalf ? 0.5 : 1))
    }
  }

  const handleMouseLeave = () => {
    if (enabled) {
      setHoveredRating(null)
    }
  }

  return (
    <div className={`flex flex-row items-center space-x-3 ${className}`}>
      <div
        className="flex flex-row items-center gap-0.5"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const isFilled = index < fullStars
          const isHalf = index === fullStars && hasHalfStar

          return (
            <div
              key={index}
              onClick={(e) => handleStarClick(index, e)}
              onMouseMove={(e) => handleStarHover(index, e)}
              className={enabled ? "cursor-pointer" : ""}
            >
              {isHalf ? (
                <Icon
                  name="star-half"
                  size={size}
                  className="fill-text-light text-text-light"
                />
              ) : (
                <Icon
                  name="star"
                  size={size}
                  className={
                    isFilled
                      ? "fill-text-light text-text-light"
                      : "fill-none !text-gray-600"
                  }
                />
              )}
            </div>
          )
        })}
      </div>

      {Number(displayRating.toFixed(1)) > 0 && (
        <span className="pt-0.5 text-xs text-text-medium">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
