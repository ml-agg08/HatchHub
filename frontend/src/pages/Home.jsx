import { useState,useEffect } from "react"
import api from "../api";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import Test from "../components/test";

function Home(){ 
    const [toggle,setToggle]=useState("public");
    const [notes,setNotes]=useState([]);

    useEffect(()=>{
        getPublicNotes();
    },[]);


    const getNotes=()=>{
        api.get('/api/notes/').then((res)=>{console.log(res.data);return res.data}).then((data)=>{setNotes(data)}).catch((err)=>alert(err));
    };

    const getPublicNotes=()=>{
        api.get('/api/notes/public').then((res)=>{console.log(res.data);return res.data}).then((data)=>{setNotes(data)}).catch((err)=>alert(err));
    };

    let show=true;

    return <>
    <h1>Home</h1>

    {show?<Test/>:<h1>hi</h1>}

    <NoteList notes={notes} refreshNote={toggle==='public'?getPublicNotes:getNotes} status={toggle}/>

    <NoteForm refreshNote={toggle==='public'?getPublicNotes:getNotes}/>

    <button onClick={()=>{
        if(toggle=='public'){
            setToggle('private');
            getNotes();
        }
        else{
            setToggle('public');
            getPublicNotes();
        }
    }}>{'change view'}</button>
    <h6>{`Currently showing ${toggle} view`}</h6>
    
    <h5>{toggle==='public'? "Here you can read other maker's project ideas, reply to them, give opinons, and also if you're intrested you may request a 'join the project'" : "Here you can see your ideas posted and people's response to that"}</h5>

    </>
}

export default Home