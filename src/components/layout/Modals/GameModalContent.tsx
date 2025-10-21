import { IGame, IPlatform, PlatformId } from '@/@types/game'
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import DatePicker from '@/components/common/DatePicker';
import Icon, { IconName } from '@/components/common/Icon'
import Rating from '@/components/common/Rating';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { gameStatus } from '@/utils/status';
import { useCallback, useEffect, useState } from 'react';

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
  const [completedDate, setCompletedDate] = useState<Date | undefined>(new Date())

  const platformIcon = useCallback((platform: IPlatform) => `plat-${platform.id}` as IconName, []);
  const releaseDate = game.platforms.find(p => p.id === selectedPlatform)?.releaseDate;

  const handlePlatformSelect = useCallback((platId: PlatformId) => {
    setSelectedPlatform(platId);
  }, []);

  const handleStatusSelect = useCallback((status: string) => {
    setSelectedStatus(status);
  }, []);

  const handlePlatinumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPlatinum(e.target.checked);
  }, []);

  useEffect(() => {
    if (platform && platform !== "all") {
      setSelectedPlatform(platform);
    }
  }, [platform]);

  return (
    <div className="flex min-w-full flex-col items-center gap-3 p-2 md:gap-4 md:p-3 lg:p-4">
      <div className='flex w-full flex-col gap-3 md:flex-row md:gap-6'>
        <img
          src={game.cover}
          alt={game.name}
          className="w-40 self-center rounded-lg object-cover shadow-lg md:w-64"
        />
        <div className='w-full space-y-3 text-start md:space-y-4'>
          <div>
            <h2 className="text-base font-bold text-text-light md:text-xl lg:text-2xl">{game.name}</h2>
            <span className='text-xs text-text-light md:text-sm'>{releaseDate}</span>
          </div>

          <div className='my-3 flex flex-row items-center gap-2'>
            {game.platforms.map(plat => {
              const isActive = selectedPlatform === plat.id;
              return (
                <button
                  key={plat.id}
                  onClick={() => !isActive && handlePlatformSelect(plat.id)}
                  disabled={isActive}
                  className={`${isActive ? "border-btn-light bg-btn-light cursor-not-allowed" : "border-border hover:bg-gray-700 cursor-pointer"} rounded-md border p-2 transition-colors`}
                  aria-label={`Selecionar plataforma ${plat.name}`}
                >
                  <Icon name={platformIcon(plat)} size={18} className={isActive ? "text-text-dark" : 'text-text-light'} />
                </button>
              );
            })}
          </div>

          <div className='mt-2 md:mt-4'>
            <span className='mb-2 text-sm font-medium text-text-medium'>Rating:</span>
            <Rating enabled rating={rating} size={20} onChange={setRating} />
            <div className='mt-6'>
              <Checkbox
                checked={platinum}
                onChange={handlePlatinumChange}
                label="Platinum"
                icon="platinum"
              />
            </div>
          </div>

          <div>
            <p className='text-base font-semibold text-text-medium'>Status:</p>
            <div className='flex w-full flex-wrap gap-2'>
              {gameStatus.map(status => {
                const isStatusActive = selectedStatus === status;
                return (
                  <button
                    key={status}
                    onClick={() => !isStatusActive && handleStatusSelect(status)}
                    disabled={isStatusActive}
                    className={`${isStatusActive
                      ? "border-btn-light bg-btn-light text-text-dark cursor-not-allowed"
                      : "border-border text-text-light hover:bg-gray-700 cursor-pointer"
                      } rounded-md border px-3 py-1.5 transition-colors font-medium text-xs md:px-4 md:py-2 md:text-sm`}
                    aria-label={`Selecionar status ${status}`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          <Accordion type="single" collapsible value={selectedStatus === "Completed" ? "completed-date" : ""}>
            <AccordionItem value="completed-date" className="border-none">
              <AccordionTrigger className="hidden" />
              <AccordionContent className="pt-4">
                <DatePicker
                  label="Completion date:"
                  placeholder="Select the date"
                  value={completedDate}
                  onChange={setCompletedDate}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Button label='Save' className='ml-auto w-full md:max-w-44' />
    </div>
  )
}
