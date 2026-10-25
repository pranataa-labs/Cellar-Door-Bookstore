import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import { BookCoverImage } from '@/components/common/BookCoverImage'
import { X, Star, ShoppingBag, CheckCircle2, BookOpen, Calendar, Layers, ShieldCheck } from 'lucide-react'

export const BookDetailModal: React.FC = () => {
  const { selectedBook, setSelectedBook, addToCart } = useBookstore()
  const [qty, setQty] = useState(1)

  if (!selectedBook) return null

  const effectivePrice = selectedBook.discountPrice ?? selectedBook.price
  const hasDiscount = Boolean(selectedBook.discountPrice)
  const discountPercent = hasDiscount
    ? Math.round(((selectedBook.price - selectedBook.discountPrice!) / selectedBook.price) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(selectedBook, qty)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-150">
      <div
        className="relative w-full max-w-3xl rounded-xl border border-border bg-background p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedBook(null)}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition z-10"
        >
          <X className="size-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Cover & Badges */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative overflow-hidden rounded-lg shadow-md border border-border w-full max-w-[240px]">
              <BookCoverImage
                src={selectedBook.coverUrl}
                alt={selectedBook.title}
                title={selectedBook.title}
                author={selectedBook.author}
                category={selectedBook.category}
                className="w-full aspect-[2/3] object-cover"
              />
              {selectedBook.badge && (
                <span className="absolute top-2.5 left-2.5 rounded-md bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase shadow-xs z-10">
                  {selectedBook.badge}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-teal-500" />
              <span>100% Original & Bergaransi Resmi</span>
            </div>
          </div>

          {/* Details & Purchase */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {selectedBook.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                  <Star className="size-3.5 fill-amber-500 text-amber-500" />
                  <span>{selectedBook.rating}</span>
                  <span className="text-muted-foreground font-normal">({selectedBook.reviewCount} ulasan)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {selectedBook.title}
              </h2>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">
                Karya: <span className="text-foreground">{selectedBook.author}</span>
              </p>

              {/* Price Row */}
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-2xl font-bold text-foreground">
                  {formatRupiah(effectivePrice)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatRupiah(selectedBook.price)}
                    </span>
                    <span className="rounded bg-destructive/10 text-destructive text-xs font-semibold px-1.5 py-0.5">
                      Hemat {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Excerpt quote */}
              {selectedBook.excerpt && (
                <div className="mt-4 border-l-2 border-primary/40 pl-3 italic text-xs text-muted-foreground font-serif leading-relaxed">
                  "{selectedBook.excerpt}"
                </div>
              )}

              {/* Description */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Sinopsis Buku
                </h4>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  {selectedBook.description}
                </p>
              </div>

              {/* Meta specifications */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg border border-border bg-card/60 p-3 text-[11px]">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-3.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Penerbit</span>
                    <span className="font-medium text-foreground">{selectedBook.publisher}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Tahun Terbit</span>
                    <span className="font-medium text-foreground">{selectedBook.publishedYear}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="size-3.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Jumlah Halaman</span>
                    <span className="font-medium text-foreground">{selectedBook.pages} Hal.</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-teal-500" />
                  <div>
                    <span className="text-muted-foreground block text-[10px]">Stok Tersedia</span>
                    <span className="font-medium text-foreground">{selectedBook.stock} Eksemplar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-border flex items-center gap-3">
              <div className="flex items-center rounded-md border border-border">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  -
                </button>
                <span className="w-9 text-center text-xs font-semibold text-foreground">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(selectedBook.stock, qty + 1))}
                  className="px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-muted"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={selectedBook.stock <= 0}
                className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs disabled:opacity-50"
              >
                <ShoppingBag className="size-4" />
                <span>Tambah ke Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
