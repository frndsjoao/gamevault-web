import React, { useState } from 'react';
import { Menu, X, Home, ShoppingCart, Package, Users, TrendingUp, Settings } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: ShoppingCart, label: 'Orders' },
    { icon: Package, label: 'Products' },
    { icon: Users, label: 'Customers' },
    { icon: TrendingUp, label: 'Analytics' },
  ];

  return (
    <div className='flex flex-row'>
      <Sidebar />

      <MainContent header='Backlog'>
        <p>Hello</p>
      </MainContent>
    </div>
  )
}