import { useState } from "react";
import api from "../api";

function ApprovalForm({ approval_id, ListJoin, id, setShowapprovalformmessage }) {

  const [approval, setApproval] = useState({
    approval_text: "",
    status: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setApproval((prev) => ({ ...prev, [name]: value }));
  };

  const updateApproval = (approval_id) => {
    api
      .put(`/api/notes/${approval_id}/approvalproject/`, approval)
      .then(()=>
        {ListJoin(id);}
      ).then(()=>{
        setShowapprovalformmessage(true);

        setTimeout(() => {
          setShowapprovalformmessage(false);
        }, 2500);
      }).catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateApproval(approval_id);
        }}
        className="space-y-3"
      >
        <div>
          <label htmlFor="approval_text" className="block text-sm font-medium text-gray-700">
            Say something to the requester
          </label>
          <input
            type="text"
            id="approval_text"
            name="approval_text"
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="e.g. Looking forward to working with you!"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            <option value="">Select an option</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
        >
          Submit Approval
        </button>
      </form>
    </div>
  );
}

export default ApprovalForm;
