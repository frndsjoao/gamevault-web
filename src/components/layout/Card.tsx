import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}

export default function Card(props: CardProps) {
  return (
    <div className={`${props.className} mx-auto max-w-lg rounded-2xl bg-bg-dark p-8 shadow-md border border-border`}>
      {props.children}
    </div>
  )
}
