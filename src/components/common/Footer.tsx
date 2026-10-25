import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { BookOpen, Heart, Send, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export const Footer: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useBookstore()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setIsSubscribed(true)
    toast.success('Terima kasih! Anda telah terdaftar dalam buletin kurasi Cellar Door.')
    setNewsletterEmail('')
  }

  return (
    <footer className="border-t border-border bg-card/60 text-muted-foreground text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-foreground font-serif text-lg font-bold">
              <div className="flex size-7 items-center justify-center rounded-md bg-[#E5C690] text-slate-950">
                <BookOpen className="size-4 stroke-[2]" />
              </div>
              <span>Cellar Door</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Toko buku kurasi mandiri berdedikasi menghadirkan karya sastra bernas, pemikiran filsafat,
              dan referensi rekayasa perangkat lunak terpilih ke seluruh penjuru Nusantara.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Koleksi Unggulan
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Fiksi & Sastra')
                    setActiveView('store')
                  }}
                  className="hover:text-foreground transition"
                >
                  Fiksi & Sastra Nusantara
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Teknologi & Sains')
                    setActiveView('store')
                  }}
                  className="hover:text-foreground transition"
                >
                  Teknologi & Arsitektur Data
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Filosofi & Pemikiran')
                    setActiveView('store')
                  }}
                  className="hover:text-foreground transition"
                >
                  Filosofi & Stoisisme
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Bisnis & Finansial')
                    setActiveView('store')
                  }}
                  className="hover:text-foreground transition"
                >
                  Bisnis & Psikologi Finansial
                </button>
              </li>
            </ul>
          </div>

          {/* Service & Guarantee */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Layanan & Jaminan
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>Pengiriman Seluruh Nusantara</li>
              <li>Garansi Buku Original 100%</li>
              <li>Kemasan Kardus & Bubble Wrap Tebal</li>
              <li>Dukungan Pelanggan Setiap Hari</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Buletin & Kurasi
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dapatkan rekomendasi judul buku langka, esai kurasi, dan penawaran rilis awal langsung di inbox Anda.
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 rounded-md bg-teal-500/10 border border-teal-500/20 px-3 py-2 text-teal-600 dark:text-teal-400 font-medium text-xs">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Terima kasih! Anda telah berlangganan.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="flex-1 h-8 rounded-md border border-input bg-background px-2.5 text-xs focus:border-ring focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Daftar Buletin"
                    className="h-8 px-2.5 rounded-md bg-[#E5C690] text-slate-950 font-bold hover:bg-[#d8b578] transition shadow-xs flex items-center justify-center"
                  >
                    <Send className="size-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground">Bebas spam. Anda dapat berhenti berlangganan kapan pun.</p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>© 2026 Cellar Door Bookstore. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1">
            Dibangun dengan dedikasi untuk dunia literasi
            <Heart className="size-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
