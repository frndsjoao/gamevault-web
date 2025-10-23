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
      </Routes>
    </RouterDom>
  )
}
