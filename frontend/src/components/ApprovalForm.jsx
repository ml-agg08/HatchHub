import { useState } from "react";
import api from "../api";
function ApprovalForm({ approval_id }) {
  const [approval, setApproval] = useState({
    approval_text: "",
    status: "",
  });

  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;

    setApproval((prev)=>({...prev,[name]:value}));
  }

  const updateApproval=(approval_id)=>{
    api.put(`/api/notes/${approval_id}/approvalproject/`,approval).catch((err)=>{alert(err)});
  }

  return (
    <div>
      <form onSubmit={(e)=>{
        e.preventDefault();
      }}>
        <label htmlFor="approval_text">Want to say anything</label>
        <input type="text" id='approval_text' name="approval_text" onChange={handleChange} />
        <label htmlFor="status">Do you approve this?</label>
        <input type="text" id='status' name="status" onChange={handleChange}/>
        <button onClick={()=>{updateApproval(approval_id)}}>Give approval</button>
      </form>
    </div>
  );
}
export default ApprovalForm;
