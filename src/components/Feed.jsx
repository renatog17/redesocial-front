import React, { useState, useEffect } from "react";
import NewPost from "./NewPost";
import PostCard from "./PostCard";
import { getPosts } from "../services/apiService"; // importa o método da API

const Feed = () => {
  const [posts, setPosts] = useState([]);

  // buscar posts do backend ao montar o componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data); // a API retorna uma lista de ReadPostDTO
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    // adiciona o novo post no topo da lista
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>

      <NewPost onPostCreated={handleNewPost} />

      <div className="flex flex-col gap-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">Nenhum post encontrado.</p>
        ) : (
          posts.map((p) => (
            <PostCard
              key={p.id}
              content={p.content}
              createdAt={p.createdAt}
              likes={p.likes}
              images={p.images}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Feed;
