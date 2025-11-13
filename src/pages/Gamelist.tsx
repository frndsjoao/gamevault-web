import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import MainContent from "@/components/layout/MainContent"
import GameCard from "@/components/common/GameCard"
import { LuLoaderCircle } from "react-icons/lu"
import { useGamelistQuery } from "@/hooks/queries/useGamelist"
import { useLocation } from "react-router-dom"
import EmptyState from "@/components/layout/EmptyState"
import Select from "@/components/common/Select"

type SortOption = "alphabetical" | "rating" | "modified"

export default function Gamelist() {
  const location = useLocation()
  const filter = location.state.filter
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("alphabetical")

  const { data: games, isLoading } = useGamelistQuery(filter)

  return (
    <div className="flex flex-row overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <MainContent setSidebarOpen={setSidebarOpen}>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-lg font-semibold text-text-light md:text-xl">
            Your {filter.toLowerCase()} list:
          </h1>

          <div className="flex items-center gap-2">
            <Select
              setValue={setFilterPlatform}
              value={filterPlatform}
              placeholder="Platform"
              items={platforms}
              className="w-32"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <LuLoaderCircle size={32} className="animate-spin text-white" />
          </div>
        ) : (
          <div className="mt-[-16px] flex w-full flex-wrap gap-4">
            {games && games?.length > 0 ? (
              <>
                {games?.map((game) => (
                  <GameCard key={game.id} game={game} activeColumn={filter} />
                ))}
              </>
            ) : (
              <EmptyState />
            )}
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
