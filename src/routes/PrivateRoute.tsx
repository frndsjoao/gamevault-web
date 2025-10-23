import { storage } from "@/utils/localStorage"
import { JSX } from "react"
import { Navigate } from "react-router-dom"

interface PrivateRouteProps {
  element: JSX.Element
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const token = storage.getToken()

  return token ? element : <Navigate to="/signin" replace />
}
