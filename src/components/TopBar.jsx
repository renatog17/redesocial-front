import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { APP_NAME } from "../configs/constants";
import { useAuth } from "../context/AuthContext";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { Users } from "lucide-react";
import { getInviteConnections, postAcceptConnection } from "../services/apiService";


const SOCKET_URL = "http://localhost:8080/ws";

const Topbar = () => {
  const navigate = useNavigate();
  const { realizarLogout } = useAuth();

  const [requests, setRequests] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const clientRef = useRef(null);

  // 🔹 Carregar invites persistidos (vindos da API)
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await getInviteConnections();
        setRequests(response.data || []); // lista inicial
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      }
    };
    fetchInvites();
  }, []);

  // 🔹 WebSocket para novas solicitações em tempo real
  useEffect(() => {
    const socket = new SockJS(SOCKET_URL, null, { withCredentials: true });
    const client = over(socket);
    clientRef.current = client;

    client.connect(
      {},
      () => {
        console.log("✅ Conectado ao WebSocket!");
        client.subscribe("/user/topic/friend-requests", (message) => {
          try {
            const data = JSON.parse(message.body);
            // evita duplicação se já estiver na lista
            setRequests((prev) => {
              const exists = prev.some((req) => req.username === data.username);
              if (exists) return prev;
              return [data, ...prev];
            });
            setHasNew(true);
          } catch (err) {
            console.error("Erro ao processar mensagem:", err);
          }
        });
      },
      (error) => {
        console.error("❌ Erro na conexão WebSocket:", error);
      }
    );

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
    setHasNew(false);
  };

  // 👇 Função para abrir o perfil do remetente
  const handleViewProfile = (nickname) => {
    setShowDropdown(false); // fecha o dropdown
    navigate(`/${nickname}`);
  };

  const handleAccept = async (id) => {
    try {
      await postAcceptConnection({id}); // chamada à API (crie este método no apiService)
      setRequests((prev) => prev.filter((r) => r.id !== id)); // remove da lista
      //console.log(`✅ Conexão com ${username} aceita!`);
    } catch (err) {
      console.error("Erro ao aceitar solicitação:", err);
    }
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
          <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg w-72 p-3">
            <h4 className="font-semibold mb-2">Solicitações de amizade</h4>
            {requests.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma solicitação</p>
            ) : (
              requests.map((req, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 border-b py-2"
                >
                  <img
                    src={req.photo || "/default-avatar.png"}
                    alt={req.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{req.name}</p>
                    <p className="text-xs text-gray-500">@{req.id}</p>
                  </div>
                  <button
                    onClick={() => handleViewProfile(req.nickname)}
                    className="text-blue-500 text-xs hover:underline"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="text-green-600 text-xs hover:underline"
                  >
                    Aceitar
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
