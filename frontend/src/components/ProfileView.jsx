import { useState } from "react";
import api from "../api";
import { useEffect } from "react";

function ProfileView(){

    const [prf,setPrf]=useState([])

    const getProfile=()=>{
      api.get('api/profile').then((res)=>(res.data)).then((data)=>(setPrf(data))).then(console.log(prf)).catch((err)=>{alert(err)});
    }  

    const [profiletoggle,setProfiletoggle]=useState(false)

    function profileToggleHandler(){
        if(profiletoggle===false){
            setProfiletoggle(true);
        }
        else{
            setProfiletoggle(false);
        }
    }

    useEffect(()=>{getProfile()},[]);


    return <>

    {profiletoggle && 
        <div>
            <h4>{prf[0].firstname} {prf[0].lastname}</h4>
            <h4>{prf[0].bio}</h4>
            <h4>{prf[0].skill}</h4>
            <h4>{prf[0].college}</h4>
            <h4>{prf[0].experience_projects}</h4>
            <h4>{prf[0].bio}</h4>
        </div>
    }

    <button onClick={profileToggleHandler}>View your profile!!</button>

    </>
}

export default ProfileView