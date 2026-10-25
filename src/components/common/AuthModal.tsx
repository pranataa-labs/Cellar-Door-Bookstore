import React, { useState, useEffect } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { X, Lock, Mail, User as UserIcon, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, register } = useBookstore()
  const [mode, setMode] = useState<'login' | 'register'>('login')

  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthModalOpen) {
      setMode(authModalMode)
      setPassword('')
      setConfirmPassword('')
    }
  }, [isAuthModalOpen, authModalMode])

  if (!isAuthModalOpen) return null

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const success = login(email, password)
    setIsSubmitting(false)
    if (success) {
      closeAuthModal()
    }
  }

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 6) {
      toast.error('Kata sandi minimal 6 karakter.')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Konfirmasi kata sandi tidak cocok.')
      return
    }

    setIsSubmitting(true)
    const success = register(name, email, password, phone)
    setIsSubmitting(false)
    if (success) {
      closeAuthModal()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-150">
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              {mode === 'login' ? 'Masuk ke Akun Anda' : 'Buat Akun Pembeli Baru'}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mode === 'login'
                ? 'Kelola pesanan dan nikmati pengalaman berbelanja di Cellar Door.'
                : 'Daftar sekarang untuk kemudahan pemesanan dan pelacakan paket buku.'}
            </p>
          </div>
          <button
            onClick={closeAuthModal}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-md py-1.5 transition ${
              mode === 'login'
                ? 'bg-background text-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`rounded-md py-1.5 transition ${
              mode === 'register'
                ? 'bg-background text-foreground shadow-2xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Daftar Akun Baru
          </button>
        </div>

        {/* 1. Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-xs focus:border-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-foreground">Kata Sandi</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Masukkan kata sandi"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-9 text-xs focus:border-ring focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 h-9 rounded-md bg-[#E5C690] text-slate-950 font-bold text-xs hover:bg-[#d8b578] transition shadow-xs mt-3 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Memverifikasi...' : 'Masuk ke Akun'}</span>
              <ArrowRight className="size-3.5 stroke-[2.2]" />
            </button>

            <p className="text-center text-[11px] text-muted-foreground pt-1">
              Belum memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-semibold text-primary hover:underline"
              >
                Daftar sekarang
              </button>
            </p>
          </form>
        )}

        {/* 2. Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-foreground">Nama Lengkap *</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap Anda"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-xs focus:border-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Alamat Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-xs focus:border-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-foreground">Nomor Telepon / WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-xs focus:border-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Kata Sandi *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min. 6 karakter"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:border-ring focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Konfirmasi Sandi *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Ulangi kata sandi"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs focus:border-ring focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 h-9 rounded-md bg-[#E5C690] text-slate-950 font-bold text-xs hover:bg-[#d8b578] transition shadow-xs mt-3 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Mendaftarkan...' : 'Daftar Akun Baru'}</span>
              <ArrowRight className="size-3.5 stroke-[2.2]" />
            </button>

            <p className="text-center text-[11px] text-muted-foreground pt-1">
              Sudah memiliki akun?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-semibold text-primary hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
