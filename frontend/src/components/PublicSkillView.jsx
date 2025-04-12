import api from "../api";
import { useState, useEffect } from "react";

function PublicSkillView({
  notes,
  setNotes,
  skills,
  setSkills,
  selectedskill,
  setSelectedskill,
  getNotesBySkill,
}) {
  useEffect(() => {
    GetSkills();
  }, []);

  useEffect(() => {
    if (selectedskill) {
      getNotesBySkill(selectedskill);
    }
  }, [selectedskill]);

  const GetSkills = () => {
    api
      .get("/api/getskills/")
      .then((res) => res.data)
      .then((data) => setSkills(data))
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="flex flex-col space-y-3 w-1/4 my-4">
      <select
        onChange={(e) => setSelectedskill(e.target.value)}
        className="px-4 py-2 border border-rose-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white text-gray-800 transition-all"
      >
        <option value=""> Select a skill</option>
        {skills.map((skill, index) => (
          <option key={index} value={skill.tag}>
            {skill.tag}
          </option>
        ))}
      </select>

      {selectedskill && (
        <p className="text-sm text-rose-600 font-medium">
          You've selected: <span className="font-semibold">{selectedskill}</span>
        </p>
      )}
    </div>
  );
}

export default PublicSkillView;
