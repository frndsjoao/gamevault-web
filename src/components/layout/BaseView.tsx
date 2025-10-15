import React from 'react'

export default function BaseView({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex min-h-screen items-center justify-center px-4'>
      <div className='mx-auto w-full max-w-6xl'>
        {children}
      </div>
    </main>
  )
}
