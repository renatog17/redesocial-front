import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CadastroPage from "./pages/CadastroPage";
import LoginPage from "./pages/LoginPage";
import PublicRoute from "./privateroutes/PublicRoute";
import PrivateRoute from "./privateroutes/PrivateRoute";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/cadastro"
        element={
          <PublicRoute>
            <CadastroPage />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <FeedPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/:nickname"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />  
    </Routes>
  );
}

export default App;
