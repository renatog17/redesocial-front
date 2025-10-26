import { useState, useEffect } from "react";
import NewPost from "./NewPost";
import PostCard from "./PostCard";
import { getPosts } from "../services/apiService";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);
  
  return (
    <main className="flex-1 p-4 md:p-6">
      <NewPost onPostCreated/>

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
