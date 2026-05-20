import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import WolfLogo from './WolfLogo'
import emailjs from '@emailjs/browser'
import { EMAILJS } from '../config/emailjs'
const fmt = (n) => `Rs. ${n.toLocaleString()}`

// Maps colour to product image
const CART_IMAGES = {
  BLACK: '/black-1.jpg',
  WHITE: '/white-1.jpg',
}

function CartItems() {
  const { items, removeItem, updateQty } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <WolfLogo size={38} color="var(--accent)" />
        <p className="font-condensed text-xs tracking-[0.25em] uppercase text-white/30">
          Your cart is empty
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
      <AnimatePresence initial={false}>
        {items.map(item => (
          <motion.div
            key={`${item.id}-${item.color}-${item.size}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4"
          >
            {/* Product thumbnail */}
            <div className="w-[72px] h-[90px] flex-shrink-0 border border-white/[0.08] overflow-hidden">
              <img
                src={CART_IMAGES[item.color] ?? CART_IMAGES.BLACK}
                alt={`${item.name} in ${item.color}`}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-condensed text-[0.78rem] font-600 tracking-wider uppercase leading-tight">
                    {item.name}
                  </p>
                  <p className="font-condensed text-[0.7rem] text-white/35 tracking-wider mt-0.5">
                    {item.color} / {item.size}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id, item.color, item.size)}
                  className="text-white/25 hover:text-white transition-colors text-lg leading-none shrink-0 mt-0.5"
                  aria-label="Remove item"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.color, item.size, item.qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="font-condensed text-sm w-5 text-center">{item.qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQty(item.id, item.color, item.size, item.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="font-condensed text-sm font-600" style={{ color: 'var(--accent)' }}>
                  {fmt(item.price * item.qty)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function CheckoutForm({ onSuccess }) {
  const { items, total } = useCart()
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', note: ''
  })
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templates.order,
        {
          name:    form.name,
          email:   form.email,
          phone:   form.phone,
          address: form.address,
          city:    form.city,
          note:    form.note || 'None',
          items:   items.map(i => `${i.color} / ${i.size} x${i.qty}`).join(', '),
          total:   `Rs. ${total.toLocaleString()}`,
        },
        EMAILJS.publicKey
      )
      onSuccess(form)
    } catch (err) {
      console.error('Order email error:', err)
      onSuccess(form) // still proceed even if email fails
    } finally {
      setLoading(false)
    }
  }

  const orderSummary = items.map(i => `${i.color} / ${i.size} x${i.qty}`).join(', ')

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <p className="font-condensed text-[0.7rem] tracking-[0.22em] uppercase text-white/30 mb-5">
        Order Details
      </p>
      <form onSubmit={submit} className="space-y-3">
        {[
          { name: 'name',    placeholder: 'Full Name',        type: 'text'  },
          { name: 'email',   placeholder: 'Email Address',    type: 'email' },
          { name: 'phone',   placeholder: 'Phone Number',     type: 'tel'   },
          { name: 'address', placeholder: 'Delivery Address', type: 'text'  },
          { name: 'city',    placeholder: 'City',             type: 'text'  },
        ].map(f => (
          <input
            key={f.name} name={f.name} type={f.type}
            required placeholder={f.placeholder.toUpperCase()}
            value={form[f.name]} onChange={handle}
            className="input-base"
          />
        ))}
        <textarea
          name="note" rows={2} placeholder="ORDER NOTES (OPTIONAL)"
          value={form.note} onChange={handle}
          className="input-base resize-none"
        />

        {/* Order summary */}
        <div className="p-3 border border-white/[0.06] bg-white/[0.02]">
          <p className="font-condensed text-[0.65rem] tracking-widest uppercase text-white/25 mb-1">
            Order Summary
          </p>
          <p className="font-condensed text-[0.72rem] text-white/50 tracking-wide">
            {orderSummary}
          </p>
        </div>

        {/* Payment note */}
        <div className="p-4 border border-white/[0.07] bg-white/[0.025] space-y-1.5">
          <p className="font-condensed text-[0.7rem] tracking-widest uppercase text-white/35">
            Payment
          </p>
          <p className="font-condensed text-[0.72rem] text-white/45 leading-relaxed tracking-wide">
            We'll contact you via Instagram or WhatsApp to confirm and process payment.
          </p>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-3 border-t border-white/[0.08]">
          <span className="font-condensed text-[0.7rem] tracking-widest uppercase text-white/35">Total</span>
          <span className="font-bebas text-2xl tracking-wider" style={{ color: 'var(--accent)' }}>
            Rs. {total.toLocaleString()}
          </span>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          <span>{loading ? 'Placing Order...' : 'Place Order →'}</span>
        </button>
      </form>
    </div>
  )
}

function OrderSuccess({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6"
    >
      {/* Check circle */}
      <div
        className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: 'var(--accent)' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </div>

      <div className="space-y-2">
        <h3 className="font-bebas text-3xl tracking-widest">Order Placed</h3>
        <p className="font-condensed text-[0.78rem] text-white/45 leading-relaxed tracking-wide max-w-xs mx-auto">
          We'll reach out on Instagram{' '}
          <a
            href="https://instagram.com/wolfofficial.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-line"
            style={{ color: 'var(--accent)' }}
          >
            @wolfofficial.co
          </a>{' '}
          within 24 hours to confirm and arrange payment.
        </p>
      </div>

      {/* Quick links */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <a
          href="https://instagram.com/wolfofficial.co"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full text-center"
        >
          <span>DM us on Instagram</span>
        </a>
        <button onClick={onClose} className="btn-outline w-full">
          Continue Shopping
        </button>
      </div>
    </motion.div>
  )
}

export default function CartDrawer() {
  const { items, total, isOpen, setIsOpen, clearCart } = useCart()
  const [step, setStep] = useState('cart') // cart | form | success

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => setStep('cart'), 500)
  }

  const handleSuccess = (formData) => {
    setStep('success')
    clearCart()
  }

  const stepLabel = {
    cart:    'Your Cart',
    form:    'Checkout',
    success: 'Order Confirmed',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-overlay${isOpen ? ' open' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`cart-drawer${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-2.5">
            <WolfLogo size={18} color="var(--accent)" />
            <span className="font-condensed text-[0.72rem] tracking-[0.22em] uppercase">
              {stepLabel[step]}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-white/30 hover:text-white text-xl leading-none transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <AnimatePresence mode="wait">
          {step === 'cart'    && <CartItems key="cart" />}
          {step === 'form'    && <CheckoutForm key="form" onSuccess={handleSuccess} />}
          {step === 'success' && <OrderSuccess key="success" onClose={handleClose} />}
        </AnimatePresence>

        {/* Footer */}
        {step === 'cart' && (
          <div className="px-5 py-5 border-t border-white/[0.08] space-y-3 shrink-0 safe-bottom">
            <div className="flex justify-between items-center">
              <span className="font-condensed text-[0.7rem] tracking-widest uppercase text-white/35">
                Subtotal
              </span>
              <span className="font-bebas text-2xl tracking-wider" style={{ color: 'var(--accent)' }}>
                {fmt(total)}
              </span>
            </div>

            {items.length > 0 && (
              <button className="btn-primary w-full" onClick={() => setStep('form')}>
                <span>Proceed to Checkout →</span>
              </button>
            )}

            <p className="font-condensed text-[0.65rem] text-white/20 text-center tracking-wider">
              Free delivery on orders over Rs. 7,000
            </p>
          </div>
        )}

        {step === 'form' && (
          <div className="px-5 py-3 border-t border-white/[0.08] shrink-0 safe-bottom">
            <button
              onClick={() => setStep('cart')}
              className="font-condensed text-[0.7rem] tracking-widest uppercase text-white/25 hover:text-white transition-colors"
            >
              ← Back to Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}