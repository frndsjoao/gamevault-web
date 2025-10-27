import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import MainContent from "@/components/layout/MainContent"
import GameCard from "@/components/common/GameCard"
import { LuLoaderCircle } from "react-icons/lu"
import { useGamelistQuery } from "@/hooks/queries/useGamelist"
import { useLocation } from "react-router-dom"

export default function Gamelist() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { data: games, isLoading } = useGamelistQuery(location.state.filter)

  const newGames = [...games, ...games, ...games, ...games]

  return (
    <div className="flex flex-row overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MainContent setSidebarOpen={setSidebarOpen}>
        {isLoading ? (
          <div className="flex h-screen w-full items-center justify-center pb-10">
            <LuLoaderCircle size={32} className="animate-spin text-white" />
          </div>
        ) : (
          <div className="flex w-full flex-wrap gap-4 p-4">
            {newGames?.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                activeColumn={location.state.filter}
              />
            ))}
          </div>
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
