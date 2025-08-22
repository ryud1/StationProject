import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { StationForm } from "./pages/StationForm";
import { EditStation } from "./pages/EditStation";
import StationsList from "./pages/StationsList";
import { StationsProvider } from "./context/StationsContext";
import { ProtectedRoute } from "./pages/ProtectedRoute"; // importe aqui

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Tela pública: Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StationsProvider>
                <Dashboard />
              </StationsProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cadastro"
          element={
            <ProtectedRoute>
              <StationsProvider>
                <StationForm />
              </StationsProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/listagem"
          element={
            <ProtectedRoute>
              <StationsProvider>
                <StationsList />
              </StationsProvider>
            </ProtectedRoute>
          }
        />

        {/* Rota de edição protegida */}
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <StationsProvider>
                <EditStation />
              </StationsProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
