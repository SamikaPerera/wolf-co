import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WolfLogo from './WolfLogo'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen]  = useState(false)
  const { count, setIsOpen } = useCart()
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { to: '/',        label: 'Home'  },
    { to: '/shop',    label: 'Shop'  },
    { to: '/about',   label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* ── Main nav ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-[3000] transition-all duration-500 ${
          scrolled ? 'nav-blur border-b border-white/[0.06]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-[70px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Wolf.co home">
            <WolfLogo size={50} color="var(--white)" />
            <span className="font-bebas text-xl tracking-[0.22em] text-white">WOLF.CO</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`font-condensed text-[0.78rem] tracking-[0.18em] uppercase transition-colors hover-line ${
                  location.pathname === l.to ? 'text-[var(--accent)]' : 'text-white/60 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            {/* Instagram – desktop */}
            <a
              href="https://instagram.com/wolfofficial.co"
              target="_blank" rel="noopener noreferrer"
              className="hidden md:block text-white/40 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-white/60 hover:text-white transition-colors p-1"
              aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                  style={{ background: 'var(--accent)', color: 'var(--black)' }}>
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Hamburger – mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col gap-[5px] p-1"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-white block" />
              <span className="w-3.5 h-[1.5px] bg-white block" />
              <span className="w-5 h-[1.5px] bg-white block" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="mob-overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[4400]"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="mob-menu"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-[80vw] max-w-sm bg-[var(--gray-dark)] z-[4500] flex flex-col px-8 pt-20 pb-10 safe-bottom"
            >
              {/* Close */}
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-6 text-white/40 hover:text-white text-2xl leading-none"
                aria-label="Close menu"
              >
                ✕
              </button>

              {/* Links */}
              <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16,1,0.3,1] }}
                  >
                    <Link
                      to={l.to}
                      className={`font-bebas text-4xl tracking-[0.15em] transition-colors ${
                        location.pathname === l.to ? 'text-[var(--accent)]' : 'text-white'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <a
                  href="https://instagram.com/wolfofficial.co"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="font-condensed text-xs tracking-widest uppercase">@wolfofficial.co</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
