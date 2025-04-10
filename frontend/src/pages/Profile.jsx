import { useState, useEffect } from "react";
import api from "../api";
import ProfileForm from "../components/ProfileForm";
import ProfileView from "../components/ProfileView";
import Header from "../components/Header";

function Profile() {
  const [hasProfile, setHasProfile] = useState(null);

  useEffect(() => {
    checkIfProfileExists();
  }, []);

  const checkIfProfileExists = () => {
    api
      .get("api/hasprofile/")
      .then((res) => {
        setHasProfile(res.data.length);
      })
      .catch((err) => {
        alert("Error checking profile: " + err);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {hasProfile === null ? (
          <div className="text-center text-gray-500">Loading profile...</div>
        ) : hasProfile === 0 ? (
          <ProfileForm />
        ) : (
          <ProfileView />
        )}
      </div>
    </div>
  );
}

export default Profile;
