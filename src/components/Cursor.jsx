import { useEffect, useRef } from 'react'

// Custom cursor — only renders on pointer:fine devices (desktop)
export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf
    let rx = -100, ry = -100 // ring position

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e
      if (dotRef.current) {
        dotRef.current.style.left = x + 'px'
        dotRef.current.style.top  = y + 'px'
      }
      // Smooth ring follow
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        rx += (x - rx) * 0.18
        ry += (y - ry) * 0.18
        if (ringRef.current) {
          ringRef.current.style.left = rx + 'px'
          ringRef.current.style.top  = ry + 'px'
        }
      })
    }

    const grow = () => ringRef.current && (ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.6)')
    const shrink = () => ringRef.current && (ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)')

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ left: '-100px', top: '-100px' }} />
      <div ref={ringRef} className="cursor-ring" style={{ left: '-100px', top: '-100px' }} />
    </>
  )
}
