import { useEffect, useState } from "react";
import api from "../api";
import Header from "./Header";

function ProfileForm() {
  useEffect(() => {
    ListSkillsAll();
  }, []);

  const [skillsall, setSkillsall] = useState([]);

  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    college: "",
    skill_ids: [],
    experience_projects: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const createProfile = (e) => {
    console.log(profile);
    api.post("api/profile/", profile).catch((err) => {
      alert(err);
    });
  };

  const ListSkillsAll = () => {
    api
      .get("api/skills")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setSkillsall(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const toggleChangeSkill = (id) => {
    console.log(id);
    setProfile((prev) => ({
      ...prev,
      skill_ids: prev.skill_ids.includes(id)
        ? prev.skill_ids.filter((sid) => sid != id)
        : [...prev.skill_ids, id],
    }));
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-10 bg-rose-50 border border-rose-100 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-rose-600 mb-6">
          Create your profile
        </h2>
        <form onSubmit={createProfile} className="space-y-4">
          {/* Firstname */}
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-rose-500"
            >
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
            />
          </div>

          {/* Lastname */}
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-rose-500"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
            />
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-rose-500"
            >
              Bio
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
            />
          </div>

          {/* College */}
          <div>
            <label
              htmlFor="college"
              className="block text-sm font-medium text-rose-500"
            >
              College
            </label>
            <input
              type="text"
              id="college"
              name="college"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
            />
          </div>

          {/* Experience & Projects */}
          <div>
            <label
              htmlFor="experience_projects"
              className="block text-sm font-medium text-rose-500"
            >
              Experiences & Projects
            </label>
            <input
              type="text"
              id="experience_projects"
              name="experience_projects"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
            />
          </div>

          <div>
            <h2 className="text-lg font-medium text-rose-600 mb-2">
              Select Skills:
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsall.map((skill) => {
                const isSelected = profile.skill_ids.includes(skill.id);
                return (
                  <label
                    key={skill.id}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm font-medium border ${
                      isSelected
                        ? "bg-rose-400 text-white border-rose-400"
                        : "bg-white text-rose-600 border-rose-300 hover:bg-rose-100"
                    } transition`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleChangeSkill(skill.id)}
                      className="hidden"
                    />
                    {skill.skillname}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-rose-400 hover:bg-rose-500 text-white py-2 px-4 rounded-md transition"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
