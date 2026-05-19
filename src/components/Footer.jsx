import { Link } from 'react-router-dom'
import WolfLogo from './WolfLogo'

const SHOP_LINKS    = [{ label: 'The Wolf Tee', to: '/shop' }, { label: 'Coming Soon', to: '/shop' }]
const INFO_LINKS    = [{ label: 'About', to: '/about' }, { label: 'Sizing', to: '/shop' }, { label: 'Contact', to: '/contact' }]
const PAYMENT_TAGS  = ['VISA', 'MASTERCARD', 'PAYHERE', 'BANK TRANSFER']

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--black)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <WolfLogo size={22} color="var(--accent)" />
              <span className="font-bebas tracking-widest">WOLF.CO</span>
            </div>
            <p className="font-condensed text-[0.72rem] text-white/30 leading-relaxed tracking-wider">
              Performance × Lifestyle.<br />
              From Sri Lanka, for everyone.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com/wolfofficial.co" target="_blank" rel="noopener noreferrer"
                className="text-white/25 hover:text-white transition-colors" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@wolfofficial.co" target="_blank" rel="noopener noreferrer"
                className="text-white/25 hover:text-white transition-colors" aria-label="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="font-condensed text-[0.68rem] tracking-[0.25em] uppercase text-white/20 mb-4">Shop</p>
            <ul className="space-y-3">
              {SHOP_LINKS.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="font-condensed text-[0.75rem] text-white/40 hover:text-white transition-colors tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-condensed text-[0.68rem] tracking-[0.25em] uppercase text-white/20 mb-4">Info</p>
            <ul className="space-y-3">
              {INFO_LINKS.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="font-condensed text-[0.75rem] text-white/40 hover:text-white transition-colors tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-condensed text-[0.68rem] tracking-[0.25em] uppercase text-white/20 mb-4">Order Direct</p>
            <div className="space-y-3">
              <a href="https://instagram.com/wolfofficial.co" target="_blank" rel="noopener noreferrer"
                className="block font-condensed text-[0.75rem] text-white/40 hover:text-white transition-colors tracking-wider hover-line">
                DM on Instagram ↗
              </a>
              <a href="https://wa.me/94XXXXXXXXX" target="_blank" rel="noopener noreferrer"
                className="block font-condensed text-[0.75rem] text-white/40 hover:text-white transition-colors tracking-wider hover-line">
                WhatsApp Us ↗
              </a>
            </div>
          </div>
        </div>

        {/* Payment badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {PAYMENT_TAGS.map(t => (
            <span key={t} className="font-condensed text-[0.62rem] tracking-widest uppercase border border-white/[0.08] px-2.5 py-1.5 text-white/20">
              {t}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-condensed text-[0.68rem] text-white/20 tracking-widest">
            © {new Date().getFullYear()} Wolf.co — All Rights Reserved
          </p>
          <p className="font-condensed text-[0.68rem] text-white/20 tracking-widest">
            Sri Lanka 🇱🇰
          </p>
        </div>
      </div>
    </footer>
  )
}
