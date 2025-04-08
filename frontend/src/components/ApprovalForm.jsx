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

        <select name="status" id="" onChange={handleChange}>
          <option value="approved">Approve</option>
          <option value="rejected">Reject</option>
        </select>

        <button onClick={()=>{updateApproval(approval_id)}}>Give approval</button>
      </form>


    </div>
  );
}
export default ApprovalForm;
