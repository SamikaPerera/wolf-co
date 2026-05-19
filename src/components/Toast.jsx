export default function Toast({ message, show }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast${show ? ' show' : ''}`}
    >
      {message}
    </div>
  )
}
