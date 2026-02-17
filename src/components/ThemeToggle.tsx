import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../theme'

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={onToggle}
      className={
        isDark
          ? 'group inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-2 text-sm text-white/90 backdrop-blur transition hover:border-white/[0.16] hover:bg-white/[0.06]'
          : 'group inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-2 text-sm text-zinc-900 backdrop-blur transition hover:border-black/15 hover:bg-black/[0.05]'
      }
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -12, opacity: 0, y: -2 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="inline-flex"
      >
        {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </motion.span>
      <span className="hidden sm:inline">{isDark ? 'Clair' : 'Sombre'}</span>
    </button>
  )
}
