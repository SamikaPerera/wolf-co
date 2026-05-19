import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SIZE_CHART } from '../data/products'

export default function SizeModal({ open, onClose }) {
  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="modal-backdrop"
          onClick={onClose}
          role="dialog" aria-modal="true" aria-label="Size guide"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="modal-box"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-bebas text-2xl tracking-[0.15em]">Size Guide</h2>
                <p className="font-condensed text-[0.7rem] tracking-widest uppercase text-white/35 mt-1">
                  All measurements in inches
                </p>
              </div>
              <button onClick={onClose} className="text-white/30 hover:text-white text-xl leading-none ml-4" aria-label="Close">✕</button>
            </div>

            {/* Table – scrollable on mobile */}
            <div className="overflow-x-auto -mx-1">
              <table className="w-full font-condensed text-sm min-w-[420px]">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    {['Size', 'Body', 'Chest', 'Shoulder', 'Sleeve', 'Opening'].map(h => (
                      <th key={h} className="text-left py-2 pr-5 text-[0.68rem] tracking-widest uppercase text-white/30 font-500">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_CHART.map((row, i) => (
                    <tr key={row.size} className={`border-b border-white/[0.05] ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                      <td className="py-3 pr-5 font-700 tracking-wider" style={{ color: 'var(--accent)' }}>{row.size}</td>
                      <td className="py-3 pr-5 text-white/70">{row.body}</td>
                      <td className="py-3 pr-5 text-white/70">{row.chest}</td>
                      <td className="py-3 pr-5 text-white/70">{row.shoulder}</td>
                      <td className="py-3 pr-5 text-white/70">{row.sleeve}</td>
                      <td className="py-3 text-white/70">{row.opening}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.07]">
              <p className="font-condensed text-[0.7rem] text-white/30 leading-relaxed tracking-wide">
                All tees are cut oversized. If you prefer a more relaxed fit, size up.
                Model is 5'11" wearing size L.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
