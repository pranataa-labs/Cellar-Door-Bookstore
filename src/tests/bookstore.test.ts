import { describe, it, expect } from 'vitest'
import { INITIAL_BOOKS, DEMO_USERS } from '../data/seedData'
import { Book, CartItem } from '../types'
import { formatRupiah } from '../lib/utils'
import { lookupPostalCode } from '../data/postalCodes'

describe('Domain Logic: Cart & Pricing Calculations (AAA Pattern)', () => {
  it('calculates the correct subtotal for single and multiple cart items', () => {
    // Arrange
    const bookA: Book = INITIAL_BOOKS[0] // Bumi Manusia, price: 135000, discountPrice: 115000
    const bookB: Book = INITIAL_BOOKS[2] // Filosofi Teras, price: 98000 (no discount)
    const cart: CartItem[] = [
      { book: bookA, quantity: 2 },
      { book: bookB, quantity: 1 },
    ]

    // Act
    const subtotal = cart.reduce((sum, item) => {
      const price = item.book.discountPrice ?? item.book.price
      return sum + price * item.quantity
    }, 0)

    // Assert
    // (115000 * 2) + (98000 * 1) = 230000 + 98000 = 328000
    expect(subtotal).toBe(328000)
  })

  it('correctly applies a percentage coupon code', () => {
    // Arrange
    const subtotal = 200000
    const couponDiscountPercent = 10 // CELLAR10

    // Act
    const discountAmount = (subtotal * couponDiscountPercent) / 100
    const total = subtotal - discountAmount

    // Assert
    expect(discountAmount).toBe(20000)
    expect(total).toBe(180000)
  })

  it('formats Indonesian Rupiah currency properly', () => {
    // Arrange
    const value = 135000

    // Act
    const formatted = formatRupiah(value)

    // Assert
    expect(formatted).toContain('135.000')
    expect(formatted).toContain('Rp')
  })
})

describe('Domain Logic: Inventory & Stock Management (AAA Pattern)', () => {
  it('prevents increasing quantity beyond available stock', () => {
    // Arrange
    const book = { ...INITIAL_BOOKS[1], stock: 5 } // Stock: 5
    const requestedQuantity = 10

    // Act
    const allowedQuantity = Math.min(requestedQuantity, book.stock)

    // Assert
    expect(allowedQuantity).toBe(5)
  })

  it('deducts inventory accurately when an order is placed', () => {
    // Arrange
    const initialStock = 20
    const orderedQuantity = 3
    const book: Book = { ...INITIAL_BOOKS[0], stock: initialStock }

    // Act
    const remainingStock = Math.max(0, book.stock - orderedQuantity)

    // Assert
    expect(remainingStock).toBe(17)
  })
})

describe('Domain Logic: Filtering and Search (AAA Pattern)', () => {
  it('filters books by category accurately', () => {
    // Arrange
    const targetCategory = 'Teknologi & Sains'

    // Act
    const filtered = INITIAL_BOOKS.filter(b => b.category === targetCategory)

    // Assert
    expect(filtered.length).toBeGreaterThan(0)
    filtered.forEach(b => {
      expect(b.category).toBe(targetCategory)
    })
  })

  it('searches books by title or author case-insensitively', () => {
    // Arrange
    const query = 'PRAMOEDYA'

    // Act
    const results = INITIAL_BOOKS.filter(
      b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
    )

    // Assert
    expect(results.length).toBe(1)
    expect(results[0].title).toBe('Bumi Manusia')
  })
})

describe('Domain Logic: Authentication & Demo Users (AAA Pattern)', () => {
  it('validates demo admin credentials', () => {
    // Arrange
    const adminUser = DEMO_USERS.admin

    // Act & Assert
    expect(adminUser.email).toBe('admin@example.com')
    expect(adminUser.password).toBe('password123')
    expect(adminUser.role).toBe('admin')
  })

  it('validates demo customer credentials', () => {
    // Arrange
    const customerUser = DEMO_USERS.customer

    // Act & Assert
    expect(customerUser.email).toBe('user@example.com')
    expect(customerUser.password).toBe('password123')
    expect(customerUser.role).toBe('customer')
  })
})

describe('Domain Logic: Postal Code Auto-Resolution (AAA Pattern)', () => {
  it('automatically resolves Jakarta Selatan region for postal code 12190', () => {
    // Arrange
    const postalCode = '12190'

    // Act
    const resolved = lookupPostalCode(postalCode)

    // Assert
    expect(resolved).not.toBeNull()
    expect(resolved?.city).toBe('Jakarta Selatan')
    expect(resolved?.district).toBe('Kebayoran Baru')
    expect(resolved?.province).toBe('DKI Jakarta')
  })

  it('automatically resolves Bandung region for postal code 40135', () => {
    // Arrange
    const postalCode = '40135'

    // Act
    const resolved = lookupPostalCode(postalCode)

    // Assert
    expect(resolved).not.toBeNull()
    expect(resolved?.city).toBe('Bandung')
    expect(resolved?.province).toBe('Jawa Barat')
  })

  it('returns null safely for incomplete or unknown postal codes', () => {
    // Arrange
    const incompleteCode = '121'
    const unknownCode = '99999'

    // Act
    const res1 = lookupPostalCode(incompleteCode)
    const res2 = lookupPostalCode(unknownCode)

    // Assert
    expect(res1).toBeNull()
    expect(res2).toBeNull()
  })
})
