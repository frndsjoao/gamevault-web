export default function DumbGameCover({ className }: { className: string }) {
  return (
    <div className={`bg-gray-900 flex items-center justify-center shadow-lg ${className}`}>
      <span className='text-xl font-extrabold text-text-light'>?</span>
    </div>
  )
}
