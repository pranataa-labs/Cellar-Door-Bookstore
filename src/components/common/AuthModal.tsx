import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { DEMO_USERS } from '@/data/seedData'
import { X, Lock, Mail, ShieldCheck, UserCheck, Eye, EyeOff } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, switchDemoUser } = useBookstore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(email, password)
    if (success) {
      onClose()
    }
  }

  const handleFillDemo = (role: 'admin' | 'customer') => {
    const user = DEMO_USERS[role]
    setEmail(user.email)
    setPassword(user.password)
  }

  const handleInstantSwitch = (role: 'admin' | 'customer') => {
    switchDemoUser(role)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-150">
      <div
        className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Masuk ke Akun</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Akses akun pelanggan atau panel administrasi Cellar Door.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 1-Click Demo Buttons */}
        <div className="rounded-lg border border-dashed border-border bg-muted/40 p-3 space-y-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Akun Demo Siap Pakai (1-Klik Masuk)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleInstantSwitch('admin')}
              className="flex items-center justify-center gap-1.5 rounded-md border border-teal-500/30 bg-teal-500/10 px-2 py-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-500/20 transition"
            >
              <ShieldCheck className="size-3.5" />
              <span>Masuk Admin</span>
            </button>
            <button
              type="button"
              onClick={() => handleInstantSwitch('customer')}
              className="flex items-center justify-center gap-1.5 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition"
            >
              <UserCheck className="size-3.5" />
              <span>Masuk Pelanggan</span>
            </button>
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
            <span>Admin: admin@example.com</span>
            <span>Pass: password123</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="nama@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-xs focus:border-ring focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Kata Sandi</label>
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                className="text-[11px] text-primary hover:underline"
              >
                Isi form demo
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
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
            className="w-full h-9 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition shadow-xs mt-2"
          >
            Masuk Sekarang
          </button>
        </form>
      </div>
    </div>
  )
}
