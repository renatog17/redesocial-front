import React from "react";
import { Heart } from "lucide-react"; // ícone de coração (usando lucide)
import dayjs from "dayjs"; // para formatar data
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

const PostCard = ({ content, createdAt, likes, images }) => {
  const formattedDate = createdAt
    ? dayjs(createdAt).format("DD/MM/YYYY HH:mm")
    : "";

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 md:p-6 flex flex-col gap-3 transition hover:shadow-lg">
      {/* conteúdo do post */}
      <p className="text-gray-800 dark:text-gray-200 text-base">{content}</p>

      {/* imagens (se houver) */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={`Imagem ${i + 1}`}
              className="w-full h-40 object-cover rounded-xl"
            />
          ))}
        </div>
      )}

      {/* rodapé com data e likes */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-3">
        <span>{formattedDate}</span>
        <div className="flex items-center gap-1">
          <Heart size={16} />
          <span>{likes ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
