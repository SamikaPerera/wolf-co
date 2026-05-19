import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import MainLayout from './layouts/MainLayout'
import Home    from './pages/Home'
import Shop    from './pages/Shop'
import About   from './pages/About'
import Contact from './pages/Contact'

// 404 page
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-5">
      <span className="font-bebas text-[8rem] leading-none text-white/10">404</span>
      <h1 className="font-bebas text-4xl tracking-wider">Page Not Found</h1>
      <a href="/" className="btn-outline"><span>Go Home</span></a>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"        element={<Home />}    />
          <Route path="/shop"    element={<Shop />}    />
          <Route path="/about"   element={<About />}   />
          <Route path="/contact" element={<Contact />} />
          <Route path="*"        element={<NotFound />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}
