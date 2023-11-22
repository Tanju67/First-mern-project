import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPlacesPage from "./pages/UserPlacesPage";
import PlacesPage from "./pages/PlacesPage";
import PageNotFound from "./pages/PageNotFound";
import MainNavigation from "./shared/Navigation/MainNavigation";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import AddPlacePage from "./pages/AddPlacePage";
import UpdatePlacePage from "./pages/UpdatePlacePage";
import { AuthContext } from "./shared/context/auth-context";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import { url } from "./shared/util/url";

function App() {
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
      const response = await fetch(url + `api/v1/auth/fetch`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="/places/:pid" element={<PlaceDetailPage />} />
        <Route path="/user-places/:uid" element={<UserPlacesPage />} />
        <Route path="/user-places/edit/:pid" element={<UpdatePlacePage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/profile/:uid" element={<ProfilePage />} />
        <Route path="/add-place" element={<AddPlacePage />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <Routes>{routes}</Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
