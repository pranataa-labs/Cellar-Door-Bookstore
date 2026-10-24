import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import { CheckCircle2, Package, ArrowRight, Copy, QrCode } from 'lucide-react'
import { toast } from 'sonner'

export const OrderSuccessView: React.FC = () => {
  const { lastPlacedOrder, setActiveView } = useBookstore()

  if (!lastPlacedOrder) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-muted-foreground text-xs">Tidak ada riwayat pesanan aktif.</p>
        <button
          onClick={() => setActiveView('store')}
          className="mt-3 text-primary text-xs font-medium hover:underline"
        >
          Kembali ke Katalog
        </button>
      </div>
    )
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(lastPlacedOrder.id)
    toast.success('Nomor pesanan disalin ke clipboard')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-in fade-in-0 duration-200">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-serif">
          Pesanan Anda Berhasil Diterima!
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          Terima kasih telah mempercayakan bahan bacaan Anda kepada Cellar Door. Kami akan segera
          menyiapkan pesanan Anda dengan penuh perhatian.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <span className="text-[11px] text-muted-foreground block">Nomor Pesanan</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-base font-bold text-foreground">
                {lastPlacedOrder.id}
              </span>
              <button
                onClick={handleCopyOrderId}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Salin ID"
              >
                <Copy className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-[11px] text-muted-foreground block">Status Pembayaran</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/40 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 border border-teal-300 px-2.5 py-0.5 text-xs font-semibold mt-0.5">
              Menunggu Pengiriman ({lastPlacedOrder.status})
            </span>
          </div>
        </div>

        {/* QRIS / Virtual Account Mock */}
        {lastPlacedOrder.paymentMethod === 'qris' && (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="size-24 rounded-lg bg-white p-2 flex items-center justify-center shadow-xs shrink-0">
              <QrCode className="size-20 text-slate-900" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-foreground">Pembayaran QRIS Otomatis</h4>
              <p className="text-[11px] text-muted-foreground">
                Buka aplikasi BCA, GoPay, OVO, atau ShopeePay dan scan kode QR di atas untuk menyelesaikan
                transaksi sebesar <strong>{formatRupiah(lastPlacedOrder.total)}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Item list */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Buku yang Dipesan
          </h4>
          <div className="divide-y divide-border">
            {lastPlacedOrder.items.map(item => (
              <div key={item.book.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.book.coverUrl}
                    alt=""
                    className="size-10 rounded object-cover border border-border shrink-0"
                  />
                  <div>
                    <h5 className="font-medium text-foreground">{item.book.title}</h5>
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
        </div>

        {/* Shipping address & Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg border border-border bg-card/60 p-4 text-xs">
          <div>
            <span className="text-[11px] text-muted-foreground block mb-1">Tujuan Pengiriman</span>
            <p className="font-semibold text-foreground">{lastPlacedOrder.customerName}</p>
            <p className="text-muted-foreground mt-0.5">{lastPlacedOrder.shippingAddress}</p>
            <p className="text-muted-foreground">{lastPlacedOrder.city}, {lastPlacedOrder.postalCode}</p>
            <p className="text-muted-foreground text-[11px] mt-1">{lastPlacedOrder.customerPhone}</p>
          </div>

          <div>
            <span className="text-[11px] text-muted-foreground block mb-1">Nomor Resi Pelacakan</span>
            <p className="font-mono font-semibold text-foreground">
              {lastPlacedOrder.trackingNumber || 'Akan diupdate kurir'}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Metode Pembayaran: <span className="uppercase font-medium text-foreground">{lastPlacedOrder.paymentMethod}</span>
            </p>
            <p className="text-sm font-bold text-foreground mt-2">
              Total Bayar: {formatRupiah(lastPlacedOrder.total)}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => setActiveView('orders')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition"
        >
          <Package className="size-4" />
          <span>Lihat Daftar Pesanan Saya</span>
        </button>

        <button
          onClick={() => setActiveView('store')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs"
        >
          <span>Lanjut Jelajahi Toko</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
