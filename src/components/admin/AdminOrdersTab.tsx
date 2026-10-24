import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { Order, OrderStatus } from '@/types'
import { formatRupiah } from '@/lib/utils'
import { Search, Eye, X } from 'lucide-react'

export const AdminOrdersTab: React.FC = () => {
  const { orders, updateOrderStatus } = useBookstore()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'Semua'>('Semua')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'Semua' || o.status === statusFilter
    const matchesQuery =
      !query.trim() ||
      o.id.toLowerCase().includes(query.toLowerCase()) ||
      o.customerName.toLowerCase().includes(query.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(query.toLowerCase()) ||
      (o.trackingNumber && o.trackingNumber.toLowerCase().includes(query.toLowerCase()))
    return matchesStatus && matchesQuery
  })

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
      case 'Diproses':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30'
      case 'Dikirim':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
      case 'Selesai':
        return 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30'
      case 'Dibatalkan':
        return 'bg-destructive/10 text-destructive border-destructive/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Daftar Pesanan & Pengiriman
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pantau arus pemesanan, perbarui status logistik, dan kelola nomor resi kurir.
          </p>
        </div>

        <span className="text-xs text-muted-foreground self-start sm:self-auto">
          Total <strong>{orders.length}</strong> pesanan tercatat
        </span>
      </div>

      {/* Toolbar: Search & Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari ID pesanan, nama, resi..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full h-8 rounded-md border border-input bg-card pl-8 pr-3 text-xs focus:border-ring focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1">
          {(['Semua', 'Pending', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition shrink-0 ${
                statusFilter === st
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/60 text-muted-foreground hover:bg-muted'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
              <tr>
                <th className="py-3 px-4">No. Pesanan</th>
                <th className="py-3 px-4">Tanggal Transaksi</th>
                <th className="py-3 px-4">Pelanggan</th>
                <th className="py-3 px-4">Tujuan</th>
                <th className="py-3 px-4 text-right">Total Tagihan</th>
                <th className="py-3 px-4">Status & Alur Kerja</th>
                <th className="py-3 px-4 text-center">Rincian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    Tidak ada pesanan dengan kriteria ini.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-muted/30 transition">
                    <td className="py-3 px-4 font-mono font-bold text-foreground">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <div className="truncate max-w-[160px]">
                        <p className="font-semibold text-foreground truncate">{order.customerName}</p>
                        <p className="text-[11px] text-muted-foreground truncate">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {order.city}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-foreground">
                      {formatRupiah(order.total)}
                    </td>
                    <td className="py-3 px-4">
                      {/* Live Workflow Status Dropdown */}
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`h-7 rounded border px-2 text-[11px] font-semibold focus:outline-none ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                        title="Lihat Detail"
                      >
                        <Eye className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0">
          <div
            className="w-full max-w-xl rounded-xl border border-border bg-card p-6 shadow-2xl space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-sm text-foreground">
                  Detail Pesanan #{selectedOrder.id}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Dibuat pada {new Date(selectedOrder.createdAt).toLocaleString('id-ID')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Customer & Address */}
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/40 p-3 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                  Penerima
                </span>
                <p className="font-semibold text-foreground mt-0.5">{selectedOrder.customerName}</p>
                <p className="text-muted-foreground">{selectedOrder.customerEmail}</p>
                <p className="text-muted-foreground">{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">
                  Alamat Kirim & Resi
                </span>
                <p className="text-foreground mt-0.5">{selectedOrder.shippingAddress}</p>
                <p className="text-muted-foreground">{selectedOrder.city}, {selectedOrder.postalCode}</p>
                <p className="font-mono text-primary font-semibold mt-1">
                  Resi: {selectedOrder.trackingNumber || '-'}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Daftar Buku
              </h4>
              <div className="max-h-48 overflow-y-auto divide-y divide-border">
                {selectedOrder.items.map(item => (
                  <div key={item.book.id} className="py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.book.coverUrl}
                        alt=""
                        className="size-8 rounded object-cover border border-border"
                      />
                      <div>
                        <p className="font-medium text-foreground">{item.book.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {item.quantity} x {formatRupiah(item.book.discountPrice ?? item.book.price)}
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

            {/* Financials */}
            <div className="border-t border-border pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatRupiah(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Diskon</span>
                <span>-{formatRupiah(selectedOrder.discount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkos Kirim</span>
                <span>{formatRupiah(selectedOrder.shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-bold text-sm text-foreground">
                <span>Total Pesanan</span>
                <span>{formatRupiah(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="h-8 px-4 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
