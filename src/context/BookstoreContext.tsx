import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Book, BookCategory, CartItem, Order, OrderStatus, User, UserAccount } from '@/types'
import { DEFAULT_USER_ACCOUNTS, INITIAL_BOOKS, INITIAL_ORDERS } from '@/data/seedData'
import { toast } from 'sonner'

interface BookstoreContextType {
  // Books catalog
  books: Book[]
  selectedCategory: BookCategory
  setSelectedCategory: (cat: BookCategory) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  addBook: (book: Omit<Book, 'id'>) => void
  updateBook: (id: string, book: Partial<Book>) => void
  deleteBook: (id: string) => void
  selectedBook: Book | null
  setSelectedBook: (book: Book | null) => void

  // Cart
  cart: CartItem[]
  addToCart: (book: Book, quantity?: number) => void
  removeFromCart: (bookId: string) => void
  updateCartQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  cartSubtotal: number
  cartItemCount: number

  // Orders
  orders: Order[]
  createOrder: (orderData: {
    customerName: string
    customerEmail: string
    customerPhone: string
    postalCode: string
    province?: string
    city: string
    district?: string
    shippingAddress: string
    paymentMethod: Order['paymentMethod']
    shippingCost: number
    discount: number
  }) => Order
  updateOrderStatus: (orderId: string, status: OrderStatus) => void

  // Real Auth & Registration
  currentUser: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string, phone?: string) => boolean
  logout: () => void
  isAuthModalOpen: boolean
  authModalMode: 'login' | 'register'
  openAuthModal: (mode?: 'login' | 'register') => void
  closeAuthModal: () => void

  // Navigation / Shell
  activeView: 'store' | 'admin' | 'orders' | 'checkout' | 'success'
  setActiveView: (view: 'store' | 'admin' | 'orders' | 'checkout' | 'success') => void
  lastPlacedOrder: Order | null
  
  // Theme & Cmd+K
  theme: 'light' | 'dark'
  toggleTheme: () => void
  isCmdKOpen: boolean
  setIsCmdKOpen: (open: boolean) => void
}

const BookstoreContext = createContext<BookstoreContextType | undefined>(undefined)

const STORAGE_KEYS = {
  BOOKS: 'cellar_books_v2',
  CART: 'cellar_cart_v3',
  ORDERS: 'cellar_orders_v2',
  USERS_DB: 'cellar_users_db_v1',
  SESSION_USER: 'cellar_session_user_v1',
  THEME: 'cellar_theme_v2',
}

// Clean up legacy cart cache from prior testing versions
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('cellar_cart_v1')
    localStorage.removeItem('cellar_cart_v2')
  } catch {
    // Ignore in non-browser environments
  }
}

