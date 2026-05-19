export default function WolfLogo({ size = 32 }) {
  return (
    <img
      src="/logo.png"
      alt="Wolf.co logo"
      width={size}
      height={size}
      style={{ objectFit: 'contain' }}
    />
  )
}