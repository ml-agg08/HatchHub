import { useNavigate } from "react-router-dom";

function Reply({ id, refreshNote, replies }) {
  const navigate = useNavigate();

  return (
    <div className="mt-6 space-y-4">
      {replies.map((reply) => (
        <div
          key={reply.id}
          className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm"
        >
          <p className="text-gray-800 text-sm">{reply.content}</p>
          <button
            onClick={() => navigate(`/profileother/${reply.author}`)}
            className="mt-2 text-rose-400 text-sm hover:underline"
          >
            View replier's profile →
          </button>
        </div>
      ))}

      <div className="mt-4">
        <button
          onClick={() => refreshNote(id)}
          className="bg-rose-400 text-white px-4 py-2 rounded-md hover:bg-rose-500 transition duration-200"
        >
          See Replies
        </button>
      </div>
    </div>
  );
}

export default Reply;
