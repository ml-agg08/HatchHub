import { useState, useEffect } from "react";
import api from "../api";
import Header from "./Header";

function ProfileView() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get("api/profile")
      .then((res) => {
        setProfile(res.data[0]);
      })
      .catch((err) => alert("Error fetching profile: " + err));
  }, []);

  if (!profile) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div>
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 shadow-sm space-y-6">
        {/* Avatar & Name */}
        <div className="flex items-center space-x-4">
          <div className="bg-rose-400 text-white w-14 h-14 flex items-center justify-center text-xl font-bold rounded-full">
            {profile.firstname?.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-rose-700">
              {profile.firstname} {profile.lastname}
            </h2>
            <p className="text-rose-500 text-sm">{profile.college}</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h4 className="text-sm font-medium text-rose-600">Bio</h4>
          <p className="text-gray-700">{profile.bio}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-2">
          <h4 className="text-sm font-medium text-rose-600">Skills</h4>
          {profile.skill.map((skillitem) => (
            <span
              key={skillitem.id}
              className="inline-block px-3 py-1 text-sm font-medium rounded-full 
               bg-rose-100 text-rose-600 border border-rose-200 shadow-sm"
            >
              {skillitem.skillname}
            </span>
          ))}
        </div>

        {/* Projects & Experience */}
        <div>
          <h4 className="text-sm font-medium text-rose-600">
            Projects & Experience
          </h4>
          <p className="text-gray-700">{profile.experience_projects}</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ProfileView;
