import { useState,useEffect } from "react"
import api from "../api";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";

function Home(){ 
    /*const [toggle,setToggle]=useState("public");*/
    const [notes,setNotes]=useState([]);
    const [skills,setSkills]=useState([]);
    const [selectedskill,setSelectedskill]=useState('');

    useEffect(()=>{
        getPublicNotes();
    },[]);

    useEffect(()=>{
        GetSkills();
    },[]);


    useEffect(() => {
        if (selectedskill) {
          getNotesBySkill(selectedskill);
        }
      }, [selectedskill]);
      

    const getPublicNotes=(skill)=>{
        api.get('/api/notes/public').then((res)=>{console.log(res.data);return res.data}).then((data)=>{setNotes(data)}).catch((err)=>alert(err));
    };

    const getNotesBySkill=(selectedskill)=>{
        {console.log(selectedskill)}
        api.get(`/api/notes/public/${selectedskill}`).then((res)=>(res.data)).then((data)=>(setNotes(data))).catch((err)=>{alert(err)});
    }

    const GetSkills=()=>{
        api.get('/api/getskills/').then((res)=>(res.data)).then((data)=>(setSkills(data))).catch((err)=>{alert(err)});
    }

    const GetUserSkill=()=>{
        api.get('/api/getuserskill/').then((res)=>(res.data)).then((data)=>(setSelectedskill(data[0].skill))).catch((err)=>{alert(err)});
    }


    return <>
    <h1>Home</h1>

    <button onClick={GetUserSkill}>See relevant posts only</button>


    
    <select onChange={(e)=>setSelectedskill(e.target.value)}>
        <option value="">Select a skill</option>  
        {skills.map((skill,index)=>(
            <option key={index} value={skill.tag}>
                {skill.tag}
            </option>
        ))}
    </select>
    <h6>you've selected : {selectedskill}</h6>
    <button onClick={()=>{getNotesBySkill(selectedskill)}}>Filter!</button>


    <NoteList notes={notes} refreshNote={getNotesBySkill} skill={selectedskill} status={'public'}/>

    <NoteForm refreshNote={getNotesBySkill} skill={selectedskill}/>
   
    <h5>Here you can read other maker's project ideas, reply to them, give opinons, and also if you're intrested you may request a 'join the project'</h5>

    </>
}

export default Home