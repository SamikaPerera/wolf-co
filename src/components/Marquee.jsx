const WORDS = ['Performance', '×', 'Lifestyle', '—', 'Wolf.co', '—', 'Sri Lanka', '×', 'Designed for Confidence', '—', 'From the Streets', '×']

export default function Marquee() {
  const doubled = [...WORDS, ...WORDS]
  return (
    <div className="py-[18px] border-y overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }} aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((w, i) => (
          <span
            key={i}
            className="font-condensed text-[0.78rem] tracking-[0.25em] uppercase mx-5"
            style={{ color: (w === '×' || w === '—') ? 'var(--accent)' : 'rgba(245,245,240,0.28)' }}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  )
}
