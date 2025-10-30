import React, { useState } from "react";
import { postNewPost, postImageNewPost } from "../services/apiService";

const NewPost = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !file) return; // Precisa de texto ou arquivo

    const newPost = { content };

    try {
      setLoading(true);

      // 1️⃣ Cria o post (JSON)
      const postResponse = await postNewPost(newPost);
      const postId = postResponse.data.id; // assumindo que o backend retorna o ID do post

      // 2️⃣ Se houver arquivo, envia depois
      if (file) {
        await postImageNewPost(file, postId);
      }

      // Reset estado
      setContent("");
      setFile(null);
    } catch (err) {
      if (err.response) {
        console.error(
          "Server responded with error:",
          err.response.status,
          err.response.data
        );
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error creating post:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          rows="3"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-2"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
