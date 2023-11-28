import React, { useContext, useEffect, useState } from "react";
import Profile from "../components/profile/Profile";
import { useHttpRequest } from "../shared/hooks/useHttpRequest";
import { AuthContext } from "../shared/context/auth-context";
import { url } from "../shared/util/url";

function ProfilePage() {
  // const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const authCtx = useContext(AuthContext);
  const [profile, setProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(url + `api/v1/profile/${authCtx.user.userId}`);
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        const initialState = {
          name: {
            value: data.profile[0]?.firstName,
            isValid: data.profile.length > 0 ? true : false,
          },
          lastname: {
            value: data.profile[0]?.lastName,
            isValid: data.profile.length > 0 ? true : false,
          },
          birthyear: {
            value: data.profile[0]?.birthYear,
            isValid: data.profile.length > 0 ? true : false,
          },
          birthcountry: {
            value: data.profile[0]?.country,
            isValid: data.profile.length > 0 ? true : false,
          },
          address: {
            value: data.profile[0]?.address,
            isValid: data.profile.length > 0 ? true : false,
          },
          isValid: data.profile.length > 0 ? true : false,
        };
        console.log(data);
        setProfile(initialState);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    getProfileData();
  }, []);

  if (!profile) return;

  return <Profile profile={profile} />;
}

export default ProfilePage;
