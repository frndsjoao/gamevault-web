import { storage } from "@/utils/localStorage"
import { JSX } from "react"
import { Navigate } from "react-router-dom"

interface PublicRouteProps {
  element: JSX.Element
}

export default function PublicRoute({ element }: PublicRouteProps) {
  const token = storage.getToken()

  return token ? <Navigate to="/dashboard" replace /> : element
}
