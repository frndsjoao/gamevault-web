import { JSX } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface PrivateRouteProps {
  element: JSX.Element
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const { isLogged } = useAuth();

  return isLogged ? element : <Navigate to="/login" replace />;
}