export function BookstoreProvider({ children }: { children: ReactNode }) {
  // 1. Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME)
    return (saved as 'light' | 'dark') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  // 2. Real User Database & Auth State
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS_DB)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return DEFAULT_USER_ACCOUNTS
      }
    }
    return DEFAULT_USER_ACCOUNTS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users))
  }, [users])

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSION_USER)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
    return null // Defaults to Guest
  })

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login')

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase()
    const found = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === pass)
    if (found) {
      const { password: _, ...userData } = found
      setCurrentUser(userData)
      localStorage.setItem(STORAGE_KEYS.SESSION_USER, JSON.stringify(userData))
      toast.success(`Selamat datang kembali, ${userData.name}!`)
      return true
    }
    toast.error('Email atau kata sandi tidak cocok. Silakan periksa kembali.')
    return false
  }

  const register = (name: string, email: string, pass: string, phone?: string): boolean => {
    const cleanEmail = email.trim().toLowerCase()
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail)
    if (existing) {
      toast.error('Alamat email ini sudah terdaftar. Silakan masuk.')
      return false
    }

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: pass,
      phone: phone?.trim(),
      role: 'customer',
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString(),
    }

    setUsers(prev => [newUser, ...prev])
    const { password: _, ...cleanUserData } = newUser
    setCurrentUser(cleanUserData)
    localStorage.setItem(STORAGE_KEYS.SESSION_USER, JSON.stringify(cleanUserData))
    toast.success('Pendaftaran berhasil! Selamat datang di Cellar Door Bookstore.')
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(STORAGE_KEYS.SESSION_USER)
    setCart([])
    localStorage.removeItem(STORAGE_KEYS.CART)
    if (activeView === 'admin') {
      setActiveView('store')
    }
    toast.info('Anda telah keluar dari akun.')
  }

  // 3. Books State
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKS)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return INITIAL_BOOKS
      }
    }
    return INITIAL_BOOKS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books))
  }, [books])

  const addBook = (newBookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...newBookData,
      id: `book-${Date.now()}`,
    }
    setBooks(prev => [newBook, ...prev])
    toast.success(`Buku "${newBook.title}" berhasil ditambahkan ke katalog`)
  }

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)))
    toast.success('Informasi buku berhasil diperbarui')
  }

  const deleteBook = (id: string) => {
    const target = books.find(b => b.id === id)
    setBooks(prev => prev.filter(b => b.id !== id))
    toast.success(`Buku "${target?.title || id}" telah dihapus`)
  }

  // 4. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
  }, [cart])

  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (book: Book, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id)
      if (existing) {
        return prev.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, book.stock) }
            : item
        )
      }
      return [...prev, { book, quantity: Math.min(quantity, book.stock) }]
    })
    toast.success(`"${book.title}" ditambahkan ke keranjang`, {
      description: `${quantity} eksemplar telah masuk keranjang belanja.`,
    })
  }

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId))
    toast.info('Item dihapus dari keranjang')
  }

  const updateCartQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.book.id === bookId
          ? { ...item, quantity: Math.min(quantity, item.book.stock) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem(STORAGE_KEYS.CART)
    toast.info('Keranjang belanja telah dikosongkan')
  }

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.book.discountPrice ?? item.book.price
    return sum + price * item.quantity
  }, 0)

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // 5. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return INITIAL_ORDERS
      }
    }
    return INITIAL_ORDERS
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders))
  }, [orders])

  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null)

  const createOrder = (orderData: {
    customerName: string
    customerEmail: string
    customerPhone: string
    postalCode: string
    province?: string
    city: string
    district?: string
    shippingAddress: string
    paymentMethod: Order['paymentMethod']
    shippingCost: number
    discount: number
  }): Order => {
    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`
    const subtotal = cartSubtotal
    const total = Math.max(0, subtotal - orderData.discount + orderData.shippingCost)

    const newOrder: Order = {
      id: orderId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      postalCode: orderData.postalCode,
      province: orderData.province,
      city: orderData.city,
      district: orderData.district,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      items: [...cart],
      subtotal,
      discount: orderData.discount,
      shippingCost: orderData.shippingCost,
      total,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      trackingNumber: `SICEPAT-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    }

    // Deduct stock from books
    setBooks(prev =>
      prev.map(book => {
        const cartItem = cart.find(ci => ci.book.id === book.id)
        if (cartItem) {
          return { ...book, stock: Math.max(0, book.stock - cartItem.quantity) }
        }
        return book
      })
    )

    setOrders(prev => [newOrder, ...prev])
    setLastPlacedOrder(newOrder)
    clearCart()
    setActiveView('success')
    toast.success('Pesanan berhasil dibuat!', {
      description: `Nomor Pesanan: ${orderId}. Terima kasih telah berbelanja di Cellar Door.`,
    })

    return newOrder
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(order => (order.id === orderId ? { ...order, status } : order))
    )
    toast.success(`Status pesanan ${orderId} diubah menjadi: ${status}`)
  }

  // 6. Navigation and Filter state
  const [activeView, setActiveView] = useState<'store' | 'admin' | 'orders' | 'checkout' | 'success'>('store')
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isCmdKOpen, setIsCmdKOpen] = useState(false)

  // Listen to keyboard shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCmdKOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <BookstoreContext.Provider
      value={{
        books,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        addBook,
        updateBook,
        deleteBook,
        selectedBook,
        setSelectedBook,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartItemCount,

        orders,
        createOrder,
        updateOrderStatus,

        currentUser,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,

        activeView,
        setActiveView,
        lastPlacedOrder,

        theme,
        toggleTheme,
        isCmdKOpen,
        setIsCmdKOpen,
      }}
    >
      {children}
    </BookstoreContext.Provider>
  )
}

export function useBookstore() {
  const context = useContext(BookstoreContext)
  if (!context) {
    throw new Error('useBookstore must be used within a BookstoreProvider')
  }
  return context
}
