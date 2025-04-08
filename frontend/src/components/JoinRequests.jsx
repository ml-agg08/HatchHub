import { useState } from "react";
import api from "../api";
import ApprovalForm from "./ApprovalForm";
import { useNavigate } from "react-router-dom";

function JoinRequests({ note,status }) {
  const [text, setText] = useState("");

  const [joinrequests, setJoinrequests] = useState([]);

  const navigate=useNavigate();

  const ApplyJoin = (id) => {
    api.post(`api/notes/${id}/joinproject/`, { text: text }).catch((err) => {
      alert(err);
    });
  };

  const ListJoin = (id) => {
    api
      .get(`api/notes/${id}/joinproject/`)
      .then((res) => {
        console.log(res.data);
        setJoinrequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {status === "private" ? (
        <div>
          <button
            onClick={() => {
              ListJoin(note.id);
            }}
          >
            See Join Requests
          </button>
          {joinrequests.map((joinrequest) => (
            <div key={joinrequest.id}>
              <button onClick={()=>{navigate(`/profileother/${joinrequest.owner}`)}}>see profile</button>
              <h6>This project join request is {joinrequest.status}</h6>
              <h6>{joinrequest.text}</h6>
              {joinrequest.status==='Pending'?<ApprovalForm approval_id={joinrequest.id}/>:null}
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={(e) => {e.preventDefault();ApplyJoin(note.id);}}>
          <label htmlFor="text">Do you want to add anything?</label>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button type="submit">Join the project</button>
        </form>
      )}
    </div>
  );
}
export default JoinRequests;
