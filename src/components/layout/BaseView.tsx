import React from 'react'

export default function BaseView({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg-zinc-900 min-h-screen flex items-center justify-center px-4'>
      <div className=' max-w-6xl mx-auto bg-zinc-50 w-full'>
        {children}
      </div>
    </main>
  )
}
