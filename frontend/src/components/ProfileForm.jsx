import { useState } from "react";
import api from "../api";

function ProfileForm() {
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    bio: '',
    college: '',
    skill: '',
    experience_projects: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const createProfile = (e) => {
    e.preventDefault();
    console.log(profile);
    api.post('api/profile/', profile).catch((err) => {
      alert(err);
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-rose-50 border border-rose-100 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-rose-600 mb-6">Create your profile</h2>
      <form onSubmit={createProfile} className="space-y-4">
        {/* Firstname */}
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-rose-500">Firstname</label>
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
          <label htmlFor="lastname" className="block text-sm font-medium text-rose-500">Lastname</label>
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
          <label htmlFor="bio" className="block text-sm font-medium text-rose-500">Bio</label>
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
          <label htmlFor="college" className="block text-sm font-medium text-rose-500">College</label>
          <input
            type="text"
            id="college"
            name="college"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
          />
        </div>

        {/* Skill */}
        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-rose-500">Skill</label>
          <input
            type="text"
            id="skill"
            name="skill"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
          />
        </div>

        {/* Experience & Projects */}
        <div>
          <label htmlFor="experience_projects" className="block text-sm font-medium text-rose-500">Experiences & Projects</label>
          <input
            type="text"
            id="experience_projects"
            name="experience_projects"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-rose-400 focus:border-rose-400"
          />
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
  );
}

export default ProfileForm;
