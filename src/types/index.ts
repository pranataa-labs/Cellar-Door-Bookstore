export type BookCategory = 
  | 'Semua'
  | 'Fiksi & Sastra'
  | 'Teknologi & Sains'
  | 'Filosofi & Pemikiran'
  | 'Bisnis & Finansial'
  | 'Pengembangan Diri'
  | 'Seni & Desain'

export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: Exclude<BookCategory, 'Semua'>
  price: number
  discountPrice?: number
  stock: number
  rating: number
  reviewCount: number
  coverUrl: string
  description: string
  excerpt: string
  publisher: string
  publishedYear: number
  pages: number
  featured?: boolean
  badge?: 'Bestseller' | 'Pilihan Editor' | 'Klasik' | 'Rilisan Baru'
}

export interface CartItem {
  book: Book
  quantity: number
}

export type OrderStatus = 'Pending' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan'

export type PaymentMethod = 'qris' | 'bank_transfer' | 'credit_card' | 'cod'

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  postalCode: string
  province?: string
  city: string
  district?: string
  shippingAddress: string
  paymentMethod: PaymentMethod
  items: CartItem[]
  subtotal: number
  discount: number
  shippingCost: number
  total: number
  status: OrderStatus
  createdAt: string
  trackingNumber?: string
}

export type UserRole = 'admin' | 'customer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  avatarUrl?: string
  createdAt?: string
}

export interface UserAccount extends User {
  password: string
}

export interface BookReview {
  id: string
  bookId: string
  userName: string
  rating: number
  comment: string
  date: string
}
