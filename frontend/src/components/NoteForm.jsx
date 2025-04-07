import { useState } from "react";
import api from "../api";

function NoteForm({refreshNote,skill}) {

    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [tag,setTag]=useState("");

    const createNote=(e)=>{
        e.preventDefault()
        api.post("/api/notes/",{'title':title,'content':content,'tag':tag}).then(()=>{refreshNote(skill)}).catch((err)=>{alert(err)});
    }

  return (
    <>
      <form onSubmit={createNote}>
        <label htmlFor="title">Ttile: </label>
        <input
          id="title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <br />
        <label htmlFor="tag">Tag:</label>
        <input
          type="text"
          id="tag"
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
        <br />
        <button type="submit">create!</button>
      </form>
    </>
  );
}
export default NoteForm;
