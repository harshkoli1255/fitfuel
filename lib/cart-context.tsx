"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/types'

export type CartItem = {
  id: string // Unique id combining product ID and variant
  product: Product
  flavor: string
  size: string
  quantity: number
  price: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  cartCount: number
  cartTotal: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  
  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fitfuel_cart')
    if (saved) {
      try { 
        const parsed = JSON.parse(saved)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(parsed) 
      } catch (e) {
        console.error("Cart parse error", e)
      }
    }
  }, [])

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('fitfuel_cart', JSON.stringify(items))
  }, [items])

  const addItem = (newItem: CartItem) => {
    setItems(current => {
      const existing = current.find(item => item.id === newItem.id)
      if (existing) {
        return current.map(item => 
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      return [...current, newItem]
    })
    openCart()
  }

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(current => current.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, cartCount, cartTotal, isOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
