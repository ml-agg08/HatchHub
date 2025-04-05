import { useState } from "react";
import api from "../api";

function MyJoinRequests() {
  const [myjoinrequests, setMyjoinrequests] = useState([]);
  const [singlenote, setSinglenote] = useState([]);

  const viewRequests = () => {
    api
      .get("api/viewrequests/")
      .then((res) => res.data)
      .then((data) => setMyjoinrequests(data))
      .catch((err) => {
        alert(err);
      });
  };

  const singleNote = (id) => {
    api
      .get(`api/singlenoteview/${id}/`)
      .then((res) => res.data)
      .then((data) => {
        setSinglenote(data);
        console.log(singlenote);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <button onClick={viewRequests}>see my project request</button>
      <button
        onClick={() => {
          singleNote(42);
        }}
      >
        see the note
      </button>
      {myjoinrequests.map((req) => (
        <div key={req.id}>
          <h6>Project request message sent by you:{req?.text}</h6>
          <h4>
            Message sent by the project owner to you: {req.approval_text}
          </h4>
          <h4>Approval status: {req.status}</h4>
        </div>
      ))}
      ;
    </div>
  );
}
export default MyJoinRequests;
