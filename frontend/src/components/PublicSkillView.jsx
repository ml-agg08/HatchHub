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
    <div>
      <select onChange={(e) => setSelectedskill(e.target.value)}>
        <option value="">Select a skill</option>
        {skills.map((skill, index) => (
          <option key={index} value={skill.tag}>
            {skill.tag}
          </option>
        ))}
      </select>
      <h6>you've selected : {selectedskill}</h6>
    </div>
  );
}
export default PublicSkillView;
