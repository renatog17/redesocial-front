import React, { useState } from "react";
import { postNewPost } from "../services/apiService";

const NewPost = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      content
    };

    try{
      setLoading(true);
      const response = await postNewPost(newPost);
      setContent("");
    }catch(err){
      console.error("Error creating post:", err);
    }finally{
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
