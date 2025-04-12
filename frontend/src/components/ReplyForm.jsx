import { useState } from "react";
import api from "../api";

function ReplyForm({ note, refreshNote, setReplytoggle }) {
  const [contentReply, setContentReply] = useState("");
  const [showmessage,setShowmessage]=useState(false);

  const createReply = (id) => {
    api
      .post(`api/notes/${id}/replies/`, { content: contentReply })
      .then(() => {
        setReplytoggle(true)
        refreshNote(id);
        setContentReply(""); 
        setShowmessage(true);

        setTimeout(() => {
          setShowmessage(false);
        }, 2500);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createReply(note.id);
        }}
        className="space-y-3"
      >
        <div>
          <label
            htmlFor="contentreply"
            className="block text-sm font-medium text-gray-700"
          >
            Add a reply:
          </label>
          <input
            type="text"
            name="contentreply"
            id="contentreply"
            value={contentReply}
            onChange={(e) => setContentReply(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Type your reply here..."
          />
        </div>

        <button
          type="submit"
          className="bg-rose-400 text-white px-4 py-2 rounded-md hover:bg-rose-500 transition duration-200"
        >
          Add Reply
        </button>
      </form>
      {showmessage==true?
      <h6 className="mt-3 p-2 bg-rose-100 text-rose-700 rounded-md text-sm font-medium shadow-sm transition-opacity duration-300">"Your reply has been posted"</h6>:null}
    </div>
  );
}

export default ReplyForm;
