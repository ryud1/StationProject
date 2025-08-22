import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../lib/auth";

export function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />; // redireciona para login se não estiver logado
  }

  return children;
}
