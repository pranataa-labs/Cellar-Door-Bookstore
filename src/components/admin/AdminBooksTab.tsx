import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { Book, BookCategory } from '@/types'
import { formatRupiah } from '@/lib/utils'
import { BookCoverImage } from '@/components/common/BookCoverImage'
import { BookFormSheet } from './BookFormSheet'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
} from 'lucide-react'

export const AdminBooksTab: React.FC = () => {
  const { books, addBook, updateBook, deleteBook, setSelectedBook } = useBookstore()

  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<BookCategory>('Semua')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const filteredBooks = books.filter(b => {
    const matchesCat = categoryFilter === 'Semua' || b.category === categoryFilter
    const matchesQuery =
      !query.trim() ||
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase()) ||
      b.isbn.toLowerCase().includes(query.toLowerCase())
    return matchesCat && matchesQuery
  })

  const handleOpenAdd = () => {
    setEditingBook(null)
    setIsSheetOpen(true)
  }

  const handleOpenEdit = (book: Book) => {
    setEditingBook(book)
    setIsSheetOpen(true)
  }

  const handleSaveBook = (bookData: Omit<Book, 'id'>) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData)
    } else {
      addBook(bookData)
    }
  }

  const handleDelete = (id: string) => {
    deleteBook(id)
    setDeleteConfirmId(null)
  }

  const getStockBadge = (stock: number) => {
    if (stock <= 0) {
      return (
        <span className="inline-flex items-center gap-1 rounded bg-destructive/10 text-destructive px-2 py-0.5 text-[10px] font-semibold border border-destructive/20">
          <XCircle className="size-3" />
          <span>Habis (0)</span>
        </span>
      )
    }
    if (stock < 15) {
      return (
        <span className="inline-flex items-center gap-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 text-[10px] font-semibold border border-amber-500/20">
          <AlertTriangle className="size-3" />
          <span>Menipis ({stock})</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2 py-0.5 text-[10px] font-semibold border border-teal-500/20">
        <CheckCircle2 className="size-3" />
        <span>Tersedia ({stock})</span>
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Title & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Katalog & Stok Buku</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Kelola judul, harga promosi, nomor ISBN, serta ketersediaan stok fisik.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 h-9 px-4 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Tambah Buku Baru</span>
        </button>
      </div>

      {/* Toolbar: Search & Faceted Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 w-full sm:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari judul, penulis, atau ISBN..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full h-8 rounded-md border border-input bg-card pl-8 pr-3 text-xs focus:border-ring focus:outline-none"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value as BookCategory)}
            className="h-8 rounded-md border border-input bg-card px-2.5 text-xs text-foreground focus:border-ring focus:outline-none"
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Fiksi & Sastra">Fiksi & Sastra</option>
            <option value="Teknologi & Sains">Teknologi & Sains</option>
            <option value="Filosofi & Pemikiran">Filosofi & Pemikiran</option>
            <option value="Bisnis & Finansial">Bisnis & Finansial</option>
            <option value="Pengembangan Diri">Pengembangan Diri</option>
            <option value="Seni & Desain">Seni & Desain</option>
          </select>
        </div>

        <span className="text-xs text-muted-foreground self-end sm:self-auto">
          Total <strong>{filteredBooks.length}</strong> judul
        </span>
      </div>

      {/* Data Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
              <tr>
                <th className="py-3 px-4 w-12 text-center">No</th>
                <th className="py-3 px-4">Buku & Penulis</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">ISBN</th>
                <th className="py-3 px-4 text-right">Harga Satuan</th>
                <th className="py-3 px-4">Kondisi Stok</th>
                <th className="py-3 px-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    Tidak ada buku yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredBooks.map((book, idx) => (
                  <tr key={book.id} className="hover:bg-muted/30 transition">
                    <td className="py-3 px-4 text-center font-mono text-muted-foreground">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <BookCoverImage
                          src={book.coverUrl}
                          alt={book.title}
                          title={book.title}
                          author={book.author}
                          category={book.category}
                          containerClassName="size-10 rounded border border-border shrink-0"
                          className="size-full object-cover"
                        />
                        <div className="max-w-xs truncate">
                          <p className="font-semibold text-foreground truncate">{book.title}</p>
                          <p className="text-[11px] text-muted-foreground truncate">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">
                      {book.isbn}
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-foreground">
                      {formatRupiah(book.discountPrice ?? book.price)}
                      {book.discountPrice && (
                        <span className="block text-[10px] text-muted-foreground line-through">
                          {formatRupiah(book.price)}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{getStockBadge(book.stock)}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedBook(book)}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                          title="Pratinjau"
                        >
                          <Eye className="size-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(book)}
                          className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                          title="Edit"
                        >
                          <Edit className="size-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(book.id)}
                          className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          title="Hapus"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 space-y-4 shadow-xl">
            <h4 className="font-bold text-sm text-foreground">Konfirmasi Penghapusan Buku</h4>
            <p className="text-xs text-muted-foreground">
              Apakah Anda yakin ingin menghapus buku ini dari katalog? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="h-8 px-3 rounded-md border border-border hover:bg-muted text-xs font-medium"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="h-8 px-3 rounded-md bg-destructive text-primary-foreground text-xs font-medium hover:bg-destructive/90"
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Sheet for Add / Edit */}
      <BookFormSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onSave={handleSaveBook}
        initialBook={editingBook}
      />
    </div>
  )
}
