import { useState, useEffect } from "react";
import api from "../api";

function PublicUserSkill({ selectedskill, notes, setNotes, setSelectedskill, getNotesBySkill }) {
  useEffect(() => {
    GetUserSkill();
  }, []);

  useEffect(() => {
    if (selectedskill) {
      getNotesBySkill(selectedskill);
    }
  }, [selectedskill]);

  const GetUserSkill = () => {
    api
      .get("/api/getuserskill/")
      .then((res) => res.data)
      .then((data) =>{
        const skillIds=data.map((item)=>item.id);
        setSelectedskill(skillIds);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="w-full text-center py-2 text-rose-700 font-semibold bg-rose-100 rounded-md shadow-sm my-4">
       Posts relevant to you
    </div>
  );
}

export default PublicUserSkill;
