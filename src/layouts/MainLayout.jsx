import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CartDrawer from '../components/CartDrawer'
import ScrollProgress from '../components/ScrollProgress'
import Cursor from '../components/Cursor'
import Footer from '../components/Footer'
import { useScrollTop } from '../hooks/useScrollTop'

export default function MainLayout() {
  useScrollTop()
  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />
      {/* Cursor (desktop only) */}
      <Cursor />
      {/* Scroll progress bar */}
      <ScrollProgress />
      {/* Sticky nav */}
      <Navbar />
      {/* Cart drawer */}
      <CartDrawer />
      {/* Page content */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </>
  )
}
