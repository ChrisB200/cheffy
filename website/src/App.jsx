import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoutes from "./utils/protectedRoutes";
import Register from "./pages/RegisterPage/RegisterPage";
import { CacheProvider } from "./contexts/CacheContext";
import { UserProvider } from "./contexts/UserContext";
import { useTheme } from "./hooks/contexts";
import { useEffect } from "react";
import { NavbarProvider } from "./contexts/NavbarContext";
import RecipePage from "./pages/RecipePage/RecipePage";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.remove(theme === "dark" ? "light": "dark");
    console.log(theme)
    body.classList.add(theme)
  }, [theme])

  return (
    <CacheProvider>
      <UserProvider>
        <NavbarProvider>
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:userId/:recipeId" element={<RecipePage/>}/>
            <Route element={<ProtectedRoutes />}>
            </Route>
          </Routes>
        </NavbarProvider>
      </UserProvider>
    </CacheProvider>
  );
}

export default App;
