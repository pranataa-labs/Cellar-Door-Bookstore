import React, { useState } from 'react'
import { formatRupiah } from '@/lib/utils'
import { Search, ShieldCheck } from 'lucide-react'

export const AdminCustomersTab: React.FC = () => {
  const [query, setQuery] = useState('')

  // Aggregate customers from orders and demo users
  const customerList = [
    {
      id: 'cust-1',
      name: 'Aulia Saraswati',
      email: 'user@example.com',
      phone: '081234567890',
      city: 'Jakarta Selatan',
      ordersCount: 3,
      totalSpent: 421000,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      membership: 'VIP Literasi',
    },
    {
      id: 'cust-2',
      name: 'Dimas Wicaksono',
      email: 'dimas.w@example.com',
      phone: '081398765432',
      city: 'Bandung',
      ordersCount: 2,
      totalSpent: 590000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      membership: 'Reguler',
    },
    {
      id: 'cust-3',
      name: 'Siti Nurhaliza',
      email: 'siti.n@example.com',
      phone: '085678123456',
      city: 'Yogyakarta',
      ordersCount: 4,
      totalSpent: 785000,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      membership: 'VIP Literasi',
    },
    {
      id: 'cust-4',
      name: 'Budi Santoso',
      email: 'budi.santoso@example.com',
      phone: '087812904321',
      city: 'Surabaya',
      ordersCount: 1,
      totalSpent: 125000,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      membership: 'Reguler',
    },
  ]

  const filtered = customerList.filter(
    c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      c.city.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Direktori Pelanggan</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Daftar pembaca terdaftar, kontak pengiriman, dan riwayat loyalitas belanja.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari pelanggan berdasarkan nama, kota..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full h-8 rounded-md border border-input bg-card pl-8 pr-3 text-xs focus:border-ring focus:outline-none"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border bg-muted/40 font-semibold text-muted-foreground">
              <tr>
                <th className="py-3 px-4">Pelanggan</th>
                <th className="py-3 px-4">Kontak</th>
                <th className="py-3 px-4">Kota Domisili</th>
                <th className="py-3 px-4 text-center">Total Transaksi</th>
                <th className="py-3 px-4 text-right">Akumulasi Belanja</th>
                <th className="py-3 px-4">Tier Keanggotaan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(cust => (
                <tr key={cust.id} className="hover:bg-muted/30 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cust.avatar}
                        alt=""
                        className="size-9 rounded-full object-cover border border-border"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{cust.name}</p>
                        <p className="text-[11px] text-muted-foreground">{cust.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground">
                    {cust.phone}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{cust.city}</td>
                  <td className="py-3 px-4 text-center font-semibold text-foreground">
                    {cust.ordersCount} pesanan
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-foreground">
                    {formatRupiah(cust.totalSpent)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-semibold border ${
                        cust.membership === 'VIP Literasi'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                          : 'bg-muted text-muted-foreground border-border'
                      }`}
                    >
                      {cust.membership === 'VIP Literasi' && <ShieldCheck className="size-3" />}
                      <span>{cust.membership}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
