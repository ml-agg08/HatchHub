import api from "../api";
import JoinRequests from "./JoinRequests";
import Reply from "./Reply";
import ReplyForm from "./ReplyForm";
import { useState } from "react";

function Note({note,refreshNote,skill,status}){

    const [replies,setReplies]=useState([]);

    const deleteNote=(id)=>{
        api.delete(`api/notes/delete/${id}/`).then(()=>{refreshNote(skill)}).catch((err)=>{alert(err)});
    }

    const getReplies=(id)=>{
        api.get(`api/notes/${id}/replies/`).then((res)=>res.data).then((data)=>{setReplies(data)}).catch((err)=>{alert(err)});
    }

    return <>
        <h1>{note.title}</h1>
        <h4>{note.content}</h4>
        <h6>{note.id}</h6>
        <h6>{note.tag}</h6>
        <button onClick={()=>{deleteNote(note.id)}}>delete!</button>
        <br />
        <br />

        <JoinRequests note={note} status={status}/>

        <ReplyForm note={note} refreshNote={getReplies} />
        <Reply id={note.id} refreshNote={getReplies} replies={replies}/>
    </>
}

export default Note