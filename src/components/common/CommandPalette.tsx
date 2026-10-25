import React, { useState, useEffect } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import { BookCoverImage } from '@/components/common/BookCoverImage'
import { Search, Book, ShieldCheck, Sun, Moon, ShoppingBag, X } from 'lucide-react'

export const CommandPalette: React.FC = () => {
  const {
    isCmdKOpen,
    setIsCmdKOpen,
    books,
    setSelectedBook,
    setActiveView,
    theme,
    toggleTheme,
    setIsCartOpen,
  } = useBookstore()

  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!isCmdKOpen) {
      setQuery('')
    }
  }, [isCmdKOpen])

  if (!isCmdKOpen) return null

  const filteredBooks = books.filter(
    b =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase()) ||
      b.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelectBook = (b: typeof books[0]) => {
    setSelectedBook(b)
    setIsCmdKOpen(false)
  }

  const handleNavigate = (view: 'store' | 'admin' | 'orders') => {
    setActiveView(view)
    setIsCmdKOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-150">
      <div
        className="w-full max-w-lg rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-3.5 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground mr-2.5" />
          <input
            autoFocus
            type="text"
            placeholder="Ketik untuk mencari buku, menu, atau perintah..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            onClick={() => setIsCmdKOpen(false)}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 text-xs space-y-3">
          {/* Section: Navigasi Cepat */}
          <div>
            <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Navigasi Cepat
            </p>
            <div className="space-y-0.5">
              <button
                onClick={() => handleNavigate('store')}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 hover:bg-accent text-left text-foreground transition"
              >
                <Book className="size-4 text-muted-foreground" />
                <span>Katalog Toko (Storefront)</span>
              </button>
              <button
                onClick={() => handleNavigate('admin')}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 hover:bg-accent text-left text-foreground transition"
              >
                <ShieldCheck className="size-4 text-teal-500" />
                <span>Admin Backoffice (Dashboard & Manajemen)</span>
              </button>
              <button
                onClick={() => {
                  setIsCmdKOpen(false)
                  setIsCartOpen(true)
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 hover:bg-accent text-left text-foreground transition"
              >
                <ShoppingBag className="size-4 text-muted-foreground" />
                <span>Buka Keranjang Belanja</span>
              </button>
              <button
                onClick={() => {
                  toggleTheme()
                  setIsCmdKOpen(false)
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 hover:bg-accent text-left text-foreground transition"
              >
                {theme === 'dark' ? (
                  <Sun className="size-4 text-amber-500" />
                ) : (
                  <Moon className="size-4 text-indigo-500" />
                )}
                <span>Ubah Tema ({theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'})</span>
              </button>
            </div>
          </div>

          {/* Section: Buku & Katalog */}
          <div>
            <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Buku ({filteredBooks.length})
            </p>
            {filteredBooks.length === 0 ? (
              <p className="px-2 py-3 text-center text-muted-foreground">
                Tidak ada buku yang sesuai dengan pencarian "{query}".
              </p>
            ) : (
              <div className="space-y-1">
                {filteredBooks.slice(0, 6).map(book => (
                  <button
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    className="flex w-full items-center justify-between rounded-md px-2.5 py-2 hover:bg-accent text-left transition group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <BookCoverImage
                        src={book.coverUrl}
                        alt={book.title}
                        title={book.title}
                        author={book.author}
                        category={book.category}
                        containerClassName="size-7 rounded shrink-0"
                        className="size-full object-cover"
                      />
                      <div className="truncate">
                        <p className="font-medium text-foreground truncate group-hover:text-primary">
                          {book.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">{book.author}</p>
                      </div>
                    </div>
                    <span className="shrink-0 font-semibold text-foreground pl-2 text-[11px]">
                      {formatRupiah(book.discountPrice ?? book.price)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-3.5 py-2 text-[11px] text-muted-foreground">
          <span>Gunakan <strong>↑↓</strong> untuk navigasi, <strong>Enter</strong> memilih</span>
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">
            ESC menutup
          </kbd>
        </div>
      </div>
    </div>
  )
}
