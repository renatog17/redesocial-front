const PostCard = ({ title, content }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 mt-2">{content}</p>
    </div>
  );
};

export default PostCard;
