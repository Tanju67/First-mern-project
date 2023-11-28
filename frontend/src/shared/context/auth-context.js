import { createContext, useCallback, useEffect, useState } from "react";
import { url } from "../util/url";

export const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  getUser: () => {},
});

export const Provider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const loginHandler = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  const getUser = useCallback(async () => {
    try {
      const response = await fetch(url + `api/v1/auth/refetch`, {
        credentials: "include",
      });
      const data = await response.json();
      if (data.userId) {
        loginHandler(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        user: user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
