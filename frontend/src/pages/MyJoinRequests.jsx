import { useEffect, useState } from "react";
import api from "../api";
import ViewSingleNote from "../components/ViewSingleNote";
import Header from "../components/Header";

function MyJoinRequests() {
  const [myjoinrequests, setMyjoinrequests] = useState([]);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    viewRequests();
  }, []);

  useEffect(() => {
    viewRequests();
  }, [status]);

  const viewRequests = () => {
    api
      .get(`api/viewrequests/${status}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setMyjoinrequests(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 lg:px-8 py-6">
      <Header />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-rose-500">My Join Requests</h1>

        <div className="mb-6">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-700">
            Filter by status:
          </label>
          <select
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="w-full sm:w-1/2 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="Pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {myjoinrequests.length === 0 ? (
          <p className="text-gray-500 italic">No join requests found for this status.</p>
        ) : (
          <div className="space-y-6">
            {myjoinrequests.map((req) => (
              <div
                key={req.id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-rose-400"
              >
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Your message:</span> {req.text}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-semibold">Project owner's reply:</span> {req.approval_text || "—"}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-md text-white text-xs font-semibold ${
                      req.status === "approved"
                        ? "bg-green-500"
                        : req.status === "rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.status.toUpperCase()}
                  </span>
                </p>
                <div className="mt-4">
                  <ViewSingleNote id={req.note} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJoinRequests;
