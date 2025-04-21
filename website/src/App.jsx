import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import RecipePage from "./pages/RecipePage/RecipePage";
import ProtectedRoutes from "./utils/protectedRoutes";
import Register from "./pages/RegisterPage/RegisterPage";
import BookmarksPage from "./pages/BookmarksPage/BookmarksPage";
import { UserProvider } from "./contexts/UserContext";
import { useLoading, useTheme } from "./hooks/contexts";
import { useEffect } from "react";
import { NavbarProvider } from "./contexts/NavbarContext";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const { theme } = useTheme();
  const { loading } = useLoading();

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.remove(theme === "dark" ? "light" : "dark");
    body.classList.add(theme);
  }, [theme]);

  return (
    <>
      {loading ? <LoadingScreen /> : ""}
      <UserProvider>
        <NavbarProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:userId/:recipeId" element={<RecipePage />} />
            <Route path="/profile/:username" element={<ProfilePage/>}/>
            <Route element={<ProtectedRoutes />}>
              <Route path="/bookmarks" element={<BookmarksPage/>}/>
            </Route>
          </Routes>
        </NavbarProvider>
      </UserProvider>
    </>
  );
}

export default App;
