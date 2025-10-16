import React, { useState } from 'react';
import { Menu, X, Home, ShoppingCart, Package, Users, TrendingUp, Settings } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

const recentSales = [
  { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
  { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
  { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
  { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
  { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
];

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
    <>
      <Sidebar />
    </>
    // <div className="flex h-screen">
    //   {/* Sidebar */}
    //   <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 lg:static`}>
    //     <div className="flex items-center justify-between border-b border-gray-200 p-6">
    //       <h1 className="text-xl font-bold">Dashboard</h1>
    //       <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
    //         <X size={24} />
    //       </button>
    //     </div>
    //     <nav className="space-y-2 p-4">
    //       {navItems.map((item, idx) => (
    //         <button
    //           key={idx}
    //           className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors ${item.active
    //             ? 'bg-gray-100 text-gray-900'
    //             : 'text-gray-600 hover:bg-gray-50'
    //             }`}
    //         >
    //           <item.icon size={20} className="mr-3" />
    //           <span>{item.label}</span>
    //         </button>
    //       ))}
    //     </nav>
    //     <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
    //       <button className="flex w-full items-center rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50">
    //         <Settings size={20} className="mr-3" />
    //         <span>Settings</span>
    //       </button>
    //     </div>
    //   </aside>

    //   {/* Main Content */}
    //   <div className="flex flex-1 flex-col overflow-hidden">
    //     {/* Header */}
    //     <header className="border-b border-gray-200 bg-white p-4 lg:p-6">
    //       <div className="flex items-center justify-between">
    //         <button
    //           onClick={() => setSidebarOpen(true)}
    //           className="lg:hidden"
    //         >
    //           <Menu size={24} />
    //         </button>
    //         <h2 className="text-2xl font-bold">Dashboard</h2>
    //         <div className="flex items-center space-x-4">
    //           <div className="h-10 w-10 rounded-full bg-gray-300"></div>
    //         </div>
    //       </div>
    //     </header>

    //     {/* Main Content Area */}
    //     <main className="flex-1 overflow-y-auto p-4 lg:p-6">
    //       {/* Stats Cards */}
    //       <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Total Revenue</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">$45,231.89</div>
    //           <p className="mt-1 text-xs text-gray-500">+20.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Subscriptions</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+2,350</div>
    //           <p className="mt-1 text-xs text-gray-500">+180.1% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Sales</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+12,234</div>
    //           <p className="mt-1 text-xs text-gray-500">+19% from last month</p>
    //         </div>

    //         <div className="rounded-lg border border-gray-200 bg-white p-6">
    //           <div className="mb-2 flex items-center justify-between">
    //             <p className="text-sm font-medium text-gray-600">Active Now</p>
    //             <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    //             </svg>
    //           </div>
    //           <div className="text-2xl font-bold">+573</div>
    //           <p className="mt-1 text-xs text-gray-500">+201 since last hour</p>
    //         </div>
    //       </div>

    //       {/* Recent Sales */}
    //       <div className="rounded-lg border border-gray-200 bg-white p-6">
    //         <h3 className="mb-4 text-lg font-semibold">Recent Sales</h3>
    //         <p className="mb-4 text-sm text-gray-500">You made 265 sales this month.</p>
    //         <div className="space-y-4">
    //           {recentSales.map((sale, idx) => (
    //             <div key={idx} className="flex items-center">
    //               <div className="mr-3 h-10 w-10 rounded-full bg-gray-200"></div>
    //               <div className="flex-1">
    //                 <p className="text-sm font-medium">{sale.name}</p>
    //                 <p className="text-xs text-gray-500">{sale.email}</p>
    //               </div>
    //               <div className="text-sm font-medium">{sale.amount}</div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     </main>
    //   </div>

    //   {/* Overlay for mobile */}
    //   {sidebarOpen && (
    //     <div
    //       className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
    //       onClick={() => setSidebarOpen(false)}
    //     ></div>
    //   )}
    // </div>
  );
}