import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConnection, getUserProfile } from "../services/apiService";
import { postConnection } from "../services/apiService";
import TopBar from "../components/TopBar";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { nickname } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [connection, setConnection] = useState(null);
  const { user: authUser } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserProfile(nickname);
        setUser(response.data);
      } catch (err) {
        console.error("Erro ao buscar usuário", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [nickname]);

  useEffect(() => {
    const fetchConnection = async () => {
      try {
        if (!user) return; // só busca a conexão se o usuário já estiver carregado
        if (authUser?.nickName === nickname) return;
        const responseConnection = await getConnection(user.id);
        const connectionData = responseConnection.data;
        setConnection(connectionData);

        // se já existir uma conexão ou uma solicitação pendente, desativa o botão
        if (
          connectionData &&
          (connectionData.status === "PENDING" ||
            connectionData.status === "ACCEPTED")
        ) {
          setRequestSent(true);
        }
      } catch (err) {
        console.error("Erro ao buscar conexão", err);
      }
    };

    fetchConnection();
  }, [user]);

  const handleSendRequest = async () => {
    try {
      if (!user?.id) {
        console.error("ID do usuário alvo não encontrado");
        return;
      }
      alert(user.id);
      await postConnection({ idTarget: user.id });
      setRequestSent(true);
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e7ebf2] text-gray-700">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e7ebf2] text-gray-700">
        <p>Usuário não encontrado 😢</p>
      </div>
    );
  }

  const { name, nickName, photoUrl, readPrivateUserProfileDTO } = user.body;
  const bio = readPrivateUserProfileDTO?.bio;
  const posts = readPrivateUserProfileDTO?.posts || [];
  const isOwnProfile = authUser?.nickName === nickName;

  return (
    <div className="bg-[#e7ebf2] min-h-screen text-gray-800 font-sans">
      {/* Top bar (fixed) */}
      <TopBar />

      {/* Add padding to avoid overlap */}
      <div className="pt-20 max-w-4xl mx-auto flex flex-col md:flex-row gap-6 px-4">
        {/* Sidebar */}
        <aside className="md:w-1/3 bg-white shadow-md rounded-md p-4 mt-4">
          <div className="text-center">
            <img
              src={photoUrl || "/default-avatar.png"}
              alt={nickName}
              className="w-32 h-32 rounded-md mx-auto mb-3 border border-gray-300 object-cover"
            />
            <h2 className="text-xl font-bold text-[#3b5998]">{name}</h2>
            <p className="text-gray-600 text-sm">@{nickName}</p>
          </div>
          {/* Botão de solicitação */}
          {/* 🔹 Só mostra botão se não for o próprio perfil */}
          {!isOwnProfile && (
            <div className="mt-4">
              {requestSent ? (
                <button
                  disabled
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed"
                >
                  Solicitação enviada ✓
                </button>
              ) : (
                <button
                  onClick={handleSendRequest}
                  className="bg-[#3b5998] text-white px-4 py-2 rounded-md hover:bg-[#2d4373] transition"
                >
                  Enviar solicitação
                </button>
              )}
            </div>
          )}

          {isOwnProfile && (
            <div className="mt-4 text-center text-gray-500 text-sm italic">
              Este é o seu perfil
            </div>
          )}

          <hr className="my-4 border-gray-300" />

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Bio</h3>
            <p className="text-gray-700 text-sm">
              {bio || "Este usuário ainda não escreveu uma bio."}
            </p>
          </div>
        </aside>

        {/* Posts column */}
        <main className="md:w-2/3 mt-4">
          <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h3 className="text-lg font-semibold text-[#3b5998] mb-3">
              Linha do tempo
            </h3>
            {posts.length === 0 ? (
              <p className="text-gray-600 text-sm">Nenhuma publicação ainda.</p>
            ) : (
              <ul className="space-y-4">
                {posts.map((post, index) => (
                  <li
                    key={index}
                    className="bg-[#f6f7f9] border border-gray-200 rounded-md p-4"
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={photoUrl || "/default-avatar.png"}
                        alt={nickName}
                        className="w-10 h-10 rounded-md mr-3 border border-gray-300 object-cover"
                      />
                      <div>
                        <p className="font-semibold text-[#3b5998]">{name}</p>
                        <p className="text-xs text-gray-500">@{nickName}</p>
                      </div>
                    </div>
                    <p className="text-gray-800">{post.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Likes: {post.likes ?? 0}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
