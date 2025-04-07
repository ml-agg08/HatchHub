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
        console.log(singlenote);
      })
      .catch((err) => {
        alert(err);
      });
  };


  return (
    <div>

        <button
            onClick={() => {
              singleNote(id);
            }}
        >
        see the note
        </button>

        <h5>your note here:</h5>
        <h5>{singlenote[0]?.title}</h5>
        <h5>{singlenote[0]?.content}</h5>
    </div>
  );
}
export default ViewSingleNote;
