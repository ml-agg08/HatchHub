import { useEffect, useState } from "react";
import api from "../api";
import ViewSingleNote from "../components/ViewSingleNote";

function MyJoinRequests() {
  const [myjoinrequests, setMyjoinrequests] = useState([]);
  const [status, setStatus]=useState('Pending');

  useEffect(()=>{
    viewRequests();
  },[]);

  useEffect(()=>{
    viewRequests();
  },[status])

  const viewRequests = () => {
    api
      .get(`api/viewrequests/${status}`)
      .then((res) => res.data)
      .then((data) => {console.log(data);setMyjoinrequests(data);})
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>

      <select onChange={(e)=>(setStatus(e.target.value))}>
        <option value="Pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      {myjoinrequests.map((req) => (
        <div key={req.id}>
          <h6>Project request message sent by you:{req.text}</h6>
          <h4>Message sent by the project owner to you: {req.approval_text}</h4>
          <h4>Approval status: {req.status}</h4>
          <ViewSingleNote id={req.note} />
        </div>
      ))}
      ;
    </div>
  );
}
export default MyJoinRequests;
