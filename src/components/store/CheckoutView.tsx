import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { formatRupiah } from '@/lib/utils'
import { PaymentMethod } from '@/types'
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  Check,
} from 'lucide-react'

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, createOrder, setActiveView, currentUser } = useBookstore()

  // Form states
  const [name, setName] = useState(currentUser?.name || '')
  const [email, setEmail] = useState(currentUser?.email || '')
  const [phone, setPhone] = useState('081234567890')
  const [address, setAddress] = useState('Jl. Senopati No. 42, Kebayoran Baru')
  const [city, setCity] = useState('Jakarta Selatan')
  const [postalCode, setPostalCode] = useState('12190')

  // Shipping & Payment
  const [courier, setCourier] = useState<'jne' | 'sicepat' | 'gosend'>('jne')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qris')
  const [couponCode, setCouponCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const shippingFees = {
    jne: cartSubtotal > 300000 ? 0 : 12000,
    sicepat: cartSubtotal > 300000 ? 0 : 15000,
    gosend: 25000,
  }

  const shippingCost = shippingFees[courier]
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + shippingCost)

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'CELLAR10') {
      setAppliedDiscount((cartSubtotal * 10) / 100)
    } else if (couponCode.toUpperCase() === 'LITERASI') {
      setAppliedDiscount((cartSubtotal * 15) / 100)
    }
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return

    setIsSubmitting(true)
    setTimeout(() => {
      createOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: address,
        city,
        postalCode,
        paymentMethod,
        shippingCost,
        discount: appliedDiscount,
      })
      setIsSubmitting(false)
    }, 700)
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Keranjang Belanja Masih Kosong</h2>
        <p className="text-xs text-muted-foreground">Silakan pilih buku favorit Anda terlebih dahulu.</p>
        <button
          onClick={() => setActiveView('store')}
          className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
        >
          Kembali ke Katalog
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => setActiveView('store')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Berbelanja</span>
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-2">
          Penyelesaian Pesanan (Checkout)
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Customer Data */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              <h3 className="font-semibold text-sm text-foreground">Data Penerima & Kontak</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:border-ring focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Nomor Telepon / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:border-ring focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-medium text-foreground">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:border-ring focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address & Courier */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              <h3 className="font-semibold text-sm text-foreground">Alamat Pengiriman & Kurir</h3>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-foreground">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full rounded-md border border-input bg-background p-2.5 text-xs focus:border-ring focus:outline-none"
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Kota / Kabupaten</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:border-ring focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Kode Pos</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:border-ring focus:outline-none"
                  />
                </div>
              </div>

              {/* Courier Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium text-foreground">Pilihan Ekspedisi</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div
                    onClick={() => setCourier('jne')}
                    className={`cursor-pointer rounded-lg border p-3 text-xs transition ${
                      courier === 'jne'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>JNE Reguler</span>
                      <Truck className="size-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">Estimasi 2-3 hari</p>
                    <p className="font-bold text-foreground mt-1.5">
                      {shippingFees.jne === 0 ? 'GRATIS' : formatRupiah(shippingFees.jne)}
                    </p>
                  </div>

                  <div
                    onClick={() => setCourier('sicepat')}
                    className={`cursor-pointer rounded-lg border p-3 text-xs transition ${
                      courier === 'sicepat'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>SiCepat Kilat</span>
                      <Truck className="size-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">Estimasi 1-2 hari</p>
                    <p className="font-bold text-foreground mt-1.5">
                      {shippingFees.sicepat === 0 ? 'GRATIS' : formatRupiah(shippingFees.sicepat)}
                    </p>
                  </div>

                  <div
                    onClick={() => setCourier('gosend')}
                    className={`cursor-pointer rounded-lg border p-3 text-xs transition ${
                      courier === 'gosend'
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold">
                      <span>GoSend Instant</span>
                      <Truck className="size-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">Hari ini sampai</p>
                    <p className="font-bold text-foreground mt-1.5">{formatRupiah(shippingFees.gosend)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-border pb-3">
              <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </span>
              <h3 className="font-semibold text-sm text-foreground">Metode Pembayaran</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: 'qris',
                  name: 'QRIS Realtime',
                  desc: 'BCA, GoPay, OVO, ShopeePay, Dana',
                  icon: QrCode,
                },
                {
                  id: 'bank_transfer',
                  name: 'Transfer Bank (VA)',
                  desc: 'Virtual Account BCA, Mandiri, BNI',
                  icon: Building2,
                },
                {
                  id: 'credit_card',
                  name: 'Kartu Kredit / Debit',
                  desc: 'Visa, Mastercard, JCB berlogo 3DS',
                  icon: CreditCard,
                },
                {
                  id: 'cod',
                  name: 'Bayar di Tempat (COD)',
                  desc: 'Bayar tunai kepada kurir saat tiba',
                  icon: Banknote,
                },
              ].map(method => {
                const Icon = method.icon
                const isSelected = paymentMethod === method.id
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    className={`cursor-pointer rounded-lg border p-3 transition flex items-start gap-3 ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    <div className="size-8 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{method.name}</span>
                        {isSelected && <Check className="size-3.5 text-primary" />}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{method.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-sm sticky top-24">
            <h3 className="font-semibold text-sm text-foreground border-b border-border pb-3">
              Ringkasan Pesanan ({cart.length} item)
            </h3>

            {/* Items list */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map(item => {
                const price = item.book.discountPrice ?? item.book.price
                return (
                  <div key={item.book.id} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.book.coverUrl}
                      alt=""
                      className="size-12 rounded object-cover shrink-0 border border-border"
                    />
                    <div className="flex-1 truncate">
                      <h4 className="font-medium text-foreground truncate">{item.book.title}</h4>
                      <p className="text-[11px] text-muted-foreground">
                        {item.quantity} x {formatRupiah(price)}
                      </p>
                    </div>
                    <span className="font-semibold text-foreground text-xs">
                      {formatRupiah(price * item.quantity)}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Voucher input */}
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Kode voucher (CELLAR10)"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 h-8 rounded-md border border-input bg-background px-2.5 text-xs uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="h-8 px-3 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80"
                >
                  Gunakan
                </button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                  ✓ Berhasil menerapkan voucher diskon!
                </p>
              )}
            </div>

            {/* Totals Calculation */}
            <div className="border-t border-border pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal Buku</span>
                <span>{formatRupiah(cartSubtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-teal-600 dark:text-teal-400">
                  <span>Diskon Promo</span>
                  <span>-{formatRupiah(appliedDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkos Kirim ({courier.toUpperCase()})</span>
                <span>{shippingCost === 0 ? 'GRATIS' : formatRupiah(shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                <span>Total Pembayaran</span>
                <span>{formatRupiah(finalTotal)}</span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 h-10 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs disabled:opacity-50"
            >
              <ShieldCheck className="size-4" />
              <span>{isSubmitting ? 'Memproses Pesanan...' : 'Konfirmasi & Bayar Sekarang'}</span>
            </button>

            <p className="text-[10px] text-center text-muted-foreground">
              Transaksi aman dan dilindungi enkripsi SSL 256-bit standar perbankan.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
