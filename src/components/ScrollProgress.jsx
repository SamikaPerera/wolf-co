import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div
      className="scroll-bar"
      style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      aria-hidden="true"
    />
  )
}
