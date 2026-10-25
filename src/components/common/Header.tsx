import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import {
  BookOpen,
  ShoppingBag,
  Search,
  Sun,
  Moon,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  SlidersHorizontal,
  Package,
} from 'lucide-react'

interface HeaderProps {
  onOpenAuth: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth }) => {
  const {
    activeView,
    setActiveView,
    cartItemCount,
    setIsCartOpen,
    theme,
    toggleTheme,
    currentUser,
    logout,
    switchDemoUser,
    setIsCmdKOpen,
  } = useBookstore()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => setActiveView('store')}
            className="flex items-center gap-2.5 text-left transition hover:opacity-90 group"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#E5C690] text-slate-950 shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="size-5 stroke-[2]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-foreground block leading-none">
                Cellar Door
              </span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                Bookstore & Press
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveView('store')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeView === 'store'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Katalog Toko
            </button>
            <button
              onClick={() => setActiveView('orders')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeView === 'orders'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              Pesanan Saya
            </button>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setActiveView('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition ${
                  activeView === 'admin'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-teal-600 dark:text-teal-400 font-semibold hover:bg-teal-500/10'
                }`}
              >
                <ShieldCheck className="size-4" />
                <span>Admin Backoffice</span>
              </button>
            )}
          </nav>
        </div>

        {/* Center/Right: Search Cmd+K, Theme, Cart, User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Trigger (⌘K) */}
          <button
            onClick={() => setIsCmdKOpen(true)}
            className="hidden sm:flex items-center gap-2 h-9 w-44 md:w-60 rounded-md border border-input bg-muted/40 px-3 text-xs text-muted-foreground hover:border-ring transition"
          >
            <Search className="size-3.5" />
            <span className="flex-1 text-left">Cari judul, penulis...</span>
            <kbd className="pointer-events-none rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono font-medium shadow-2xs">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setIsCmdKOpen(true)}
            className="flex sm:hidden size-9 items-center justify-center rounded-md border border-border hover:bg-muted transition text-muted-foreground"
            aria-label="Cari"
          >
            <Search className="size-4" />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition"
            title={theme === 'dark' ? 'Ganti ke Terang' : 'Ganti ke Gelap'}
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex size-9 items-center justify-center rounded-md border border-border hover:bg-muted text-foreground transition"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag className="size-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-[#E5C690] text-slate-950 text-[11px] font-bold shadow-xs animate-in zoom-in-75">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Account / Role Switcher */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-1">
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium hover:bg-muted transition">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="size-5 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="size-4 text-muted-foreground" />
                  )}
                  <span className="hidden lg:inline max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[10px] font-semibold ${
                      currentUser.role === 'admin'
                        ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentUser.role.toUpperCase()}
                  </span>
                </button>

                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block w-56 rounded-md border border-border bg-popover p-1 shadow-md z-50 text-xs">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-semibold text-foreground truncate">{currentUser.name}</p>
                    <p className="text-muted-foreground text-[11px] truncate">{currentUser.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => setActiveView('orders')}
                      className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 hover:bg-accent text-left"
                    >
                      <Package className="size-3.5 text-muted-foreground" />
                      <span>Pesanan Saya</span>
                    </button>

                    {currentUser.role === 'admin' ? (
                      <button
                        onClick={() => setActiveView('admin')}
                        className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 hover:bg-accent text-left font-medium text-teal-600 dark:text-teal-400"
                      >
                        <ShieldCheck className="size-3.5" />
                        <span>Buka Admin Backoffice</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => switchDemoUser('admin')}
                        className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 hover:bg-accent text-left font-medium text-sky-600 dark:text-sky-400"
                      >
                        <SlidersHorizontal className="size-3.5" />
                        <span>Beralih ke Admin Demo</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-border pt-1">
                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-destructive hover:bg-destructive/10 text-left"
                    >
                      <LogOut className="size-3.5" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuth}
                className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs"
              >
                Masuk / Akun
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
