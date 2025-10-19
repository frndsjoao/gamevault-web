import { ReactNode, useRef, useState, useEffect } from 'react'
import Icon from './Icon'

interface CarouselProps {
  children: ReactNode
  title?: string
}

export default function Carousel({ children, title }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = container.offsetWidth * 0.8
    const targetScroll = direction === 'left'
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  const updateArrows = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const hasScroll = container.scrollWidth > container.offsetWidth

    if (!hasScroll) {
      setShowLeftArrow(false)
      setShowRightArrow(false)
      return
    }

    setShowLeftArrow(container.scrollLeft > 10)
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.offsetWidth - 10
    )
  }

  const handleScroll = () => {
    updateArrows()
  }

  useEffect(() => {
    updateArrows()

    const container = scrollContainerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver(() => {
      updateArrows()
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [children])

  return (
    <div className='relative w-full overflow-hidden'>
      {title && (
        <h2 className='mb-4 text-xl font-semibold text-text-light md:text-2xl'>{title}</h2>
      )}

      <div className='group relative overflow-hidden'>
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className='absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-black/80 to-transparent px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:px-4'
            aria-label='Scroll left'
          >
            <div className='rounded-full bg-black/60 p-1 transition-all hover:scale-110 hover:bg-black/80 md:p-2'>
              <Icon name="chevron-left" className='size-5 text-white md:size-6' />
            </div>
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className='scrollbar-hide flex gap-3 overflow-x-scroll md:gap-4'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflowY: 'hidden',
          }}
        >
          {children}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className='absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-black/80 to-transparent px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:px-4'
            aria-label='Scroll right'
          >
            <div className='rounded-full bg-black/60 p-1 transition-all hover:scale-110 hover:bg-black/80 md:p-2'>
              <Icon name="chevron-right" className='size-5 text-white md:size-6' />
            </div>
          </button>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
