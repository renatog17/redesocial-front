import React, { useState } from "react";

const NewPost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    // Later this can call your backend API
    const newPost = {
      id: Date.now(),
      title: "New Post",
      content,
    };

    onPostCreated(newPost);
    setContent("");
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
