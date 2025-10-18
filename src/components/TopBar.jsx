import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../configs/constants";
import { useAuth } from "../context/AuthContext";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { Users } from "lucide-react";

const SOCKET_URL = "http://localhost:8080/ws";

const Topbar = () => {
  const navigate = useNavigate();
  const { realizarLogout } = useAuth();

  const [requests, setRequests] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL, null, {
      withCredentials: true,
    });
    const client = over(socket);
    clientRef.current = client;

    client.connect({}, () => {
      console.log("✅ Conectado ao WebSocket!");
      client.subscribe("/user/topic/friend-requests", (message) => {
        try {
          const data = JSON.parse(message.body);
          setRequests((prev) => [data, ...prev]);
          setHasNew(true); // marca como nova notificação
        } catch (err) {
          console.error("Erro ao processar mensagem:", err);
        }
      });
    }, (error) => {
      console.error("❌ Erro na conexão WebSocket:", error);
    });

    // cleanup
    return () => {
      if (clientRef.current) {
        try {
          clientRef.current.disconnect(() => {
            console.log("❌ Desconectado do WebSocket");
          });
        } catch (err) {
          console.error("Erro ao desconectar:", err);
        }
      }
    };
  }, []);

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

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
    setHasNew(false); // limpa indicador de novas solicitações
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-10">
      <span
        onClick={handleFeed}
        className="font-bold text-xl cursor-pointer hover:text-blue-500 transition"
      >
        {APP_NAME}
      </span>

      <div className="hidden md:flex gap-4 items-center relative">
        {/* Ícone de amigos */}
        <button
          onClick={toggleDropdown}
          className="relative text-gray-600 hover:text-blue-500 transition"
        >
          <Users size={22} />
          {hasNew && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
              !
            </span>
          )}
        </button>

        {/* Dropdown de solicitações */}
        {showDropdown && (
          <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-64 p-3">
            <h4 className="font-semibold mb-2">Solicitações</h4>
            {requests.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma solicitação</p>
            ) : (
              requests.map((req, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span className="text-sm">{req.message}</span>
                  <button className="text-blue-500 text-xs hover:underline">
                    Ver
                  </button>
                </div>
              ))
            )}
          </div>
        )}

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
