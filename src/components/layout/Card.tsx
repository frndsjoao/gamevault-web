import React from 'react'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-lg rounded-lg bg-bg_card p-10 shadow-md">
      {children}
    </div>
  )
}
