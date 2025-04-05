import { useState } from "react";
import api from "../api";

function Reply({id,refreshNote,replies}){

    return <>

    {replies.map((reply)=>(
        <div>
            <h4>{reply.content}</h4>
        </div>
     ))}

    <button onClick={()=>{refreshNote(id)}}>See replies</button>

    </>
}
export default Reply
