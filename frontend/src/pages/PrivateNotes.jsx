import { useEffect, useState } from "react"
import api from "../api";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";

function PrivateNotes(){

    const [notes,setNotes]=useState([]);

    const skill=''

    const getNotes=(skill)=>{
        api.get('/api/notes/').then((res)=>{console.log(res.data);return res.data}).then((data)=>{setNotes(data)}).catch((err)=>alert(err));
    };

    useEffect(()=>{
        getNotes(skill);
    },[]);

    return <div>

        <h1>YOUR OWN NOTES:</h1>

        <NoteList notes={notes} refreshNote={getNotes} skill={skill} status={'private'}/>

        <NoteForm refreshNote={getNotes}/>

        <h4>here you can see you notes, to see peeapls replies, vaidations and join requests and can approve em</h4>

    </div>
}
export default PrivateNotes