import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../configs/constants";
import { useAuth } from "../context/AuthContext";
import FriendRequestsDropDown from "./FriendRequestsDropDown";
import Avatar, { genConfig } from "react-nice-avatar";
import { useMemo } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const { realizarLogout, user } = useAuth();

  // Gera config do avatar apenas quando o user mud
  const avatarConfig = useMemo(() => {
    if (!user) return genConfig("guest"); // fallback

    // Define gênero para o avatar
    let sex = "man"; // padrão masculino
    if (user.gender === "FEMALE") sex = "woman";
    else if (
      user.gender === "NON_BINARY" ||
      user.gender === "TRANSGENDER" ||
      user.gender === "AGENDER" ||
      user.gender === "GENDERFLUID" ||
      user.gender === "PREFER_NOT_TO_SAY" ||
      user.gender === "OTHER"
    ) {
      sex = undefined; // avatar neutro/aleatório
    }

    return genConfig({
      name: user.name ?? user.nickName ?? "guest",
      sex, // define se é man, woman ou neutro
      bgColor: "#E0F2FE", // cor de fundo opcional
    });
  }, [user]);

  const handleLogout = async () => {
    try {
      await realizarLogout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleProfile = () => navigate("/profile");
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
            {user ? (
              <Avatar
                style={{ width: "100%", height: "100%" }}
                {...avatarConfig}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-full" />
            )}
          </div>
          <span className="text-gray-700 font-medium">
            {user?.name || user?.nickName || "Loading..."}
          </span>
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
