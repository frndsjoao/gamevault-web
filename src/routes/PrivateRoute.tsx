import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: JSX.Element
}

export default function PrivateRoute({ element }: PrivateRouteProps) {
  const token = localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_TOKEN);

  return token ? element : <Navigate to="/signin" replace />;
}
