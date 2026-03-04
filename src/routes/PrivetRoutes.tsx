import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/useAppSelectorDispatch";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuth, loading } = useAppSelector((state) => state.auth);

  // Пока идёт fetchUser — ничего не рендерим
  if (loading) return null; 

  if (!isAuth) return <Navigate to="/login" replace />;

  return <>{children}</>;
};