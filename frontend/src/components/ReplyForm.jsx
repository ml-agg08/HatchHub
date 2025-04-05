import { useState } from "react";
import api from "../api";

function ReplyForm({note,refreshNote}){

    const [contentReply,setContentReply]=useState("");

    const createReply=(id)=>{
        api.post(`api/notes/${id}/replies/`,{'content':contentReply}).then(()=>{refreshNote(id)}).catch((err)=>{alert(err)});
    }
    
    return <>
        <form onSubmit={(e)=>{e.preventDefault();createReply(note.id)}}>
            <label htmlFor="contentreply">Reply content:</label>
            <input type="text" name="contentreply" id="contentreply" onChange={(e)=>{setContentReply(e.target.value)}}/>
            <button type="submit">add a reply</button>
        </form>
    </>
}

export default ReplyForm