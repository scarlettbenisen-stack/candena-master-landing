import { motion } from 'framer-motion'
import type { Theme } from '../theme'

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === 'dark'
  return (
    <button
      onClick={onToggle}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -20, opacity: 0, y: -2 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-base"
      >
        {isDark ? '☀️' : '🌙'}
      </motion.span>
      <span className="hidden sm:inline">{isDark ? 'Clair' : 'Sombre'}</span>
    </button>
  )
}
