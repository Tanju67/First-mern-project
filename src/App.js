import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyPlacesPage from "./pages/MyPlacesPage";
import PlacesPage from "./pages/PlacesPage";
import PageNotFound from "./pages/PageNotFound";
import MainNavigation from "./shared/Navigation/MainNavigation";
import PlaceDetailPage from "./pages/PlaceDetailPage";

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/places/:pid" element={<PlaceDetailPage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/myplaces" element={<MyPlacesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
