import { AnimatePresence, motion } from 'framer-motion'

const links = [
  { href: '#hero', label: 'Accueil' },
  { href: '#features', label: 'Le produit' },
  { href: '#test', label: 'Calculateur' },
  { href: '#science', label: 'La science' },
  { href: '#faq', label: 'FAQ' },
  { href: '#pricing', label: 'Réserver' },
]

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="mx-4 mt-20 rounded-2xl border border-white/10 bg-black/80 p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-white/70">Navigation</div>
              <button
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/90"
                onClick={onClose}
              >
                Fermer
              </button>
            </div>
            <nav className="mt-3 grid gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={onClose}
                  className="rounded-xl px-3 py-3 text-base text-white/90 hover:bg-white/10"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
