import { useState,useEffect } from "react";
import api from "../api";
import ProfileForm from "../components/ProfileForm";
import ProfileView from "../components/ProfileView";

function Profile() {
  const [hasprofile, setHasprofile] = useState(null);
  useEffect(() => {
    hasprf();
  }, [hasprofile]);

  function hasprf() {
    api
      .get("api/hasprofile/")
      .then((res) => {
        setHasprofile(res.data.length);
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    hasprofile==0?<ProfileForm />:<ProfileView />
  )
}
export default Profile;
