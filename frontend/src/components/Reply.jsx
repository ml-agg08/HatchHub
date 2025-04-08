import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Reply({id,refreshNote,replies}){

    const navigate=useNavigate();

    return <>

    {replies.map((reply)=>(
        <div>
            <h4>{reply.content}</h4>
            <button onClick={()=>{navigate(`/profileother/${reply.author}`)}}>see profile of person who made this reply</button>
        </div>
     ))}

    <button onClick={()=>{refreshNote(id)}}>See replies</button>

    </>
}
export default Reply
