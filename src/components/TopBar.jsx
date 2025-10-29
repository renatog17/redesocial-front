import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../configs/constants";
import { useAuth } from "../context/AuthContext";
import FriendRequestsDropDown from "./FriendRequestsDropDown";

const Topbar = () => {
  const navigate = useNavigate();
  const { realizarLogout, user } = useAuth();
  const handleLogout = async () => {
    try {
      await realizarLogout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleProfile = () => navigate(`/${user?.nickName}`);
  const handleFeed = () => navigate("/feed");

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-10">
      <span
        onClick={handleFeed}
        className="font-bold text-xl cursor-pointer hover:text-blue-500 transition"
      >
        {APP_NAME}
      </span>

      <div className="hidden md:flex gap-4 items-center relative">
        <FriendRequestsDropDown />

        {/* Avatar e nome do usuário */}
        <div
          onClick={handleProfile}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <div className="w-8 h-8">
              <div className="w-full h-full bg-gray-200 rounded-full" />
          </div>
        </div>

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
