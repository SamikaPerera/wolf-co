import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp, slideInLeft, slideInRight, scaleIn } from '../animations/variants'
import Marquee from '../components/Marquee'
import Newsletter from '../components/Newsletter'
import WolfLogo from '../components/WolfLogo'

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t) }, [])

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-14 sm:pb-20 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 70% 25%, rgba(201,169,110,0.07) 0%, transparent 55%),
            radial-gradient(ellipse at 15% 75%, rgba(201,169,110,0.04) 0%, transparent 40%),
            linear-gradient(180deg, #0a0a0a 0%, #101010 50%, #0a0a0a 100%)
          `
        }}
      >
        {/* Giant watermark logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
          <WolfLogo size={Math.min(600, window.innerWidth * 1.1)} color="var(--white)" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          className="max-w-4xl"
        >
          <motion.p variants={staggerItem}
            className="font-condensed text-[0.72rem] tracking-[0.42em] uppercase text-white/25 mb-5 sm:mb-6">
            Performance × Lifestyle — Est. Sri Lanka
          </motion.p>

          <motion.h1 variants={staggerItem}
            className="font-bebas leading-[0.9] tracking-[0.02em] text-white"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 9.5rem)' }}>
            SILENCE<br />
            <span className="shimmer-text">OUTSIDE.</span><br />
            <span>FOCUS</span><br />
            <span className="text-white/25">INSIDE.</span>
          </motion.h1>

          <motion.div variants={staggerItem} className="mt-8 sm:mt-10 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary"><span>Shop The Wolf Tee</span></Link>
            <button
              className="btn-outline"
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore
            </button>
          </motion.div>

          <motion.div variants={staggerItem}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {['Free Delivery Over Rs. 7,000', 'Island-Wide Sri Lanka', 'New Drop Available'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                <span className="font-condensed text-[0.7rem] tracking-widest uppercase text-white/35">{t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-6 sm:right-10 hidden sm:flex flex-col items-center gap-2 opacity-20 pointer-events-none select-none">
        <span className="font-condensed text-[0.6rem] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-px h-10 bg-white/40" />
      </div>
    </section>
  )
}

// ── Featured ──────────────────────────────────────────────────────────────────
function Featured() {
  return (
    <section id="featured" className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
        {/* Image block */}
        <motion.div
          variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-[3/4] bg-[var(--gray-dark)] border border-white/[0.06] flex items-center justify-center overflow-hidden group">
            {/* Replace this div with <img src="/product-black.jpg" ... /> when you have photos */}
            <div className="flex flex-col items-center gap-3 opacity-20">
              <WolfLogo size={64} color="var(--white)" />
              <p className="font-condensed text-[0.68rem] tracking-widest uppercase text-white/50">Add Product Photo</p>
            </div>
            {/* Hover CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: 'rgba(10,10,10,0.45)' }}>
              <Link to="/shop" className="btn-primary"><span>View Product</span></Link>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute -top-4 -right-2 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
            style={{ background: 'var(--accent)' }}>
            <span className="font-bebas text-[0.6rem] text-black tracking-wider text-center leading-tight">NEW<br/>DROP</span>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="space-y-5"
        >
          <div>
            <p className="font-condensed text-[0.7rem] tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
              001 — Inaugural Piece
            </p>
            <h2 className="font-bebas leading-none" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}>
              THE WOLF<br />TEE
            </h2>
            <p className="font-condensed text-base text-white/40 tracking-wider mt-2">Oversized Essential</p>
          </div>

          <p className="text-[0.84rem] text-white/45 leading-relaxed max-w-sm">
            Heavyweight cotton. Dropped shoulder. Embroidered logomark.
            Built for those who move in silence.
          </p>

          <div className="flex items-center gap-4">
            <span className="font-bebas text-3xl tracking-wider" style={{ color: 'var(--accent)' }}>Rs. 3,500</span>
            <span className="font-condensed text-[0.72rem] text-white/30 tracking-widest uppercase">Black / White</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {['240gsm Cotton', 'Oversized Fit', 'Embroidered Logo'].map(t => (
              <span key={t} className="font-condensed text-[0.68rem] tracking-widest uppercase px-3 py-1.5 border border-white/[0.1] text-white/35">
                {t}
              </span>
            ))}
          </div>

          <Link to="/shop" className="btn-primary inline-flex">
            <span>Shop Now — Rs. 3,500</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ── Stats ─────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { num: '100%', label: 'Heavyweight Cotton' },
    { num: '3',    label: 'Available Sizes'    },
    { num: '2',    label: 'Colourways'         },
    { num: '∞',    label: 'Days to Wear'       },
  ]
  return (
    <section className="py-14 border-y border-white/[0.06]">
      <motion.div
        variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 text-center"
      >
        {stats.map(s => (
          <motion.div key={s.num} variants={staggerItem}>
            <div className="font-bebas text-4xl sm:text-5xl" style={{ color: 'var(--accent)' }}>{s.num}</div>
            <div className="font-condensed text-[0.68rem] tracking-widest uppercase text-white/30 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ── About snippet ─────────────────────────────────────────────────────────────
function AboutSnippet() {
  return (
    <section className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <p className="font-condensed text-[0.7rem] tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--accent)' }}>The Brand</p>
          <h2 className="font-bebas leading-[0.92]" style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)' }}>
            BUILT IN<br />
            <span className="text-white/25">SRI LANKA.</span><br />
            WORN<br />
            <span className="shimmer-text">EVERYWHERE.</span>
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
          className="space-y-5 md:pt-5">
          {[
            "Wolf.co was born from a simple truth: the people who work hardest are often heard the least. We built a brand for them.",
            "Performance and lifestyle shouldn't be two different wardrobes. Wolf.co is where both live — every piece designed to move with you.",
            "We're at the start. One tee. Two colours. Zero compromises.",
          ].map((t, i) => (
            <p key={i} className="text-[0.84rem] text-white/45 leading-relaxed">{t}</p>
          ))}
          <div className="flex items-center gap-3 pt-1">
            <div className="w-7 h-px" style={{ background: 'var(--accent)' }} />
            <span className="font-condensed text-[0.68rem] tracking-[0.3em] uppercase text-white/30">
              From the Streets of Sri Lanka
            </span>
          </div>
          <Link to="/about" className="btn-outline inline-flex mt-2"><span>Our Story</span></Link>
        </motion.div>
      </div>
    </section>
  )
}

// ── Instagram strip ───────────────────────────────────────────────────────────
function InstagramCTA() {
  return (
    <section className="py-16 border-t border-white/[0.06]">
      <motion.div
        variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl mx-auto px-5 sm:px-8 text-center space-y-5"
      >
        <div className="flex justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--accent)">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        <h2 className="font-bebas text-3xl sm:text-4xl tracking-wider">FOLLOW THE PACK</h2>
        <p className="font-condensed text-[0.78rem] text-white/35 tracking-wider">
          Tag us in your fits. DM to order direct.
        </p>
        <a href="https://instagram.com/wolfofficial.co" target="_blank" rel="noopener noreferrer"
          className="btn-primary inline-flex">
          <span>@wolfofficial.co</span>
        </a>
      </motion.div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Featured />
      <Stats />
      <AboutSnippet />
      <InstagramCTA />
      <Newsletter />
    </>
  )
}
