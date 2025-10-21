import { IGame, IPlatform, PlatformId } from '@/@types/game'
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Icon, { IconName } from '@/components/common/Icon'
import Rating from '@/components/common/Rating';
import { gameStatus } from '@/utils/status';
import { useEffect, useState } from 'react';

interface SearchGameModalProps {
  game: IGame;
  platform?: PlatformId
}

export function GameModalContent({ game, platform }: SearchGameModalProps) {
  const getInitialPlatform = (): PlatformId => {
    if (platform && platform !== "all") return platform;
    if (game.selectedPlatform) return game.selectedPlatform;
    return game.platforms[0]?.id || "pc";
  };

  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>(getInitialPlatform());
  const [rating, setRating] = useState(game.rating || 0)
  const [platinum, setPlatinum] = useState(game.platinum)
  const [selectedStatus, setSelectedStatus] = useState<string>(game.status || "")
  const platformIcon = (platform: IPlatform) => `plat-${platform.id}` as IconName;

  const releaseDate = game.platforms.find(p => p.id === selectedPlatform)?.releaseDate;

  useEffect(() => {
    if (platform && platform !== "all") {
      setSelectedPlatform(platform);
    }
  }, [platform]);

  return (
    <div className="flex min-w-full flex-col items-center gap-3 p-2 md:gap-4 md:p-3 lg:p-4">
      <div className='flex w-full flex-row items-center gap-3 md:gap-6'>
        <img
          src={game.cover}
          alt={game.name}
          className="max-h-52 w-auto rounded-lg object-cover shadow-lg md:max-h-72 lg:max-h-96"
        />
        <div className='w-full space-y-6 text-start'>
          <h2 className="text-lg font-bold text-text-light md:text-xl lg:text-2xl">{game.name}</h2>
          <span className='text-sm text-text-light'>{releaseDate}</span>

          <div className='my-3 flex flex-row items-center gap-2'>
            {game.platforms.map(plat => {
              const isActive = selectedPlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  onClick={() => !isActive && setSelectedPlatform(plat.id)}
                  disabled={isActive}
                  className={`${isActive ? "border-btn-light bg-btn-light cursor-not-allowed" : "border-border hover:bg-gray-700 cursor-pointer"} rounded-md border p-2 md:p-3 transition-colors`}
                  aria-label={`Selecionar plataforma ${plat.name}`}
                >
                  <Icon name={platformIcon(plat)} size={20} className={isActive ? "text-text-dark" : 'text-text-light'} />
                </button>
              );
            })}
          </div>

          <div className='mt-4'>
            <span className='mb-2 text-sm font-medium text-text-medium'>Rating:</span>
            <Rating enabled rating={rating} size={20} onChange={setRating} />
            <div className='mt-6'>
              <Checkbox
                checked={platinum}
                onChange={(e) => setPlatinum(e.target.checked)}
                label="Platinum"
                icon="platinum"
              />
            </div>
          </div>
        </div>
      </div>

      <div className='w-full space-y-2'>
        <p className='text-base font-semibold text-text-medium'>Status:</p>
        <div className='flex w-full flex-wrap gap-2'>
          {gameStatus.map(status => {
            const isStatusActive = selectedStatus === status;
            return (
              <button
                key={status}
                onClick={() => !isStatusActive && setSelectedStatus(status)}
                disabled={isStatusActive}
                className={`${isStatusActive
                  ? "border-btn-light bg-btn-light text-text-dark cursor-not-allowed"
                  : "border-border text-text-light hover:bg-gray-700 cursor-pointer"
                  } rounded-md border px-4 py-2 transition-colors font-medium text-sm`}
                aria-label={`Selecionar status ${status}`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {selectedStatus === "Completed" && (
        <div></div>
      )}

      <div className='flex w-full flex-row items-end'>
        <Button label='Save' className='ml-auto max-w-44' />
      </div>
    </div>
  )
}
