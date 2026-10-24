import React, { useState, useMemo } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { BookCategory } from '@/types'
import { formatRupiah } from '@/lib/utils'
import { Star, ShoppingBag, ArrowUpDown, Filter, Eye } from 'lucide-react'

const CATEGORIES: BookCategory[] = [
  'Semua',
  'Fiksi & Sastra',
  'Teknologi & Sains',
  'Filosofi & Pemikiran',
  'Bisnis & Finansial',
  'Pengembangan Diri',
  'Seni & Desain',
]

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc'

export const CatalogView: React.FC = () => {
  const {
    books,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setSelectedBook,
    addToCart,
  } = useBookstore()

  const [sortBy, setSortBy] = useState<SortOption>('default')

  // Filter & Sort
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const matchesCategory =
          selectedCategory === 'Semua' || book.category === selectedCategory
        const matchesQuery =
          !searchQuery.trim() ||
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesQuery
      })
      .sort((a, b) => {
        const priceA = a.discountPrice ?? a.price
        const priceB = b.discountPrice ?? b.price
        if (sortBy === 'price-asc') return priceA - priceB
        if (sortBy === 'price-desc') return priceB - priceA
        if (sortBy === 'rating-desc') return b.rating - a.rating
        return 0
      })
  }, [books, selectedCategory, searchQuery, sortBy])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Category Pills & Sort Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <ArrowUpDown className="size-3.5 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="h-8 rounded-md border border-input bg-card px-2.5 text-xs text-foreground focus:border-ring focus:outline-none"
            >
              <option value="default">Urutan: Rekomendasi</option>
              <option value="price-asc">Harga: Terendah ke Tertinggi</option>
              <option value="price-desc">Harga: Tertinggi ke Terendah</option>
              <option value="rating-desc">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Results Count & Active Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>
            Menampilkan <strong>{filteredBooks.length}</strong> buku
            {selectedCategory !== 'Semua' && ` dalam kategori "${selectedCategory}"`}
            {searchQuery && ` untuk kata kunci "${searchQuery}"`}
          </p>

          {(selectedCategory !== 'Semua' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Semua')
                setSearchQuery('')
              }}
              className="text-primary hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center space-y-3">
          <Filter className="size-10 text-muted-foreground stroke-1" />
          <h3 className="font-semibold text-foreground text-sm">Tidak ada buku yang cocok</h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            Coba sesuaikan kata kunci pencarian atau pilih kategori lain untuk melihat koleksi kami.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Semua')
              setSearchQuery('')
            }}
            className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 transition"
          >
            Tampilkan Semua Buku
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.map(book => {
            const effectivePrice = book.discountPrice ?? book.price
            const hasDiscount = Boolean(book.discountPrice)

            return (
              <div
                key={book.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-3 sm:p-4 shadow-xs transition hover:shadow-md hover:border-border/80"
              >
                <div>
                  {/* Book Cover Image container */}
                  <div
                    onClick={() => setSelectedBook(book)}
                    className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted cursor-pointer mb-3"
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Badge */}
                    {book.badge && (
                      <span className="absolute top-2 left-2 rounded bg-primary/95 text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 tracking-wider uppercase shadow-xs">
                        {book.badge}
                      </span>
                    )}

                    {/* Hover Quick View overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
                        <Eye className="size-3.5" />
                        <span>Lihat Detail</span>
                      </span>
                    </div>
                  </div>

                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground truncate">{book.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-500 font-medium">
                      <Star className="size-3 fill-amber-500 text-amber-500" />
                      <span>{book.rating}</span>
                    </div>
                  </div>

                  {/* Title & Author */}
                  <h3
                    onClick={() => setSelectedBook(book)}
                    className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 leading-snug cursor-pointer hover:text-primary transition"
                  >
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{book.author}</p>
                </div>

                {/* Price & Add to Cart button */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-foreground">
                      {formatRupiah(effectivePrice)}
                    </span>
                    {hasDiscount && (
                      <span className="text-[10px] text-muted-foreground line-through">
                        {formatRupiah(book.price)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(book, 1)}
                    disabled={book.stock <= 0}
                    className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-xs disabled:opacity-50"
                    title={book.stock <= 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                    aria-label="Tambah ke Keranjang"
                  >
                    <ShoppingBag className="size-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
