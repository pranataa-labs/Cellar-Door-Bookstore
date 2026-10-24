import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import {
  CreditCard,
  ShoppingBag,
  Package,
  Users,
  Download,
  Calendar,
} from 'lucide-react'

export const AdminDashboardTab: React.FC = () => {
  const { books, orders } = useBookstore()

  // Calculated metrics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Dibatalkan' ? sum + o.total : sum), 0)
  const totalItemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0),
    0
  )
  const lowStockCount = books.filter(b => b.stock < 15).length

  // Monthly sales simulation for the bar chart
  const monthlyData = [
    { month: 'Mei', amount: 480000 },
    { month: 'Jun', amount: 620000 },
    { month: 'Jul', amount: 790000 },
    { month: 'Agu', amount: 910000 },
    { month: 'Sep', amount: 840000 },
    { month: 'Okt', amount: totalRevenue > 0 ? totalRevenue : 1137000 },
  ]
  const maxAmount = Math.max(...monthlyData.map(d => d.amount))

  return (
    <div className="space-y-6">
      {/* Page Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Ringkasan Eksekutif</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Performa penjualan, pesanan buku, dan arus kas toko Cellar Door.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1 text-xs text-muted-foreground">
            <Calendar className="size-3.5" />
            <span>Oktober 2026</span>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs"
          >
            <Download className="size-3.5" />
            <span>Unduh Laporan</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Revenue */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Total Pendapatan</span>
            <CreditCard className="size-4" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {formatRupiah(totalRevenue)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-teal-600 dark:text-teal-400 font-semibold">+20.1%</span>
              <span>dari bulan lalu</span>
            </p>
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Pesanan Selesai / Aktif</span>
            <ShoppingBag className="size-4" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {orders.length} Transaksi
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-teal-600 dark:text-teal-400 font-semibold">+{totalItemsSold}</span>
              <span>eksemplar terdistribusi</span>
            </p>
          </div>
        </div>

        {/* KPI 3: Books Catalog */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Koleksi Judul Aktif</span>
            <Package className="size-4" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {books.length} Judul
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {lowStockCount > 0 ? (
                <span className="text-amber-500 font-medium">
                  {lowStockCount} judul stok menipis
                </span>
              ) : (
                <span className="text-teal-500 font-medium">Semua stok aman</span>
              )}
            </p>
          </div>
        </div>

        {/* KPI 4: Active Customers */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Pelanggan Aktif</span>
            <Users className="size-4" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              28 Pembaca
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-teal-600 dark:text-teal-400 font-semibold">+12</span>
              <span>anggota baru bulan ini</span>
            </p>
          </div>
        </div>
      </div>

      {/* 7-Column Layout: Chart (4 cols) & Recent Sales (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Sales Chart (Col span 4) */}
        <div className="lg:col-span-4 rounded-xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-sm text-foreground">Tren Penjualan Bulanan</h3>
            <p className="text-xs text-muted-foreground">
              Pertumbuhan omzet toko buku selama 6 bulan terakhir.
            </p>
          </div>

          {/* Clean SVG Bar Chart */}
          <div className="mt-6 pt-4 h-64 flex items-end gap-3 sm:gap-6 border-b border-border/60 pb-2">
            {monthlyData.map(item => {
              const heightPercent = Math.max(15, Math.round((item.amount / maxAmount) * 100))
              return (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-muted-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {(item.amount / 1000).toFixed(0)}k
                  </span>
                  <div className="w-full max-w-[48px] bg-muted/60 rounded-t-md h-48 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-primary rounded-t-md transition-all duration-500 group-hover:bg-primary/80"
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.month}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-primary" />
              <span>Pendapatan Kotor Bulanan</span>
            </span>
            <span className="font-medium text-foreground">
              Rata-rata: {formatRupiah(totalRevenue / 6)} / bln
            </span>
          </div>
        </div>

        {/* Recent Transactions (Col span 3) */}
        <div className="lg:col-span-3 rounded-xl border border-border bg-card p-5 shadow-xs space-y-4">
          <div>
            <h3 className="font-semibold text-sm text-foreground">Transaksi Terkini</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {orders.length} pesanan tercatat dalam database.
            </p>
          </div>

          <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 truncate">
                  <div className="size-9 rounded-full bg-muted flex items-center justify-center font-bold text-foreground text-xs shrink-0">
                    {order.customerName.charAt(0)}
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-foreground truncate">{order.customerName}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{order.customerEmail}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-bold text-foreground">{formatRupiah(order.total)}</p>
                  <span
                    className={`inline-block text-[10px] font-medium ${
                      order.status === 'Selesai'
                        ? 'text-teal-600 dark:text-teal-400'
                        : order.status === 'Diproses'
                        ? 'text-sky-600 dark:text-sky-400'
                        : 'text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {order.status}
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
