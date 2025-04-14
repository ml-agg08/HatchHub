import { useEffect, useState } from "react";
import api from "../api";

function NoteForm({ refreshNote, skill }) {
  useEffect(() => {
    ListSkillsAll();
  }, []);

  const [skillsselected, setSkillsselected] = useState([]);

  useEffect(() => {
    console.log(skillsselected);
  }, [skillsselected]);

  const [shownotecreatedmessage, setShownotecreatedmessage] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [skillsall, setSkillsall] = useState([]);

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", {
        title: title,
        content: content,
        skill_ids: skillsselected,
      })
      .then(() => {
        refreshNote(skill);
        setTitle("");
        setContent("");
        setSkillsselected([]);
        setShownotecreatedmessage(true);

        setTimeout(() => {
          setShownotecreatedmessage(false);
        }, 2500);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const ListSkillsAll = () => {
    api
      .get("/api/skills/")
      .then((res) => res.data)
      .then((data) => setSkillsall(data))
      .catch((err) => alert(err));
  };

  const HandleSkills = (id) => {
    setSkillsselected((prev) =>
      prev.includes(id) ? prev.filter((sid) => id != sid) : [...prev, id]
    );
  };

  return (
    <div>
      <form onSubmit={createNote} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Building a weather app with React"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-400 focus:border-rose-400"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            What’s it about?
          </label>
          <textarea
            id="content"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something interesting…"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-rose-400 focus:border-rose-400 resize-none"
          ></textarea>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skillsall.map((skill) => {
              const isSelected = skillsselected.includes(skill.id);
              return (
                <button
                  type="button"
                  key={skill.id}
                  onClick={() => HandleSkills(skill.id)}
                  className={`px-4 py-2 text-sm rounded-full shadow-sm border transition 
            ${
              isSelected
                ? "bg-rose-100 text-rose-600 border-rose-300"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
            }`}
                >
                  {skill.skillname}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-rose-400 text-white font-semibold px-4 py-2 rounded-md hover:bg-rose-500 transition-colors"
          >
            Post it!
          </button>
        </div>
      </form>
      {shownotecreatedmessage ? (
        <h6 className="mt-3 p-2 bg-rose-100 text-rose-700 rounded-md text-sm font-medium shadow-sm transition-opacity duration-300 ">
          Successfuly Posted !!
        </h6>
      ) : null}
    </div>
  );
}

export default NoteForm;
