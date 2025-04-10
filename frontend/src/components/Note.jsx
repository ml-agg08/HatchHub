import api from "../api";
import JoinRequests from "./JoinRequests";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Note({ note, refreshNote, skill, status }) {
    const navigate = useNavigate();
    const [replies, setReplies] = useState([]);
  
    const deleteNote = (id) => {
      api.delete(`api/notes/delete/${id}/`)
        .then(() => refreshNote(skill))
        .catch((err) => alert(err));
    };
  
    const getReplies = (id) => {
      api.get(`api/notes/${id}/replies/`)
        .then((res) => res.data)
        .then((data) => setReplies(data))
        .catch((err) => alert(err));
    };
  
    return (
      <div className="bg-white shadow-md rounded-xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">Posted by user ID: <span className="font-medium text-gray-800">{note.author}</span></div>
          {status === 'public' && (
            <button
              onClick={() => navigate(`/profileother/${note.author}`)}
              className="text-sm text-rose-500 hover:underline"
            >
              View Profile →
            </button>
          )}
        </div>
  
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{note.title}</h2>
        <p className="text-gray-700 mb-4">{note.content}</p>
  
        <div className="text-sm text-gray-500 mb-4">
          Note ID: {note.id} • Tag: <span className="text-rose-400 font-medium">{note.tag}</span>
        </div>
  
        {status !== 'public' && (
          <button
            onClick={() => deleteNote(note.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
          >
            Delete
          </button>
        )}
  
        <div className="mt-4">
          <JoinRequests note={note} status={status} />
        </div>
  
        <div className="mt-6">
          <ReplyForm note={note} refreshNote={getReplies} />
        </div>
  
        <div className="mt-4">
          <Reply id={note.id} refreshNote={getReplies} replies={replies} />
        </div>
      </div>
    );
  }
  
export default Note