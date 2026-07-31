import { useEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** entrance delay in ms (for staggering) */
  delay?: number
  /** id passthrough */
  id?: string
}

/**
 * Wraps content with a scroll-into-view entrance.
 *
 * The content is fully visible by default. Only once JS has mounted do we add
 * `reveal-ready` to <html>, which (and only under prefers-reduced-motion:
 * no-preference) applies the hidden "from" state. So headless renders, no-JS,
 * and reduced-motion users always see the content — the motion only enhances.
 */
export default function Reveal({ children, className, delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.add('reveal-ready')
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      id={id}
      data-reveal
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
