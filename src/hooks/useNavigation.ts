import { useNavigate, NavigateOptions } from "react-router-dom";
import { AppRoutes } from "../routes/types";

export function useAppNavigate() {
  const navigate = useNavigate();

  function appNavigate(to: AppRoutes, options?: NavigateOptions): void;
  function appNavigate(delta: number): void;

  function appNavigate(to: AppRoutes | number, options?: NavigateOptions) {
    if (typeof to === 'number') {
      navigate(to);
    } else {
      navigate(to, options);
    }
  }

  return appNavigate;
}
