import { useState, useEffect } from "react";
import api from "../api";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import PublicSkillView from "../components/PublicSkillView";
import PublicUserSkill from "../components/PublicUserSkill";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  const [notes, setNotes] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedskill, setSelectedskill] = useState([]);
  const [publicmode, setPublicmode] = useState("publicall");

  useEffect(() => {
    getPublicNotes();
  }, []);

  useEffect(() => {
    if (publicmode === "publicall") {
      getPublicNotes();
    }
  }, [publicmode]);

  const getPublicNotes = () => {
    api
      .get("/api/notes/public")
      .then((res) => res.data)
      .then((data) => {setNotes(data);console.log(notes)})
      .catch((err) => alert(err));
  };

  const getNotesBySkill = (selectedskill) => {

    const params=new URLSearchParams();
    selectedskill.forEach((skill)=>params.append('skill',skill));

      api
        .get(`/api/notes/publicskill/?${params.toString()}`)
        .then((res) => res.data)
        .then((data) => setNotes(data))
        .catch((err) => alert(err));
  };

  let refreshNote =
    publicmode === "publicskill" || publicmode === "publicuserskill"
      ? getNotesBySkill
      : getPublicNotes;

  return (
    <>
      <Header />

      <div className="flex gap-8 p-4">
        {/* LEFT PANEL */}
        <div className="w-48 flex flex-col gap-4">
          <button
            onClick={() => setPublicmode("publicall")}
            className="bg-white text-gray-800 rounded px-4 py-2 hover:bg-gray-300"
          >
            Public All
          </button>
          <hr />
          <button
            onClick={() => setPublicmode("publicskill")}
            className="bg-white text-black rounded px-4 py-2 hover:bg-gray-300"
          >
            Skill Based
          </button>
          <hr />
          <button
            onClick={() => setPublicmode("publicuserskill")}
            className="bg-white text-black rounded px-4 py-2 hover:bg-gray-300"
          >
            User Relevant
          </button>
          <hr />
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-4">
          {/* Dynamic Skill Components */}
          {publicmode === "publicskill" ? (
            <PublicSkillView
              notes={notes}
              setNotes={setNotes}
              skills={skills}
              setSkills={setSkills}
              selectedskill={selectedskill}
              setSelectedskill={setSelectedskill}
              getNotesBySkill={getNotesBySkill}
            />
          ) : publicmode === "publicuserskill" ? (
            <PublicUserSkill
              notes={notes}
              setNotes={setNotes}
              selectedskill={selectedskill}
              setSelectedskill={setSelectedskill}
              getNotesBySkill={getNotesBySkill}
            />
          ) : null}

          {/* Styled NoteForm Section */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Share something you're building or excited about:
            </h3>
            <NoteForm refreshNote={refreshNote} skill={selectedskill} />
          </div>

          {/* Info Message */}
          <h3 className="text-lg font-semibold text-rose-400">
            <span className="uppercase tracking-wide">
              {publicmode === "publicall"
                ? "SHOWING ALL PROJECTS."
                : publicmode === "publicskill"
                ? "SHOWING PROJECTS OF CHOOSEN SKILLS ONLY."
                : "SHOWING PROJECTS RELEVANT TO YOU."}
            </span>
          </h3>

          {/* Notes List */}
          <NoteList
            notes={notes}
            refreshNote={refreshNote}
            skill={selectedskill}
            status={"public"}
          />

          {/* Footer Info */}
          <h5 className="text-sm text-gray-500 mt-4">
            This is where you can see all the notes put by other makers, read them, make your thoughts and even send a join request to make with them.
            
          </h5>
        </div>
      </div>
    </>
  );
}

export default Home;
