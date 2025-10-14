import React, { useState } from "react";
import NewPost from "./NewPost";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "Post 1", content: "This is the first post." },
    { id: 2, title: "Post 2", content: "This is the second post." },
  ]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // add the new post to the top
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Feed</h1>

      <NewPost onPostCreated={handleNewPost} />

      <div className="flex flex-col gap-4">
        {posts.map((p) => (
          <PostCard key={p.id} title={p.title} content={p.content} />
        ))}
      </div>
    </main>
  );
};

export default Feed;
