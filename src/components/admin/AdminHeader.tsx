import React from 'react'
import { useBookstore } from '@/context/BookstoreContext'
import {
  PanelLeft,
  PanelLeftClose,
  Search,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

interface AdminHeaderProps {
  currentTabTitle: string
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentTabTitle,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { theme, toggleTheme, setActiveView, setIsCmdKOpen } = useBookstore()

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Sidebar trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition"
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
        </button>

        <div className="h-4 w-[1px] bg-border" />

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Backoffice</span>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <span className="font-semibold text-foreground">{currentTabTitle}</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5">
        {/* Quick Search ⌘K */}
        <button
          onClick={() => setIsCmdKOpen(true)}
          className="hidden sm:flex items-center gap-2 h-8 rounded-md border border-input bg-muted/40 px-2.5 text-xs text-muted-foreground hover:border-ring transition"
        >
          <Search className="size-3.5" />
          <span>Cari data ⌘K</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition"
          title="Ubah Tema"
        >
          {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>

        {/* Return to store button */}
        <button
          onClick={() => setActiveView('store')}
          className="flex items-center gap-1.5 h-8 px-3 rounded-md bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition"
        >
          <ExternalLink className="size-3.5" />
          <span className="hidden sm:inline">Toko Publik</span>
        </button>
      </div>
    </header>
  )
}
