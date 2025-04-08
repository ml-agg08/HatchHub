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
<div>
  <h4>First Name: {otherprofile[0]?.firstname}</h4>
  <h4>Last Name: {otherprofile[0]?.lastname}</h4>
  <h4>Bio: {otherprofile[0]?.bio}</h4>
  <h4>Skill: {otherprofile[0]?.skill}</h4>
  <h4>College: {otherprofile[0]?.college}</h4>
  <h4>Experience / Projects: {otherprofile[0]?.experience_projects}</h4>
</div>

  );
}

export default OtherProfileView;
