import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import { BookCoverImage } from '@/components/common/BookCoverImage'
import { Award, PieChart } from 'lucide-react'

export const AdminAnalyticsTab: React.FC = () => {
  const { books, orders } = useBookstore()

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0

  // Category breakdown
  const categoryStats = [
    { name: 'Fiksi & Sastra', percentage: 38, count: '4 Judul', color: 'bg-primary' },
    { name: 'Teknologi & Sains', percentage: 26, count: '2 Judul', color: 'bg-sky-500' },
    { name: 'Filosofi & Pemikiran', percentage: 18, count: '2 Judul', color: 'bg-amber-500' },
    { name: 'Bisnis & Finansial', percentage: 12, count: '2 Judul', color: 'bg-teal-500' },
    { name: 'Pengembangan Diri & Seni', percentage: 6, count: '2 Judul', color: 'bg-indigo-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Analitik & Laporan Performa
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Wawasan data penjualan, rata-rata transaksi, dan kategori paling diminati pembaca.
        </p>
      </div>

      {/* 3 Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Average Order Value (AOV)</span>
          <div className="text-2xl font-bold text-foreground">{formatRupiah(avgOrderValue)}</div>
          <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">+8.4% dari rata-rata industri</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Tingkat Repeat Order</span>
          <div className="text-2xl font-bold text-foreground">42.8%</div>
          <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">Tinggi (Komunitas loyal)</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 space-y-1">
          <span className="text-xs font-medium text-muted-foreground">Kepuasan Pembaca (CSAT)</span>
          <div className="text-2xl font-bold text-foreground">4.88 / 5.0</div>
          <p className="text-[11px] text-muted-foreground">Berdasarkan 2.100+ ulasan buku</p>
        </div>
      </div>

      {/* Two Columns: Category Shares & Top Selling Titles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Share */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground">Distribusi Omzet per Kategori</h3>
            <PieChart className="size-4 text-muted-foreground" />
          </div>

          <div className="space-y-3 pt-2">
            {categoryStats.map(cat => (
              <div key={cat.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">{cat.name}</span>
                  <span className="text-muted-foreground">{cat.percentage}% ({cat.count})</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    style={{ width: `${cat.percentage}%` }}
                    className={`h-full rounded-full ${cat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Titles */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground">Buku Terlaris Bulan Ini</h3>
            <Award className="size-4 text-amber-500" />
          </div>

          <div className="space-y-3">
            {books.slice(0, 4).map((book, idx) => (
              <div key={book.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-bold font-mono text-muted-foreground size-5 flex items-center justify-center">
                    #{idx + 1}
                  </span>
                  <BookCoverImage
                    src={book.coverUrl}
                    alt={book.title}
                    title={book.title}
                    author={book.author}
                    category={book.category}
                    containerClassName="size-9 rounded border border-border shrink-0"
                    className="size-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground truncate max-w-[180px]">{book.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{book.author}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-foreground">
                    {formatRupiah(book.discountPrice ?? book.price)}
                  </span>
                  <span className="block text-[10px] text-teal-600 dark:text-teal-400">
                    {book.stock} sisa stok
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
