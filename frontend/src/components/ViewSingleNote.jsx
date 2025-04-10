import { useState } from "react";
import api from "../api";

function ViewSingleNote({ id }) {
  const [singlenote, setSinglenote] = useState([]);

  const singleNote = (id) => {
    api
      .get(`api/singlenoteview/${id}/`)
      .then((res) => res.data)
      .then((data) => {
        setSinglenote(data);
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => singleNote(id)}
        className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-all duration-200 shadow-sm"
      >
       View Note
      </button>

      {singlenote.length > 0 && (
        <div className="mt-3 p-4 bg-white border border-gray-200 rounded-md shadow-md">
          <h5 className="text-lg font-semibold text-gray-800">{singlenote[0]?.title}</h5>
          <p className="mt-2 text-gray-700">{singlenote[0]?.content}</p>
        </div>
      )}
    </div>
  );
}

export default ViewSingleNote;
