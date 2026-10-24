import React, { useState } from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { HeroBanner } from '@/components/store/HeroBanner'
import { CatalogView } from '@/components/store/CatalogView'
import { CheckoutView } from '@/components/store/CheckoutView'
import { OrderSuccessView } from '@/components/store/OrderSuccessView'
import { CustomerOrdersView } from '@/components/store/CustomerOrdersView'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { CommandPalette } from '@/components/common/CommandPalette'
import { BookDetailModal } from '@/components/store/BookDetailModal'
import { AuthModal } from '@/components/common/AuthModal'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Toaster } from 'sonner'

export const App: React.FC = () => {
  const { activeView, theme } = useBookstore()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  // If in Admin Backoffice view
  if (activeView === 'admin') {
    return (
      <>
        <Toaster
          position="bottom-right"
          theme={theme}
          toastOptions={{
            style: {
              borderRadius: '0.625rem',
              fontSize: '12px',
            },
          }}
        />
        <CommandPalette />
        <BookDetailModal />
        <AdminLayout />
      </>
    )
  }

  // Otherwise render Customer / Public Storefront
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Toaster
        position="bottom-right"
        theme={theme}
        toastOptions={{
          style: {
            borderRadius: '0.625rem',
            fontSize: '12px',
          },
        }}
      />

      {/* Navigation Header */}
      <Header onOpenAuth={() => setIsAuthOpen(true)} />

      {/* Main Views */}
      <main className="flex-1">
        {activeView === 'store' && (
          <>
            <HeroBanner />
            <CatalogView />
          </>
        )}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'success' && <OrderSuccessView />}
        {activeView === 'orders' && <CustomerOrdersView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CommandPalette />
      <BookDetailModal />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  )
}
