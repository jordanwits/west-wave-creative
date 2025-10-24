"use client"

import { useEffect, useRef, useState } from "react"

type Options = {
  topOffset?: number
}

// Keeps an element pinned below the header until the end of its scroll container.
export function useStickyWithinParent({ topOffset = 96 }: Options = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const parent = el.parentElement
    if (!parent) return

    // Ensure parent creates a containing block for measurements
    if (getComputedStyle(parent).position === "static") {
      parent.style.position = "relative"
    }

    const handle = () => {
      const rect = parent.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()

      const viewportTop = topOffset
      const stickStart = rect.top
      const stickEnd = rect.bottom - elRect.height

      if (stickStart > viewportTop) {
        // Not reached sticking point
        setStyle({ position: "absolute", top: 0, width: "100%" })
      } else if (stickEnd <= viewportTop) {
        // Reached the end of the container
        setStyle({ position: "absolute", top: parent.clientHeight - el.offsetHeight, width: "100%" })
      } else {
        // Stick to viewport
        setStyle({ position: "fixed", top: viewportTop, width: `${elRect.width}px` })
      }
    }

    const onScroll = () => handle()
    const onResize = () => handle()
    handle()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [topOffset])

  return { containerRef, style }
}


