import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems]   = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product) => {
    setItems(prev => {
      const key = i => i.id === product.id && i.color === product.color && i.size === product.size
      const exists = prev.find(key)
      if (exists) return prev.map(i => key(i) ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (id, color, size) =>
    setItems(prev => prev.filter(i => !(i.id === id && i.color === color && i.size === size)))

  const updateQty = (id, color, size, qty) => {
    if (qty < 1) { removeItem(id, color, size); return }
    setItems(prev => prev.map(i =>
      i.id === id && i.color === color && i.size === size ? { ...i, qty } : i
    ))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
