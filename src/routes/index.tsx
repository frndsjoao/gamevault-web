import React from 'react'
import { BrowserRouter as RouterDom, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';

export default function Router() {
  return (
    <RouterDom>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </RouterDom>)
}
