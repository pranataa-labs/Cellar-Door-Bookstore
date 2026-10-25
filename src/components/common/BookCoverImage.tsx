import React, { useState } from 'react'
import { BookOpen } from 'lucide-react'

interface BookCoverImageProps {
  src: string
  alt: string
  title: string
  author?: string
  category?: string
  className?: string
  containerClassName?: string
  aspectRatio?: string // e.g. 'aspect-[2/3]'
}

export const BookCoverImage: React.FC<BookCoverImageProps> = ({
  src,
  alt,
  title,
  author,
  category,
  className = 'size-full object-cover',
  containerClassName = '',
  aspectRatio = 'aspect-[2/3]',
}) => {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Color theme generator based on category or title hash
  const getCoverTheme = (cat?: string) => {
    const c = (cat || '').toLowerCase()
    if (c.includes('fiksi') || c.includes('sastra')) {
      return {
        bg: 'from-emerald-950 via-teal-900 to-slate-950',
        accent: 'border-emerald-500/40 text-emerald-200',
        badge: 'bg-emerald-500/20 text-emerald-300',
      }
    }
    if (c.includes('teknologi') || c.includes('sains')) {
      return {
        bg: 'from-blue-950 via-indigo-950 to-slate-950',
        accent: 'border-blue-500/40 text-blue-200',
        badge: 'bg-blue-500/20 text-blue-300',
      }
    }
    if (c.includes('filosofi') || c.includes('pemikiran')) {
      return {
        bg: 'from-amber-950 via-stone-900 to-slate-950',
        accent: 'border-amber-500/40 text-amber-200',
        badge: 'bg-amber-500/20 text-amber-300',
      }
    }
    if (c.includes('bisnis') || c.includes('finansial')) {
      return {
        bg: 'from-slate-900 via-neutral-900 to-slate-950',
        accent: 'border-slate-500/40 text-slate-200',
        badge: 'bg-slate-500/20 text-slate-300',
      }
    }
    if (c.includes('pengembangan')) {
      return {
        bg: 'from-violet-950 via-purple-950 to-slate-950',
        accent: 'border-purple-500/40 text-purple-200',
        badge: 'bg-purple-500/20 text-purple-300',
      }
    }
    return {
      bg: 'from-slate-950 via-zinc-900 to-slate-950',
      accent: 'border-primary/40 text-primary-foreground',
      badge: 'bg-primary/20 text-primary-foreground',
    }
  }

  const theme = getCoverTheme(category)

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col justify-between overflow-hidden rounded bg-gradient-to-br ${theme.bg} p-3 text-white shadow-inner select-none ${aspectRatio} ${containerClassName}`}
        role="img"
        aria-label={`Sampul buku: ${title}`}
      >
        {/* Book spine line & shadow effect */}
        <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 via-white/5 to-transparent border-r border-white/10" />

        {/* Top: Category or Cellar Door imprint */}
        <div className="pl-2 pt-1 flex items-center justify-between">
          <span className={`rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase ${theme.badge}`}>
            {category || 'Cellar Door'}
          </span>
          <BookOpen className="size-3 text-white/50" />
        </div>

        {/* Center: Book Title & Author */}
        <div className="pl-2 my-auto space-y-1">
          <h4 className="font-serif font-bold text-xs leading-snug line-clamp-3 text-white tracking-wide">
            {title}
          </h4>
          {author && (
            <p className="font-sans text-[10px] text-white/70 line-clamp-1 italic">
              {author}
            </p>
          )}
        </div>

        {/* Bottom imprint */}
        <div className="pl-2 pt-2 border-t border-white/10 flex items-center justify-between text-[8px] text-white/50 font-mono tracking-widest uppercase">
          <span>Cellar Press</span>
          <span>Original</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-muted ${aspectRatio} ${containerClassName}`}>
      {/* Loading skeleton shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <BookOpen className="size-5 text-muted-foreground/40 animate-bounce" />
        </div>
      )}

      {/* Book spine overlay for realistic depth */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/40 via-white/5 to-transparent z-10" />

      <img
        src={src}
        alt={alt || title}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  )
}
