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
      .get("/api/skills/")
      .then((res) => res.data)
      .then((data) => setSkills(data))
      .catch((err) => {
        alert(err);
      });
  };

  const ToggleSelectedSkill = (id) => {
    setSelectedskill((prev) =>
      prev.includes(id) ? prev.filter((sid) => id != sid) : [...prev, id]
    );
  };

  useEffect(() => {
    console.log(selectedskill);
  }, [selectedskill]);

  return (
    <div className="flex flex-col">
      <div>
      <h4 className="mb-2 text-rose-600 font-semibold text-sm tracking-wide uppercase">
        Choose the skills you are looking for:
      </h4>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill) => {
        const isSelected = selectedskill.includes(skill.id);
        return (
          <label
            key={skill.id}
            className={`cursor-pointer px-4 py-1 rounded-full border text-sm font-medium shadow-sm transition
          ${
            isSelected
              ? "bg-rose-400 text-white border-rose-500"
              : "bg-rose-100 text-rose-600 border-rose-200 hover:bg-rose-200"
          }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => ToggleSelectedSkill(skill.id)}
              className="hidden"
            />
            {skill.skillname}
          </label>
        );
      })}
      </div>
    </div>
  );
}

export default PublicSkillView;
