import {
  BrowserRouter as RouterDom,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from "./PrivateRoute"
import SignUp from "@/pages/SignUp"
import Gamelist from "@/pages/Gamelist"

export default function Router() {
  return (
    <RouterDom>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/games"
          element={<PrivateRoute element={<Gamelist />} />}
        />
      </Routes>
    </RouterDom>
  )
}
