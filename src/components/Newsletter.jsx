import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { fadeUp } from '../animations/variants'
import { EMAILJS } from '../config/emailjs'
import WolfLogo from './WolfLogo'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done,  setDone]  = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templates.newsletter,
        { email },
        EMAILJS.publicKey
      )
      setDone(true)
      setEmail('')
    } catch (err) {
      console.error('Newsletter error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 border-t border-white/[0.06]" style={{ background: 'var(--gray-dark)' }}>
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        className="max-w-xl mx-auto px-5 sm:px-8 text-center"
      >
        <WolfLogo size={28} color="var(--accent)" />
        <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider mt-4 mb-2">
          STAY IN THE PACK
        </h2>
        <p className="font-condensed text-[0.78rem] text-white/35 tracking-wider mb-8">
          New drops. Limited releases. Nothing else.
        </p>

        {!done ? (
          <form onSubmit={submit} className="flex max-w-sm mx-auto">
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="YOUR EMAIL"
              className="input-base flex-1 border-r-0"
              disabled={loading}
            />
            <button type="submit" className="btn-primary shrink-0 px-5" disabled={loading}>
              <span>{loading ? '...' : '→'}</span>
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            <span className="font-condensed text-sm tracking-widest uppercase text-white/50">
              You're in the pack.
            </span>
          </div>
        )}
      </motion.div>
    </section>
  )
}