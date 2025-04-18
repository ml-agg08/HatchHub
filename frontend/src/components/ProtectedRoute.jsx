import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";

function ProtectedRoute({ children }) {
  const [hasProfile, setHasProfile] = useState(null);

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

  useEffect(() => {
    checkIfProfileExists();
  }, []);

  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh", {
        refresh: refreshToken,
      });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    console.log(
      "congrats ur authorised, but let's if ur access token has expired!"
    );
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      console.log(now);
      console.log(tokenExpiration);
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };

  if (isAuthorized == null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? (
    <div>
      <div>
        {hasProfile === null ? (
          <div>Loading...</div>
        ) : hasProfile === 0 ? (
          <ProfileForm />
        ) : (
          <div>
            {hasProfile === null ? (
              <div>Loading</div>
            ) : hasProfile === 0 ? (
              <ProfileForm />
            ) : (
              children
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
