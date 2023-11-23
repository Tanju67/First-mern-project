import { createContext, useEffect, useState } from "react";
import { url } from "../util/url";

export const AuthContext = createContext({
  userId: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  getUser: () => {},
});

export const Provider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const loginHandler = (uid) => {
    setUserId(uid);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setUserId(null);
    setIsLoggedIn(false);
  };

  const getUser = async () => {
    try {
      const response = await fetch(url + `api/v1/auth/refetch`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.userId) {
        loginHandler(data.userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        getUser: getUser,
        userId: userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
