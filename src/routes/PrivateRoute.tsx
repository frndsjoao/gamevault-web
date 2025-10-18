import { getUserToken } from "@/lib/utils";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const token = getUserToken()

  return token ? element : <Navigate to="/signin" replace />;
}
