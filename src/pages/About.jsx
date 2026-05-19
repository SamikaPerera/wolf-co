import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  slideInLeft,
  slideInRight,
} from '../animations/variants'
import WolfLogo from '../components/WolfLogo'
import Newsletter from '../components/Newsletter'

const VALUES = [
  {
    num: '01',
    title: 'Move in Silence',
    body: 'The loudest statement is the work itself. We design for people who let results do the talking.',
  },
  {
    num: '02',
    title: 'Built Different',
    body: '240gsm heavyweight cotton. Dropped shoulders. Every detail considered. Nothing by accident.',
  },
  {
    num: '03',
    title: 'From the Streets',
    body: 'Born in Sri Lanka. No backing, no shortcuts. Just vision, fabric, and conviction.',
  },
]

const STORY_PARAGRAPHS = [
  "Wolf.co was born from a simple truth: the people who work hardest are often heard the least. We built a brand for them — for the ones who show up, put in the work, and let the results speak.",
  "We started with a single question: why does performance wear have to feel so clinical, and lifestyle wear so hollow? Wolf.co sits at the intersection — built to move, designed to be worn everywhere from the gym floor to the street.",
  "We're early. One tee. Two colours. But the vision is clear: Wolf.co is a brand built for a generation that refuses to be one-dimensional.",
]

export default function About() {
  return (
    <div className="min-h-screen pt-16 sm:pt-[70px] bg-[var(--black)]">

      {/* ── Hero ── */}
      <section className="relative py-24 sm:py-40 overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute inset-0 pointer-events-none select-none flex items-center justify-center opacity-[0.025]"
          aria-hidden="true"
        >
          <WolfLogo size={560} color="var(--white)" />
        </div>

        {/* Gradient fade bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--black))' }}
          aria-hidden="true"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center"
        >
          <motion.p
            variants={staggerItem}
            className="font-condensed text-[0.7rem] tracking-[0.45em] uppercase text-white/25 mb-5"
          >
            Our Story
          </motion.p>

          <motion.h1
            variants={staggerItem}
            className="font-bebas leading-[0.88] tracking-[0.02em]"
            style={{ fontSize: 'clamp(3.5rem, 13vw, 8.5rem)' }}
          >
            BUILT IN<br />
            <span className="shimmer-text">SRI LANKA.</span><br />
            WORN<br />
            <span className="text-white/30">EVERYWHERE.</span>
          </motion.h1>

          <motion.div
            variants={staggerItem}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <div className="h-px w-10 bg-white/10" />
            <span className="font-condensed text-[0.68rem] tracking-[0.35em] uppercase text-white/25">
              Performance × Lifestyle
            </span>
            <div className="h-px w-10 bg-white/10" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Story ── */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 gap-12 sm:gap-20 items-center">

          {/* Photo */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden border border-white/[0.06]">
              <img
                src="/about-1.jpg"
                alt="Wolf.co brand campaign"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
            {/* Floating label */}
            <div className="absolute bottom-5 left-5 font-condensed text-[0.62rem] tracking-widest uppercase px-3 py-2 border border-white/10 bg-black/60 text-white/35 backdrop-blur-sm">
              Wolf.co — Sri Lanka
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <div>
              <p
                className="font-condensed text-[0.7rem] tracking-[0.35em] uppercase mb-3"
                style={{ color: 'var(--accent)' }}
              >
                The Origin
              </p>
              <h2 className="font-bebas text-4xl sm:text-5xl leading-[0.95]">
                A Brand for the<br />
                <span className="shimmer-text">Ones Who Show Up</span>
              </h2>
            </div>

            <div className="w-10 h-px" style={{ background: 'var(--accent)', opacity: 0.5 }} />

            <div className="space-y-4">
              {STORY_PARAGRAPHS.map((t, i) => (
                <p key={i} className="text-[0.84rem] text-white/45 leading-relaxed">
                  {t}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-7 h-px" style={{ background: 'var(--accent)' }} />
              <span className="font-condensed text-[0.68rem] tracking-[0.3em] uppercase text-white/25">
                From the Streets of Sri Lanka
              </span>
            </div>

            <Link to="/shop" className="btn-primary inline-flex mt-2">
              <span>Shop The Wolf Tee</span>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <p
              className="font-condensed text-[0.7rem] tracking-[0.35em] uppercase mb-3"
              style={{ color: 'var(--accent)' }}
            >
              What We Stand For
            </p>
            <h2 className="font-bebas text-4xl sm:text-5xl tracking-wide">
              The Wolf Way
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.num}
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12 }}
                className="group border border-white/[0.06] p-6 sm:p-8 hover:border-[var(--accent)]/20 transition-colors duration-300"
              >
                <span
                  className="font-bebas text-5xl block mb-4"
                  style={{ color: 'var(--accent)', opacity: 0.4 }}
                >
                  {v.num}
                </span>
                <h3 className="font-condensed text-base font-600 tracking-[0.15em] uppercase mb-3">
                  {v.title}
                </h3>
                <p className="text-[0.82rem] text-white/40 leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-t border-white/[0.06] py-14">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
        >
          {[
            { num: '2025', label: 'Est. Year'         },
            { num: '188+', label: 'Customers'         },
            { num: '2',    label: 'Colourways'        },
            { num: '100%', label: 'Heavyweight Cotton' },
          ].map((s, i) => (
            <motion.div key={s.label} variants={staggerItem}>
              <div
                className="font-bebas text-4xl sm:text-5xl"
                style={{ color: 'var(--accent)' }}
              >
                {s.num}
              </div>
              <div className="font-condensed text-[0.65rem] tracking-widest uppercase text-white/30 mt-1">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-32 border-t border-white/[0.06]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-lg mx-auto px-5 sm:px-8 text-center space-y-6"
        >
          <WolfLogo size={38} color="var(--accent)" />

          <h2 className="font-bebas text-4xl sm:text-5xl tracking-wider leading-tight">
            THE PACK IS<br />
            <span className="shimmer-text">GROWING.</span>
          </h2>

          <p className="font-condensed text-[0.78rem] text-white/35 tracking-wider leading-relaxed">
            More pieces coming. Stay connected on Instagram for every drop.
          </p>

          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <Link to="/shop" className="btn-primary">
              <span>Shop Now</span>
            </Link>
            <a
              href="https://instagram.com/wolfofficial.co"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Follow Us
            </a>
          </div>
        </motion.div>
      </section>

      <Newsletter />
    </div>
  )
}