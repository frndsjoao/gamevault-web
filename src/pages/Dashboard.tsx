import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = {
    name: "João Pedro Assunção",
    email: "jfernandees002@gmail.com",
    password: "qweqweqwe",
    birthDate: "2025-10-02",
    preferredPlatform: "PlayStation 5"
  }

  return (
    <div className='flex flex-row'>
      <Sidebar />

      <MainContent user={user} setSidebarOpen={setSidebarOpen}>
        <p>Hello</p>
      </MainContent>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}