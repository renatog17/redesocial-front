import { Heart } from "lucide-react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

dayjs.locale("pt-br");

const PostCard = ({
  content,
  createdAt,
  likes = 0,
  images = [],
  userProfileName,
  userProfileNickName,
  userProfilePhotoURL,
}) => {
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(likes);

  const formattedDate = createdAt
    ? dayjs(createdAt).format("DD/MM/YYYY HH:mm")
    : "";

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
  };

  const handleProfile = () => {
    navigate(`/${userProfileNickName}`);
  };

  return (
    <article className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-100 dark:border-gray-700 p-4 md:p-6 flex flex-col gap-3 transition-all hover:shadow-md hover:-translate-y-[2px] max-w-xl mx-auto">
      {/* Cabeçalho: perfil do autor */}
      <header className="flex items-center gap-3">
        {/* FOTO */}
        <button
          onClick={handleProfile}
          className="focus:outline-none"
        >
          <img
            src={
              userProfilePhotoURL ||
              "https://ui-avatars.com/api/?name=User&background=ccc"
            }
            alt={userProfileName || "Usuário"}
            className="w-11 h-11 rounded-full object-cover border border-gray-300 dark:border-gray-700 transition-transform hover:scale-[1.05]"
          />
        </button>

        {/* NOME E NICKNAME */}
        <div
          onClick={handleProfile}
          className="cursor-pointer select-none"
        >
          <p className="font-semibold text-gray-900 dark:text-gray-100 leading-tight hover:underline">
            {userProfileName || "Usuário"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
            @{userProfileNickName || "nickname"}
          </p>
        </div>
      </header>

      {/* Conteúdo do post */}
      {content && (
        <p className="text-gray-800 dark:text-gray-200 text-[15px] leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      )}

      {/* Imagens do post */}
      {images.length > 0 && (
        <div
          className={`flex justify-center ${
            images.length === 1 ? "mt-3" : "grid grid-cols-2 gap-2 mt-3"
          }`}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex justify-center bg-gray-100 dark:bg-gray-900"
            >
              <img
                src={img.url}
                alt={`Imagem ${i + 1}`}
                className={`${
                  images.length === 1
                    ? "max-h-[400px] w-auto object-contain"
                    : "w-full h-52 object-cover"
                } transition-transform duration-200 hover:scale-[1.02]`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Rodapé */}
      <footer className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <span>{formattedDate}</span>

        <button
          onClick={handleLike}
          className="flex items-center gap-1 transition hover:text-pink-500 active:scale-95"
        >
          <Heart size={17} />
          <span>{likeCount}</span>
        </button>
      </footer>
    </article>
  );
};

export default PostCard;
