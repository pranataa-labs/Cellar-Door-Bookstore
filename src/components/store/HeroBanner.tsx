import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { Search, Sparkles, BookCheck, Truck, ShieldCheck } from 'lucide-react'

export const HeroBanner: React.FC = () => {
  const { searchQuery, setSearchQuery } = useBookstore()

  return (
    <div className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/50 via-background to-background py-12 sm:py-16">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Top pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1 text-xs text-muted-foreground shadow-2xs backdrop-blur-xs">
          <Sparkles className="size-3.5 text-amber-500" />
          <span>Koleksi Terkurasi Edisi Oktober 2026</span>
        </div>

        {/* Headline */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-serif leading-tight">
            Tempat Bertemunya <span className="underline decoration-primary/30 underline-offset-8">Kata & Jiwa</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-sans leading-relaxed">
            Selamat datang di <strong>Cellar Door</strong>. Kami memilihkan karya sastra bernas, referensi teknologi mendalam,
            serta pemikiran filosofis yang memperkaya cakrawala Anda.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center shadow-sm rounded-lg overflow-hidden border border-input bg-card focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition">
            <Search className="size-4 text-muted-foreground ml-3.5 shrink-0" />
            <input
              type="text"
              placeholder="Cari judul buku, nama penulis, atau topik..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-transparent px-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-3 text-xs text-muted-foreground hover:text-foreground"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Quick filter pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <span className="text-[11px]">Populer:</span>
            {['Pramoedya', 'Kleppmann', 'Stoisisme', 'Clean Code', 'Sapiens'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="rounded-md border border-border bg-card/40 px-2 py-0.5 text-[11px] hover:bg-accent transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Key Selling Points */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-border/60">
          <div className="flex items-center justify-center gap-2.5 text-xs text-muted-foreground">
            <BookCheck className="size-4 text-teal-500 shrink-0" />
            <span>Katalog 100% Asli & Berkualitas</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs text-muted-foreground">
            <Truck className="size-4 text-sky-500 shrink-0" />
            <span>Pengiriman Seluruh Indonesia</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-indigo-500 shrink-0" />
            <span>Garansi Retur 7 Hari</span>
          </div>
        </div>
      </div>
    </div>
  )
}
