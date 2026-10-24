import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { BookOpen, ShieldCheck, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  const { setSelectedCategory, setActiveView, switchDemoUser } = useBookstore()

  return (
    <footer className="border-t border-border bg-card/60 text-muted-foreground text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-foreground font-serif text-lg font-bold">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="size-4" />
              </div>
              <span>Cellar Door</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Toko buku kurasi mandiri berdedikasi menghadirkan karya sastra bernas, pemikiran filsafat,
              dan referensi rekayasa perangkat lunak terpilih.
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
              Layanan Pelanggan
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>Pengiriman Seluruh Nusantara</li>
              <li>Garansi Buku Original 100%</li>
              <li>Kemasan Kardus & Bubble Tebal</li>
              <li>Dukungan WhatsApp 24/7</li>
            </ul>
          </div>

          {/* Demo Access Panel */}
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Beralih Akun Demo
            </h4>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => switchDemoUser('admin')}
                className="flex w-full items-center justify-between rounded-md border border-teal-500/30 bg-teal-500/10 px-2.5 py-1.5 text-left text-xs font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-500/20"
              >
                <span>Masuk Akun Admin</span>
                <ShieldCheck className="size-3.5" />
              </button>
              <button
                onClick={() => switchDemoUser('customer')}
                className="flex w-full items-center justify-between rounded-md border border-border bg-card px-2.5 py-1.5 text-left text-xs font-medium text-foreground hover:bg-muted"
              >
                <span>Masuk Akun Pembeli</span>
                <span className="text-[10px] text-muted-foreground">User Demo</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>© 2026 Cellar Door Bookstore. Seluruh hak cipta dilindungi undang-undang.</p>
          <p className="flex items-center gap-1">
            Dibangun dengan cinta untuk dunia literasi
            <Heart className="size-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
