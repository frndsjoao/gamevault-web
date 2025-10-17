import Icon from "./Icon";

interface RatingProps {
  rating: number;
  size?: number;
  className?: string;
}

const roundToHalf = (value: number): number => {
  return Math.round(value * 2) / 2;
};

export default function Rating({ rating, size = 16, className = "" }: RatingProps) {
  const clampedRating = Math.min(Math.max(rating, 0), 5);
  const roundedRating = roundToHalf(clampedRating);

  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex flex-row items-center space-x-3 ${className}`}>
      <div className="flex flex-row items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, index) => (
          <Icon key={`full-${index}`} name="star" size={size} className="fill-text-light text-text-light" />
        ))}

        {hasHalfStar && (
          <Icon name="star-half" size={size} className="text-text-fill-text-light fill-text-light" />
        )}

        {Array.from({ length: emptyStars }).map((_, index) => (
          <Icon key={`empty-${index}`} name="star" size={size} className="text-gray-600" />
        ))}
      </div>

      <span className="pt-0.5 text-xs text-text-medium">{roundedRating.toFixed(1)}</span>
    </div>
  );
}
