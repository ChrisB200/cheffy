import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoutes from "./utils/protectedRoutes";
import Register from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoutes />}>
      </Route>
    </Routes>
  );
}

export default App;
