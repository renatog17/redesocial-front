import { useNavigate } from "react-router-dom";
import { APP_NAME } from '../configs/constants';
import { useAuth } from "../context/AuthContext";


const Topbar = () => {
  const navigate = useNavigate();
  const { realizarLogout } = useAuth();

  const handleProfile = () => {
    navigate("/profile"); // redireciona para a página de perfil
  };

  const handleLogout = async () => {
    try {
      await realizarLogout(); // chama sua API
      navigate("/login"); // redireciona para login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleFeed = () => {
    navigate("/feed");
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-10">
      {/* Logo / Nome do app */}
      <span
        onClick={handleFeed}
        className="font-bold text-xl cursor-pointer hover:text-blue-500 transition"
      >
        {APP_NAME}
      </span>
      {/* Menu button mobile */}
      <button className="text-gray-600 hover:text-blue-500 md:hidden">
        ☰
      </button>

      {/* Opções no desktop */}
      <div className="hidden md:flex gap-4 items-center">
        <button
          onClick={handleProfile}
          className="text-gray-600 hover:text-blue-500 transition"
        >
          Perfil
        </button>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;