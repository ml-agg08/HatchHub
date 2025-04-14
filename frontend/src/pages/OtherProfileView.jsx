import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function OtherProfileView() {
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    GetOtherProfile();
  }, []);

  const [otherprofile, setOtherprofile] = useState([]);

  const GetOtherProfile = () => {
    api
      .get(`api/getspecific/${id}`)
      .then((res) => res.data)
      .then((data) => setOtherprofile(data))
      .catch((err) => alert(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-rose-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-rose-700 mb-4 text-center">
          User Profile
        </h2>
        <div className="space-y-3 text-rose-900">
          <p>
            <span className="font-medium">First Name:</span>{" "}
            {otherprofile[0]?.firstname}
          </p>
          <p>
            <span className="font-medium">Last Name:</span>{" "}
            {otherprofile[0]?.lastname}
          </p>
          <p>
            <span className="font-medium">Bio:</span> {otherprofile[0]?.bio}
          </p>

          {otherprofile[0]?.skill?.length > 0 && (
            <div>
              <h4 className="font-medium mb-1">Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {otherprofile[0].skill.map((skillitem) => (
                  <span
                    key={skillitem.id}
                    className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium shadow-sm hover:bg-rose-200 transition"
                  >
                    {skillitem.skillname}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p>
            <span className="font-medium">College:</span>{" "}
            {otherprofile[0]?.college}
          </p>
          <p>
            <span className="font-medium">Experience / Projects:</span>{" "}
            {otherprofile[0]?.experience_projects}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtherProfileView;
