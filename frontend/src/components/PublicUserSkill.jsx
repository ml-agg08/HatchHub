import { useState,useEffect } from "react";
import api from "../api";

function PublicUserSkill({ selectedskill, notes, setNotes, setSelectedskill, getNotesBySkill }) {
  useEffect(() => {
    if (selectedskill) {
      getNotesBySkill(selectedskill);
    }
  }, [selectedskill]);

  const GetUserSkill = () => {
    api
      .get("/api/getuserskill/")
      .then((res) => res.data)
      .then((data) => setSelectedskill(data[0].skill))
      .catch((err) => {
        alert(err);
      });
  };


  return (
    <div>
      <button onClick={GetUserSkill}>See relevant posts only</button>
    </div>
  );
}
export default PublicUserSkill;
