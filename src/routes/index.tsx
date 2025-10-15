import { BrowserRouter as RouterDom, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';

export default function Router() {
  return (
    <RouterDom>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </RouterDom>
  )
}
