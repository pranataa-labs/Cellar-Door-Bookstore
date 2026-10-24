import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { AdminSidebar, AdminTab } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { AdminDashboardTab } from './AdminDashboardTab'
import { AdminBooksTab } from './AdminBooksTab'
import { AdminOrdersTab } from './AdminOrdersTab'
import { AdminCustomersTab } from './AdminCustomersTab'
import { AdminAnalyticsTab } from './AdminAnalyticsTab'
import { ShieldAlert, ArrowLeft, ShieldCheck } from 'lucide-react'

export const AdminLayout: React.FC = () => {
  const { currentUser, switchDemoUser, setActiveView } = useBookstore()
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard')
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Guard: if current user is not admin
  if (currentUser?.role !== 'admin') {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center space-y-4">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert className="size-8" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Akses Dibatasi</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Halaman Backoffice ini khusus untuk pengelola toko buku dengan role <strong>Admin</strong>.
          Gunakan tombol di bawah untuk beralih ke akun admin demo siap pakai.
        </p>

        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => switchDemoUser('admin')}
            className="flex items-center justify-center gap-2 h-10 rounded-md bg-teal-600 text-white font-medium text-xs hover:bg-teal-700 transition shadow-xs"
          >
            <ShieldCheck className="size-4" />
            <span>Beralih ke Admin Demo (admin@example.com)</span>
          </button>

          <button
            onClick={() => setActiveView('store')}
            className="flex items-center justify-center gap-2 h-10 rounded-md border border-border bg-card text-foreground font-medium text-xs hover:bg-muted transition"
          >
            <ArrowLeft className="size-4" />
            <span>Kembali ke Katalog Publik</span>
          </button>
        </div>
      </div>
    )
  }

  const tabTitles: Record<AdminTab, string> = {
    dashboard: 'Dashboard Eksekutif',
    books: 'Katalog & Inventaris Buku',
    orders: 'Daftar Pesanan & Resi',
    customers: 'Data Pembaca & Pelanggan',
    analytics: 'Analisis & Laporan',
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* 16rem Collapsible Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        <AdminHeader
          currentTabTitle={tabTitles[currentTab]}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in-0 duration-200">
          {currentTab === 'dashboard' && <AdminDashboardTab />}
          {currentTab === 'books' && <AdminBooksTab />}
          {currentTab === 'orders' && <AdminOrdersTab />}
          {currentTab === 'customers' && <AdminCustomersTab />}
          {currentTab === 'analytics' && <AdminAnalyticsTab />}
        </main>
      </div>
    </div>
  )
}
