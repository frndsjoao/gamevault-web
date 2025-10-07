import { useQuery } from '@tanstack/react-query';
import { SyntheticEvent } from 'react';

interface Game {
  id: number;
  title: string;
  cover: string;
}

// Mock API function - replace with your actual API endpoint
const fetchGames = async (): Promise<Game[]> => {
  // Example mock data - replace with your actual API call
  // const response = await fetch('YOUR_API_ENDPOINT/games');
  // return response.json();

  // Mock data for demonstration
  return [
    {
      id: 1,
      title: 'The Witcher 3',
      cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5ot7.jpg',
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2',
      cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg',
    },
    {
      id: 3,
      title: 'Cyberpunk 2077',
      cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2mgz.jpg',
    },
    {
      id: 4,
      title: 'Elden Ring',
      cover: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg',
    },
  ];
};

export default function GameList() {
  const { data: games, isLoading, error } = useQuery<Game[]>({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-gray-600">Loading games...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-600">
          Error loading games: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Game Library</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {games?.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-200">
                <img
                  src={game.cover}
                  alt={game.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = 'https://via.placeholder.com/264x352?text=No+Cover';
                  }}
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 truncate">
                  {game.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
