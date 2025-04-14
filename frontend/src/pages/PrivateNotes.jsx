import { useEffect, useState } from "react";
import api from "../api";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import Header from "../components/Header";

function PrivateNotes() {
  const [notes, setNotes] = useState([]);
  const skill = "";

  const getNotes = (skill) => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  useEffect(() => {
    getNotes(skill);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 sm:px-6 lg:px-8 py-6">
      <Header />
      <div className="max-w-3xl mx-auto">

        <div className="space-y-6">
          <div className="bg-white mt-4 p-4 rounded-lg shadow-md border border-gray-200" >
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Share something you're building or excited about:
            </h3>
            <NoteForm refreshNote={getNotes} />
          </div>
    
          <h1 className="text-3xl font-bold mb-6 text-rose-500">Your Notes</h1>

          <NoteList notes={notes} refreshNote={getNotes} skill={skill} status={"private"} />

          <p className="text-sm text-gray-500 mt-8">
            These are your private notes. Here, you can view your posts and manage replies,
            validations, and join requests. You can approve them at your own pace.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivateNotes;
