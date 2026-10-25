import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import { BookCoverImage } from '@/components/common/BookCoverImage'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react'

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    setActiveView,
  } = useBookstore()

  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null)
  const [couponError, setCouponError] = useState('')

  if (!isCartOpen) return null

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase()
    if (code === 'CELLAR10') {
      setAppliedCoupon({ code: 'CELLAR10', discountPercent: 10 })
      setCouponError('')
    } else if (code === 'LITERASI') {
      setAppliedCoupon({ code: 'LITERASI', discountPercent: 15 })
      setCouponError('')
    } else {
      setCouponError('Kode voucher tidak valid. Coba: CELLAR10 atau LITERASI')
    }
  }

  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercent) / 100 : 0
  const finalTotal = Math.max(0, cartSubtotal - discountAmount)

  const handleProceedToCheckout = () => {
    setIsCartOpen(false)
    setActiveView('checkout')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-border bg-background shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-primary" />
              <h2 className="font-semibold text-foreground text-base">Keranjang Belanja</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {cart.length} item
              </span>
            </div>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-muted-foreground hover:text-destructive transition flex items-center gap-1 px-2 py-1 rounded hover:bg-destructive/10"
                  title="Kosongkan seluruh isi keranjang"
                >
                  <Trash2 className="size-3" />
                  <span>Kosongkan</span>
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition"
                aria-label="Tutup"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="size-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <ShoppingBag className="size-8 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">Keranjang Anda Kosong</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[240px]">
                    Jelajahi koleksi buku kurasi kami dan temukan bacaan istimewa untuk hari ini.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs font-medium text-primary hover:underline"
                >
                  Mulai Jelajahi Katalog →
                </button>
              </div>
            ) : (
              cart.map(item => {
                const effectivePrice = item.book.discountPrice ?? item.book.price
                return (
                  <div
                    key={item.book.id}
                    className="flex gap-3.5 rounded-lg border border-border p-3 bg-card/60 transition hover:border-border/80"
                  >
                    <BookCoverImage
                      src={item.book.coverUrl}
                      alt={item.book.title}
                      title={item.book.title}
                      author={item.book.author}
                      category={item.book.category}
                      className="size-full object-cover shadow-2xs"
                      containerClassName="h-20 w-14 shrink-0 rounded"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-xs text-foreground line-clamp-1 leading-snug">
                            {item.book.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.book.id)}
                            className="text-muted-foreground hover:text-destructive transition p-0.5"
                            title="Hapus"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{item.book.author}</p>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="text-xs font-semibold text-foreground">
                            {formatRupiah(effectivePrice)}
                          </span>
                          {item.book.discountPrice && (
                            <span className="text-[10px] text-muted-foreground line-through">
                              {formatRupiah(item.book.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center rounded-md border border-border bg-background">
                          <button
                            onClick={() => updateCartQuantity(item.book.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted text-muted-foreground transition"
                            aria-label="Kurangi"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.book.id, item.quantity + 1)}
                            disabled={item.quantity >= item.book.stock}
                            className="p-1 hover:bg-muted text-muted-foreground disabled:opacity-30 transition"
                            aria-label="Tambah"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-foreground">
                          {formatRupiah(effectivePrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer with Voucher and Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-border bg-card/40 p-5 space-y-4">
              {/* Voucher section */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Ketik voucher (misal: CELLAR10)"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="w-full h-8 rounded-md border border-input bg-background pl-8 pr-2 text-xs uppercase placeholder:normal-case focus:border-ring focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => handleApplyCoupon()}
                    className="h-8 px-3 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition"
                  >
                    Terapkan
                  </button>
                </div>

                {/* Quick Voucher Chips */}
                {!appliedCoupon && (
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span>Voucher aktif:</span>
                    <button
                      onClick={() => handleApplyCoupon('CELLAR10')}
                      className="rounded border border-dashed border-teal-500/50 bg-teal-500/10 px-1.5 py-0.5 font-mono text-[10px] text-teal-600 dark:text-teal-400 hover:bg-teal-500/20"
                    >
                      CELLAR10 (-10%)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon('LITERASI')}
                      className="rounded border border-dashed border-sky-500/50 bg-sky-500/10 px-1.5 py-0.5 font-mono text-[10px] text-sky-600 dark:text-sky-400 hover:bg-sky-500/20"
                    >
                      LITERASI (-15%)
                    </button>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex items-center justify-between rounded bg-teal-500/10 border border-teal-500/20 px-2 py-1 text-xs text-teal-700 dark:text-teal-300">
                    <span className="flex items-center gap-1">
                      <Check className="size-3" />
                      Voucher <strong>{appliedCoupon.code}</strong> aktif ({appliedCoupon.discountPercent}%)
                    </span>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-muted-foreground hover:text-foreground text-[10px]"
                    >
                      Batal
                    </button>
                  </div>
                )}

                {couponError && <p className="text-[11px] text-destructive">{couponError}</p>}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatRupiah(cartSubtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-teal-600 dark:text-teal-400">
                    <span>Potongan Diskon</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2 font-bold text-sm text-foreground">
                  <span>Total Estimasi</span>
                  <span>{formatRupiah(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 h-10 rounded-md bg-primary text-primary-foreground font-medium text-xs shadow-xs hover:bg-primary/90 transition"
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
