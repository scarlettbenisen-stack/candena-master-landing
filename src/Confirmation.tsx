import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import { applyTheme, getInitialTheme, type Theme } from './theme'
import { ThemeToggle } from './components/ThemeToggle'
import { LogoMark } from './components/LogoMark'
import { asset } from './assets'

export default function Confirmation() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const t = getInitialTheme()
    setTheme(t)
    applyTheme(t)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const isDark = theme === 'dark'

  return (
    <div className={isDark ? 'min-h-screen bg-bg-950 bg-grain text-white' : 'min-h-screen bg-white text-zinc-900'}>
      <div
        className={
          isDark
            ? 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(255,179,71,0.10),transparent_60%)]'
            : 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(255,179,71,0.07),transparent_60%)]'
        }
      />

      <header className={isDark ? 'border-b border-white/10 bg-black/70 backdrop-blur' : 'border-b border-black/10 bg-white/70 backdrop-blur'}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href={asset('')} className="flex items-center gap-2">
            <LogoMark theme={isDark ? 'dark' : 'light'} />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Candena</div>
              <div className={isDark ? 'text-xs text-white/60' : 'text-xs text-zinc-500'}>Confirmation</div>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={() => setTheme(isDark ? 'light' : 'dark')} />
          </div>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl place-items-center px-4 py-14">
        <div className="w-full max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={isDark ? 'text-3xl font-semibold tracking-tight text-white md:text-5xl' : 'text-3xl font-semibold tracking-tight text-zinc-900 md:text-5xl'}
          >
            Votre place early bird est réservée.
          </motion.h1>

          <p className={isDark ? 'mx-auto mt-4 max-w-xl text-base text-white/70 md:text-lg' : 'mx-auto mt-4 max-w-xl text-base text-zinc-600 md:text-lg'}>
            Vous faites partie des premiers. Voici le guide pour commencer dès maintenant.
          </p>

          <div className="mt-8">
            <a
              href={asset('guide.html')}
              className={
                isDark
                  ? 'inline-flex w-full items-center justify-center rounded-xl bg-[#ffb347] px-6 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a] sm:w-auto'
                  : 'inline-flex w-full items-center justify-center rounded-xl bg-[#ffb347] px-6 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a] sm:w-auto'
              }
            >
              Lire Le Protocole Candena →
            </a>
          </div>

          <div className={isDark ? 'mt-4 text-sm text-white/60' : 'mt-4 text-sm text-zinc-500'}>
            Pas de paiement maintenant. Vous recevrez un mail de confirmation avec votre prix bloqué à 99€.
          </div>
        </div>
      </main>

      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  )
}
