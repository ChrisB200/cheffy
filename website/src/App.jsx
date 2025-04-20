import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoutes from "./utils/protectedRoutes";
import Register from "./pages/RegisterPage/RegisterPage";
import { UserProvider } from "./contexts/UserContext";
import { useLoading, useTheme } from "./hooks/contexts";
import { useEffect } from "react";
import { NavbarProvider } from "./contexts/NavbarContext";
import RecipePage from "./pages/RecipePage/RecipePage";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

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
            <Route element={<ProtectedRoutes />}></Route>
          </Routes>
        </NavbarProvider>
      </UserProvider>
    </>
  );
}

export default App;
