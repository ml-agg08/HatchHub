import { useState } from "react";
import api from "../api";
import ApprovalForm from "./ApprovalForm";
import { useNavigate } from "react-router-dom";

function JoinRequests({ note, status }) {
  const [text, setText] = useState("");
  const [joinrequests, setJoinrequests] = useState([]);
  const navigate = useNavigate();

  const ApplyJoin = (id) => {
    api.post(`api/notes/${id}/joinproject/`, { text: text }).catch((err) => {
      alert(err);
    });
  };

  const ListJoin = (id) => {
    api
      .get(`api/notes/${id}/joinproject/`)
      .then((res) => {
        setJoinrequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      {status === "private" ? (
        <div>
          <button
            onClick={() => ListJoin(note.id)}
            className="bg-rose-400 text-white px-4 py-2 rounded hover:bg-rose-500 mb-4"
          >
            See Join Requests
          </button>

          {joinrequests.map((joinrequest) => (
            <div
              key={joinrequest.id}
              className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h6 className="text-sm font-medium text-gray-800">
                  Status:{" "}
                  <span
                    className={`${
                      joinrequest.status === "Pending"
                        ? "text-yellow-600"
                        : joinrequest.status === "Approved"
                        ? "text-yellow-200"
                        : "text-red-600"
                    }`}
                  >
                    {joinrequest.status}
                  </span>
                </h6>
                <button
                  onClick={() =>
                    navigate(`/profileother/${joinrequest.owner}`)
                  }
                  className="text-sm text-rose-400 hover:underline"
                >
                  View Profile →
                </button>
              </div>

              <p className="text-gray-700 mb-2">"{joinrequest.text}"</p>

              {joinrequest.status === "Pending" && (
                <ApprovalForm approval_id={joinrequest.id} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ApplyJoin(note.id);
          }}
          className="space-y-4"
        >
          <label htmlFor="text" className="block text-sm text-gray-600">
            Do you want to add anything?
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Join the project
          </button>
        </form>
      )}
    </div>
  );
}

export default JoinRequests;
