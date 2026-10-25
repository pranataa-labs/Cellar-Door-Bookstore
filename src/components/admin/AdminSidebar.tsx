import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import {
  BookOpen,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  ExternalLink,
  SlidersHorizontal,
} from 'lucide-react'

export type AdminTab = 'dashboard' | 'books' | 'orders' | 'customers' | 'analytics'

interface AdminSidebarProps {
  currentTab: AdminTab
  setCurrentTab: (tab: AdminTab) => void
  isCollapsed: boolean
  setIsCollapsed?: (collapsed: boolean) => void
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  setCurrentTab,
  isCollapsed,
}) => {
  const { books, orders, currentUser, switchDemoUser, setActiveView } = useBookstore()

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length

  const navItems = [
    {
      group: 'General',
      items: [
        {
          id: 'dashboard' as AdminTab,
          label: 'Dashboard',
          icon: LayoutDashboard,
        },
        {
          id: 'books' as AdminTab,
          label: 'Katalog Buku',
          icon: Package,
          badge: books.length,
        },
        {
          id: 'orders' as AdminTab,
          label: 'Pesanan Masuk',
          icon: ShoppingBag,
          badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} baru` : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
        },
        {
          id: 'customers' as AdminTab,
          label: 'Data Pelanggan',
          icon: Users,
        },
      ],
    },
    {
      group: 'Laporan & Pengaturan',
      items: [
        {
          id: 'analytics' as AdminTab,
          label: 'Analitik Penjualan',
          icon: BarChart3,
        },
      ],
    },
  ]

  return (
    <aside
      className={`relative flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 z-30 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Team / Workspace Switcher Header */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-3.5">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E5C690] text-slate-950 shadow-xs">
            <BookOpen className="size-5 stroke-[2]" />
          </div>
          {!isCollapsed && (
            <div className="truncate text-left">
              <span className="font-semibold text-xs tracking-tight block text-sidebar-foreground">
                Cellar Door Backoffice
              </span>
              <span className="text-[10px] text-muted-foreground block truncate">
                Admin Panel • Versi 2.4.0
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Nav Menu Body */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {navItems.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                {group.group}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon
                const isActive = currentTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-foreground font-semibold shadow-2xs'
                        : 'text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {!isCollapsed && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge !== undefined && (
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          item.badgeColor || 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Shortcut to public store */}
        <div className="pt-2 border-t border-sidebar-border">
          <button
            onClick={() => setActiveView('store')}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition"
            title="Buka Toko Publik"
          >
            <ExternalLink className="size-4 shrink-0 text-sky-500" />
            {!isCollapsed && <span className="flex-1 text-left">Lihat Toko Publik</span>}
          </button>
        </div>
      </div>

      {/* Sidebar Footer User Info */}
      <div className="border-t border-sidebar-border p-3">
        {!isCollapsed ? (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-card/60 p-2 border border-border/60">
            <div className="flex items-center gap-2 truncate">
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt=""
                  className="size-7 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  A
                </div>
              )}
              <div className="truncate text-left text-xs">
                <p className="font-semibold text-foreground truncate">{currentUser?.name || 'Administrator'}</p>
                <p className="text-[10px] text-muted-foreground truncate">{currentUser?.email}</p>
              </div>
            </div>

            <button
              onClick={() => switchDemoUser('customer')}
              title="Beralih ke Pelanggan"
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <SlidersHorizontal className="size-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => switchDemoUser('customer')}
            title="Beralih ke Pelanggan"
            className="flex size-9 items-center justify-center rounded-lg hover:bg-muted text-muted-foreground"
          >
            <SlidersHorizontal className="size-4" />
          </button>
        )}
      </div>
    </aside>
  )
}
