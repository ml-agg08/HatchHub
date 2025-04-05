import { useEffect, useState } from "react";
import api from "../api";
import { Navigate } from "react-router-dom";

function HasProfile({children}){

    const[hasprofile,setHasprofile]=useState(null);
    useEffect(()=>{
        hasprf();
    },[]);

    function hasprf(){
        api.get('api/hasprofile/').then((res)=>{setHasprofile(res.data.length)}).catch((err)=>{alert(err)});
    }

    console.log(hasprofile);
    return hasprofile==0?<Navigate to='/profile'/>:children
}
export default HasProfile;