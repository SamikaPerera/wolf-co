import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants'
import { useCart } from '../context/CartContext'
import { PRODUCT, DELIVERY } from '../data/products'
import SizeModal from '../components/SizeModal'
import Toast from '../components/Toast'
import WolfLogo from '../components/WolfLogo'
import Newsletter from '../components/Newsletter'

// ── Product images per colour
// Add your photos to /public/ and update these paths
const IMAGES = {
  BLACK: ['/black-1.jpg',],
  WHITE: ['/white-1.jpg'],
}

export default function Shop() {
  const [color,      setColor]      = useState('BLACK')
  const [size,       setSize]        = useState(null)
  const [imgIdx,     setImgIdx]      = useState(0)
  const [tab,        setTab]         = useState('description')
  const [sizeModal,  setSizeModal]   = useState(false)
  const [toast,      setToast]       = useState(false)
  const [sizeError,  setSizeError]   = useState(false)
  const [imgLoaded,  setImgLoaded]   = useState(false)
  const { addItem } = useCart()

  // Reset to first image when colour changes
  useEffect(() => {
    setImgIdx(0)
    setImgLoaded(false)
  }, [color])

  // Reset loaded state when thumbnail changes
  useEffect(() => {
    setImgLoaded(false)
  }, [imgIdx])

  const handleAddToCart = () => {
    if (!size) { setSizeError(true); return }
    setSizeError(false)
    addItem({ ...PRODUCT, color, size })
    setToast(true)
    setTimeout(() => setToast(false), 2400)
  }

  const fmt = (n) => `Rs. ${n.toLocaleString()}`
  const currentImages = IMAGES[color]
  const currentSrc    = currentImages[imgIdx] ?? currentImages[0]

  return (
    <div className="min-h-screen pt-16 sm:pt-[70px] bg-[var(--black)]">
      <Toast message="Added to cart ✓" show={toast} />
      <SizeModal open={sizeModal} onClose={() => setSizeModal(false)} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 sm:py-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 sm:mb-12" aria-label="Breadcrumb">
          <span className="font-condensed text-[0.68rem] tracking-widest uppercase text-white/20">Shop</span>
          <span className="text-white/20 text-xs">/</span>
          <span className="font-condensed text-[0.68rem] tracking-widest uppercase text-white/45">The Wolf Tee</span>
        </nav>

        {/* ── Main product grid ── */}
        <div className="grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">

          {/* ════ Gallery ════ */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            className="space-y-3"
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] bg-[var(--gray-dark)] border border-white/[0.06] overflow-hidden">

              {/* Loading shimmer */}
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] animate-pulse" />
              )}

              {/* Actual photo */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSrc}
                  src={currentSrc}
                  alt={`Wolf Tee in ${color}`}
                  className="w-full h-full object-cover object-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imgLoaded ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onLoad={() => setImgLoaded(true)}
                />
              </AnimatePresence>

              {/* Colour badge */}
              <div className="absolute top-4 left-4 font-condensed text-[0.6rem] tracking-widest uppercase px-3 py-1.5 border border-white/10 bg-black/50 text-white/40 backdrop-blur-sm">
                {color}
              </div>

              {/* Arrow nav on mobile */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => Math.max(0, i - 1))}
                    disabled={imgIdx === 0}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 border border-white/10 text-white/60 hover:text-white transition-all disabled:opacity-20 backdrop-blur-sm sm:hidden"
                    aria-label="Previous image"
                  >‹</button>
                  <button
                    onClick={() => setImgIdx(i => Math.min(currentImages.length - 1, i + 1))}
                    disabled={imgIdx === currentImages.length - 1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/50 border border-white/10 text-white/60 hover:text-white transition-all disabled:opacity-20 backdrop-blur-sm sm:hidden"
                    aria-label="Next image"
                  >›</button>
                </>
              )}

              {/* Dot indicators on mobile */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 sm:hidden">
                {currentImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{ background: imgIdx === i ? 'var(--accent)' : 'rgba(255,255,255,0.25)' }}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails — desktop */}
            <div className="hidden sm:grid grid-cols-4 gap-2 sm:gap-3">
              {currentImages.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-square border overflow-hidden transition-all duration-200 ${
                    imgIdx === i
                      ? 'border-[var(--accent)]/60 opacity-100'
                      : 'border-white/[0.06] opacity-50 hover:opacity-80 hover:border-white/20'
                  }`}
                  aria-label={`Product image ${i + 1}`}
                  aria-pressed={imgIdx === i}
                >
                  <img
                    src={src}
                    alt={`Wolf Tee angle ${i + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ════ Product Info ════ */}
          <motion.div
            variants={staggerContainer} initial="hidden" animate="visible"
            className="space-y-7 lg:sticky lg:top-24"
          >

            {/* Name & price */}
            <motion.div variants={staggerItem}>
              <p className="font-condensed text-[0.68rem] tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--accent)' }}>
                {PRODUCT.badge}
              </p>
              <h1 className="font-bebas text-5xl sm:text-6xl tracking-wider leading-none">
                {PRODUCT.name}
              </h1>
              <p className="font-condensed text-base text-white/35 tracking-wider mt-1">
                {PRODUCT.subtitle}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="font-bebas text-3xl tracking-wider" style={{ color: 'var(--accent)' }}>
                  {fmt(PRODUCT.price)}
                </span>
                <span className="font-condensed text-[0.65rem] text-white/30 tracking-widest uppercase px-3 py-1 border border-white/[0.08]">
                  In Stock
                </span>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div variants={staggerItem} className="h-px bg-white/[0.06]" />

            {/* Colour selector */}
            <motion.div variants={staggerItem}>
              <div className="flex justify-between items-center mb-3">
                <span className="font-condensed text-[0.7rem] tracking-[0.22em] uppercase text-white/45">
                  Colour
                </span>
                <span className="font-condensed text-[0.7rem] tracking-wider uppercase" style={{ color: 'var(--accent)' }}>
                  {color}
                </span>
              </div>
              <div className="flex gap-3">
                {PRODUCT.colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`swatch ${c === 'BLACK' ? 'swatch-black' : 'swatch-white'} ${color === c ? 'active' : ''}`}
                    aria-label={`Select ${c}`}
                    aria-pressed={color === c}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size selector */}
            <motion.div variants={staggerItem} id="size-selector">
              <div className="flex justify-between items-center mb-3">
                <span className="font-condensed text-[0.7rem] tracking-[0.22em] uppercase text-white/45">
                  Size
                </span>
                <button
                  onClick={() => setSizeModal(true)}
                  className="font-condensed text-[0.7rem] tracking-widest uppercase text-white/30 hover:text-[var(--accent)] transition-colors"
                >
                  Size Guide ↗
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {PRODUCT.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSize(s); setSizeError(false) }}
                    className={`size-btn ${size === s ? 'active' : ''}`}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {sizeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="font-condensed text-[0.68rem] tracking-wider mt-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    ↑ Please select a size to continue
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Add to cart */}
            <motion.div variants={staggerItem}>
              <button
                className="btn-primary w-full text-sm"
                onClick={handleAddToCart}
              >
                <span>
                  {size ? `Add to Cart — ${fmt(PRODUCT.price)}` : 'Select a Size'}
                </span>
              </button>

              {/* WhatsApp quick order */}
              <a
                href={`https://wa.me/94XXXXXXXXX?text=Hi! I'd like to order the Wolf Tee in ${color}, Size ${size ?? '___'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full mt-3 flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order via WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={staggerItem}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 py-1">
              {[
                { icon: '★', text: '188+ customers' },
                { icon: '🚚', text: 'Free delivery over Rs. 7,000' },
                { icon: '🇱🇰', text: 'Island-wide shipping' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <span className="text-[0.7rem]">{icon}</span>
                  <span className="font-condensed text-[0.65rem] tracking-wider uppercase text-white/25">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div variants={staggerItem} className="h-px bg-white/[0.06]" />

            {/* Tabs */}
            <motion.div variants={staggerItem}>
              <div className="flex border-b border-white/[0.08]">
                {[['description', 'Description'], ['details', 'Details'], ['delivery', 'Delivery']].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`font-condensed text-[0.68rem] tracking-widest uppercase px-4 py-3 border-b -mb-px transition-colors ${
                      tab === key
                        ? 'text-[var(--accent)] border-[var(--accent)]'
                        : 'text-white/30 border-transparent hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="pt-5"
                >
                  {tab === 'description' && (
                    <p className="text-[0.82rem] text-white/45 leading-relaxed">
                      {PRODUCT.description}
                    </p>
                  )}
                  {tab === 'details' && (
                    <ul className="space-y-2.5">
                      {PRODUCT.details.map(d => (
                        <li key={d} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                          <span className="font-condensed text-[0.78rem] text-white/45 tracking-wider">{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {tab === 'delivery' && (
                    <div className="space-y-3">
                      {DELIVERY.map(({ label, value }) => (
                        <div key={label} className="flex justify-between gap-4 items-start">
                          <span className="font-condensed text-[0.68rem] uppercase tracking-widest text-white/30 shrink-0">
                            {label}
                          </span>
                          <span className="font-condensed text-[0.72rem] tracking-wider text-white/50 text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Instagram DM */}
            <motion.div variants={staggerItem}>
              <a
                href="https://instagram.com/wolfofficial.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 border border-white/[0.06] bg-white/[0.02] hover:border-[var(--accent)]/25 transition-colors group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" className="shrink-0">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <div>
                  <p className="font-condensed text-[0.68rem] tracking-widest uppercase text-white/35">DM to order directly</p>
                  <p className="font-condensed text-[0.75rem] tracking-wider group-hover:underline" style={{ color: 'var(--accent)' }}>
                    @wolfofficial.co ↗
                  </p>
                </div>
              </a>
            </motion.div>

          </motion.div>
          {/* end info column */}

        </div>
        {/* end product grid */}

      </div>

      <Newsletter />
    </div>
  )
}