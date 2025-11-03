import {
  BrowserRouter as RouterDom,
  Routes,
  Route,
} from "react-router-dom"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import SignUp from "@/pages/SignUp"
import Gamelist from "@/pages/Gamelist"
import AuthRedirect from "./AuthRedirect"

export default function Router() {
  return (
    <RouterDom>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/signin" element={<PublicRoute element={<Login />} />} />
        <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
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
