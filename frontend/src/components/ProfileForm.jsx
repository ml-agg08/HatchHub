import { useState } from "react";
import api from "../api";

function ProfileForm(){

    const [profile,setProfile]=useState({
        firstname:'',
        lastname:'',
        bio:'',
        college:'',
        skill:'',
        experience_projects:'',
    })

    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setProfile((prev)=>({...prev,[name]:value}));
    }

    const createProfile=()=>{
        console.log(profile)
        api.post('api/profile/',profile).catch((err)=>{alert(err)});
      }    

    return <>
      <form onSubmit={(e)=>{createProfile()}}>
        <label htmlFor="fname">Firstname</label>
        <input type="text" id="fname" name="firstname" onChange={handleChange}/>
        <label htmlFor="fname">Lastname</label>
        <input type="text" id="fname" name="lastname" onChange={handleChange}/>
        <label htmlFor="bio">Bio</label>
        <input type="text" id="bio" name="bio" onChange={handleChange}/>
        <label htmlFor="college">College</label>
        <input type="text" id="college" name="college" onChange={handleChange}/>
        <label htmlFor="skill">Skill</label>
        <input type="text" id="skill" name="skill" onChange={handleChange}/>
        <label htmlFor="exp">Experiences & Projects</label>
        <input type="text" id="fname" name="experience_projects" onChange={handleChange}/>
        <button type="submit">Create</button>
      </form>
    </>
}
export default ProfileForm