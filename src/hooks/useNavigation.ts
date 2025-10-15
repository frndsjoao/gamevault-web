import { useNavigate, NavigateOptions } from "react-router-dom";
import { AppRoutes } from "../routes/types";

export function useAppNavigate() {
  const navigate = useNavigate();

  function appNavigate(to: AppRoutes, options?: NavigateOptions): void;
  function appNavigate(delta: number): void;

  function appNavigate(to: AppRoutes | number, options?: NavigateOptions) {
    navigate(to as any, options);
  }

  return appNavigate;
}
