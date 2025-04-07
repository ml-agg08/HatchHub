import { useState,useEffect } from "react"
import api from "../api";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import PublicSkillView from "../components/PublicSkillView";
import PublicUserSkill from "../components/PublicUserSkill";

function Home(){ 
    const [notes,setNotes]=useState([]);
    const [skills,setSkills]=useState([]);
    const [selectedskill,setSelectedskill]=useState('');
    const [publicmode,setPublicmode]=useState('publicall')

    useEffect(()=>{
        getPublicNotes();
    },[]);

    useEffect(() => {
        if (publicmode === 'publicall') {
            getPublicNotes();
        }
    }, [publicmode]); 
    

    const getPublicNotes=(skill)=>{
        api.get('/api/notes/public').then((res)=>{console.log(res.data);return res.data}).then((data)=>{setNotes(data)}).catch((err)=>alert(err));
    };

    const getNotesBySkill = (selectedskill) => {
        {
          console.log(selectedskill);
        }
        api
          .get(`/api/notes/public/${selectedskill}`)
          .then((res) => res.data)
          .then((data) => setNotes(data))
          .catch((err) => {
            alert(err);
          });
      };
       
      let refreshNote;
      if (publicmode === 'publicskill' || publicmode === 'publicuserskill') {
        refreshNote = getNotesBySkill;
      } else {
        refreshNote = getPublicNotes;
      }      

    return <>  

    <h1>Home</h1>

    <button onClick={()=>setPublicmode('publicall')}>Public All</button>   
    <button onClick={()=>setPublicmode('publicskill')}>Skill Based</button>
    <button onClick={()=>setPublicmode('publicuserskill')}>User relevant</button>

    {publicmode=='publicskill'?(
        <PublicSkillView notes={notes} setNotes={setNotes} skills={skills} setSkills={setSkills} selectedskill={selectedskill} setSelectedskill={setSelectedskill} getNotesBySkill={getNotesBySkill}/>  
    ):(
        publicmode=='publicuserskill'?(
            <PublicUserSkill notes={notes} setNotes={setNotes} selectedskill={selectedskill} setSelectedskill={setSelectedskill} getNotesBySkill={getNotesBySkill}/> 
        ):(
            null
        )
    )
    }

    <h3>PUBLIC VIEW MODE YOU'RE CURRENTLY WATCHING: {publicmode}</h3>

    <NoteList notes={notes} refreshNote={refreshNote} skill={selectedskill} status={'public'}/>

    <NoteForm refreshNote={refreshNote} skill={selectedskill}/>
   
    <h5>Here you can read other maker's project ideas, reply to them, give opinons, and also if you're intrested you may request a 'join the project'</h5>

    </>
}

export default Home