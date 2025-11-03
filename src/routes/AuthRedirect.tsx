import { storage } from "@/utils/localStorage"
import { useProfileQuery } from "@/hooks/queries/useProfile"
import { Navigate } from "react-router-dom"
import { useUser } from "@/store/user"
import { useEffect } from "react"

export default function AuthRedirect() {
  const token = storage.getToken()
  const setUser = useUser((state) => state.setUser)

  const { data: profile, isLoading, isError } = useProfileQuery({
    enabled: !!token,
  })

  useEffect(() => {
    if (profile) {
      setUser(profile)
    }
  }, [profile, setUser])

  if (!token || isError) {
    return <Navigate to="/signin" replace />
  }

  if (isLoading) {
    return null
  }

  return <Navigate to="/dashboard" replace />
}
