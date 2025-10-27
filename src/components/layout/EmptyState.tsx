import { Gamepad2 } from "lucide-react"

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
}

export default function EmptyState({
  title = "No games found",
  message = "You don't have any games added to your vault yet.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 blur-2xl" />

        <div className="relative rounded-full border border-border bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
          {icon || <Gamepad2 size={64} className="text-text-light" />}
        </div>
      </div>

      <div className="flex max-w-md flex-col gap-3">
        <h2 className="bg-gradient-to-r from-text-light via-text-light to-text-dark bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          {title}
        </h2>
        <p className="text-base text-text-medium md:text-lg">{message}</p>
      </div>
    </div>
  )
}
