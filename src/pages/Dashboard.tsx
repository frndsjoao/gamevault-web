import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import MainContent from "@/components/layout/MainContent"
import GameCard from "@/components/common/GameCard"
import Carousel from "@/components/common/Carousel"
import EmptyState from "@/components/layout/EmptyState"
import { useDashboardQuery } from "@/hooks/queries/useDashboard"
import { LuLoaderCircle } from "react-icons/lu"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: games, isLoading } = useDashboardQuery()

  const hasGames =
    games &&
    ((games.playing && games.playing.length > 0) ||
      (games.backlog && games.backlog.length > 0) ||
      (games.finished && games.finished.length > 0))

  return (
    <div className="flex flex-row overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MainContent setSidebarOpen={setSidebarOpen}>
        {isLoading ? (
          <div className="flex h-screen w-full items-center justify-center pb-10">
            <LuLoaderCircle size={32} className="animate-spin text-white" />
          </div>
        ) : hasGames ? (
          <>
            {games?.playing && games?.playing.length > 0 && (
              <Carousel title="Now playing">
                {games.playing.map((game) => (
                  <GameCard key={game.id} game={game} activeColumn="Playing" />
                ))}
              </Carousel>
            )}
            {games?.backlog && games?.backlog.length > 0 && (
              <Carousel title="My backlog">
                {games.backlog.map((game) => (
                  <GameCard key={game.id} game={game} activeColumn="Backlog" />
                ))}
              </Carousel>
            )}
            {games?.finished && games?.finished.length > 0 && (
              <Carousel title="Finished">
                {games.finished.map((game) => (
                  <GameCard key={game.id} game={game} activeColumn="Finished" />
                ))}
              </Carousel>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </MainContent>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
