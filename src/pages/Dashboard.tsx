import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import MainContent from "@/components/layout/MainContent"
import GameCard from "@/components/common/GameCard"
import Carousel from "@/components/common/Carousel"
import { useDashboardQuery } from "@/hooks/queries/useDashboard"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: games, isLoading } = useDashboardQuery()

  return (
    <div className="flex flex-row overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MainContent setSidebarOpen={setSidebarOpen}>
        {games?.playing && games?.playing.length > 0 && (
          <Carousel title="Now playing">
            {games.playing.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Carousel>
        )}
        {games?.backlog && games?.backlog.length > 0 && (
          <Carousel title="My backlog">
            {games.backlog.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Carousel>
        )}
        {games?.completed && games?.completed.length > 0 && (
          <Carousel title="Completed">
            {games.completed.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Carousel>
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
