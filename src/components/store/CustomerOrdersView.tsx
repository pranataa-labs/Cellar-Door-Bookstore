import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import { OrderStatus } from '@/types'
import { BookCoverImage } from '@/components/common/BookCoverImage'
import { Package, Truck, Clock, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'

export const CustomerOrdersView: React.FC = () => {
  const { orders, setActiveView } = useBookstore()
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'Semua'>('Semua')

  const filteredOrders = orders.filter(
    order => filterStatus === 'Semua' || order.status === filterStatus
  )

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold">
            <Clock className="size-3" />
            <span>Menunggu Konfirmasi</span>
          </span>
        )
      case 'Diproses':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 px-2 py-0.5 text-[11px] font-semibold">
            <Package className="size-3" />
            <span>Sedang Dikemas</span>
          </span>
        )
      case 'Dikirim':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2 py-0.5 text-[11px] font-semibold">
            <Truck className="size-3" />
            <span>Dalam Pengiriman</span>
          </span>
        )
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 px-2 py-0.5 text-[11px] font-semibold">
            <CheckCircle2 className="size-3" />
            <span>Terkirim & Selesai</span>
          </span>
        )
      case 'Dibatalkan':
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 text-destructive border border-destructive/20 px-2 py-0.5 text-[11px] font-semibold">
            <AlertCircle className="size-3" />
            <span>Dibatalkan</span>
          </span>
        )
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <button
            onClick={() => setActiveView('store')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition mb-2"
          >
            <ArrowLeft className="size-3.5" />
            <span>Kembali ke Katalog</span>
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Riwayat Pesanan Saya
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pantau status pengiriman buku dan catatan transaksi Anda.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {(['Semua', 'Pending', 'Diproses', 'Dikirim', 'Selesai'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                filterStatus === st
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center space-y-3">
          <Package className="size-10 text-muted-foreground stroke-1 mx-auto" />
          <h3 className="font-semibold text-foreground text-sm">Belum ada pesanan</h3>
          <p className="text-xs text-muted-foreground">
            Tidak ada transaksi dengan status ini. Mulai belanja buku pilihan Anda sekarang.
          </p>
          <button
            onClick={() => setActiveView('store')}
            className="rounded-md bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground"
          >
            Jelajahi Toko
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-xs transition hover:border-border/80"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-foreground">{order.id}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Items in order */}
              <div className="divide-y divide-border/60">
                {order.items.map(item => (
                  <div key={item.book.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <BookCoverImage
                        src={item.book.coverUrl}
                        alt={item.book.title}
                        title={item.book.title}
                        author={item.book.author}
                        category={item.book.category}
                        containerClassName="size-11 rounded border border-border shrink-0"
                        className="size-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.book.title}</h4>
                        <p className="text-[11px] text-muted-foreground">
                          {item.quantity} eksemplar × {formatRupiah(item.book.discountPrice ?? item.book.price)}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">
                      {formatRupiah((item.book.discountPrice ?? item.book.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border pt-3 text-xs">
                <div className="text-muted-foreground text-[11px]">
                  <span>Resi: </span>
                  <span className="font-mono font-medium text-foreground">
                    {order.trackingNumber || 'Dalam antrian agen pengiriman'}
                  </span>
                  <span className="mx-2">•</span>
                  <span>Tujuan: {order.city}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-xs">Total Pembayaran:</span>
                  <span className="text-sm font-bold text-foreground">
                    {formatRupiah(order.total)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
