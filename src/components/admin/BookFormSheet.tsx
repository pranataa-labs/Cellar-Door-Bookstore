import React, { useState, useEffect } from 'react'
import { Book, BookCategory } from '@/types'
import { BookCoverImage } from '@/components/common/BookCoverImage'
import { X, Check, BookOpen } from 'lucide-react'

interface BookFormSheetProps {
  isOpen: boolean
  onClose: () => void
  onSave: (bookData: Omit<Book, 'id'>) => void
  initialBook?: Book | null
}

const CATEGORIES: Exclude<BookCategory, 'Semua'>[] = [
  'Fiksi & Sastra',
  'Teknologi & Sains',
  'Filosofi & Pemikiran',
  'Bisnis & Finansial',
  'Pengembangan Diri',
  'Seni & Desain',
]

export const BookFormSheet: React.FC<BookFormSheetProps> = ({
  isOpen,
  onClose,
  onSave,
  initialBook,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [category, setCategory] = useState<Exclude<BookCategory, 'Semua'>>('Fiksi & Sastra')
  const [price, setPrice] = useState<number>(95000)
  const [discountPrice, setDiscountPrice] = useState<number | undefined>(undefined)
  const [stock, setStock] = useState<number>(20)
  const [publisher, setPublisher] = useState('')
  const [publishedYear, setPublishedYear] = useState<number>(2024)
  const [pages, setPages] = useState<number>(320)
  const [coverUrl, setCoverUrl] = useState('')
  const [description, setDescription] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [badge, setBadge] = useState<Book['badge']>(undefined)

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title)
      setAuthor(initialBook.author)
      setIsbn(initialBook.isbn)
      setCategory(initialBook.category)
      setPrice(initialBook.price)
      setDiscountPrice(initialBook.discountPrice)
      setStock(initialBook.stock)
      setPublisher(initialBook.publisher)
      setPublishedYear(initialBook.publishedYear)
      setPages(initialBook.pages)
      setCoverUrl(initialBook.coverUrl)
      setDescription(initialBook.description)
      setExcerpt(initialBook.excerpt || '')
      setBadge(initialBook.badge)
    } else {
      // Default new book state
      setTitle('')
      setAuthor('')
      setIsbn(`978-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-0`)
      setCategory('Fiksi & Sastra')
      setPrice(95000)
      setDiscountPrice(undefined)
      setStock(25)
      setPublisher('Cellar Door Publishing')
      setPublishedYear(2026)
      setPages(280)
      setCoverUrl('https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80')
      setDescription('')
      setExcerpt('')
      setBadge('Rilisan Baru')
    }
  }, [initialBook, isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      author,
      isbn,
      category,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      stock: Number(stock),
      rating: initialBook ? initialBook.rating : 5.0,
      reviewCount: initialBook ? initialBook.reviewCount : 1,
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop&q=80',
      description,
      excerpt,
      publisher,
      publishedYear: Number(publishedYear),
      pages: Number(pages),
      badge,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in-0 duration-150">
      <div
        className="w-full max-w-lg bg-background border-l border-border h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <h3 className="font-bold text-base text-foreground">
              {initialBook ? 'Edit Data Buku' : 'Tambah Buku Baru'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Title */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Judul Buku *</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Contoh: Bumi Manusia"
              className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs focus:border-ring focus:outline-none"
            />
          </div>

          {/* Author & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Penulis *</label>
              <input
                type="text"
                required
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="Nama penulis"
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs focus:border-ring focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Kategori *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as Exclude<BookCategory, 'Semua'>)}
                className="w-full h-9 rounded-md border border-input bg-card px-2.5 text-xs focus:border-ring focus:outline-none"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ISBN & Badge */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">ISBN</label>
              <input
                type="text"
                value={isbn}
                onChange={e => setIsbn(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs focus:border-ring focus:outline-none font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Badge Label</label>
              <select
                value={badge || ''}
                onChange={e => setBadge(e.target.value ? (e.target.value as Book['badge']) : undefined)}
                className="w-full h-9 rounded-md border border-input bg-card px-2.5 text-xs focus:border-ring focus:outline-none"
              >
                <option value="">Tanpa Badge</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Pilihan Editor">Pilihan Editor</option>
                <option value="Klasik">Klasik</option>
                <option value="Rilisan Baru">Rilisan Baru</option>
              </select>
            </div>
          </div>

          {/* Price, Discount, Stock */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Harga (IDR) *</label>
              <input
                type="number"
                required
                min={0}
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs focus:border-ring focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Harga Diskon</label>
              <input
                type="number"
                min={0}
                value={discountPrice || ''}
                onChange={e => setDiscountPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Opsional"
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs focus:border-ring focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Stok Unit *</label>
              <input
                type="number"
                required
                min={0}
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs focus:border-ring focus:outline-none"
              />
            </div>
          </div>

          {/* Publisher, Pages, Year */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Penerbit</label>
              <input
                type="text"
                value={publisher}
                onChange={e => setPublisher(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Jml Halaman</label>
              <input
                type="number"
                value={pages}
                onChange={e => setPages(Number(e.target.value))}
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Tahun</label>
              <input
                type="number"
                value={publishedYear}
                onChange={e => setPublishedYear(Number(e.target.value))}
                className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">URL Gambar Sampul</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={coverUrl}
                onChange={e => setCoverUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 h-9 rounded-md border border-input bg-card px-3 text-xs font-mono"
              />
              {coverUrl && (
                <BookCoverImage
                  src={coverUrl}
                  alt={title || 'Preview'}
                  title={title || 'Preview Judul'}
                  author={author || 'Penulis'}
                  category={category}
                  containerClassName="size-9 rounded border border-border shrink-0"
                  className="size-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Excerpt quote */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Kutipan / Excerpt Singkat</label>
            <input
              type="text"
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Kutipan berkesan dari buku..."
              className="w-full h-9 rounded-md border border-input bg-card px-3 text-xs italic"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-semibold text-foreground">Sinopsis / Deskripsi Buku</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Penjelasan ringkas isi buku..."
              className="w-full rounded-md border border-input bg-card p-2.5 text-xs"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-border flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-md border border-border hover:bg-muted font-medium text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 h-9 px-4 rounded-md bg-primary text-primary-foreground font-medium text-xs shadow-xs hover:bg-primary/90"
            >
              <Check className="size-4" />
              <span>Simpan Buku</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
