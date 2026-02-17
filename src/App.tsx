import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import { applyTheme, getInitialTheme, type Theme } from './theme'
import { ThemeToggle } from './components/ThemeToggle'
import { MobileMenu } from './components/MobileMenu'
import { LogoMark } from './components/LogoMark'
import { asset } from './assets'
import {
  AlertTriangle,
  BatteryFull,
  Box,
  BrainCircuit,
  Calculator,
  CalendarClock,
  ChevronDown,
  Gem,
  Menu,
  RefreshCcw,
  Shield,
  TrendingUp,
} from 'lucide-react'

type Habit = 'vape' | 'telephone' | 'snacks' | 'weed' | 'autre'

const habitLabels: Record<Habit, string> = {
  vape: 'Vape / cigarettes électroniques',
  telephone: 'Téléphone / smartphone',
  snacks: 'Snacks / grignotage',
  weed: 'Weed / CBD',
  autre: 'Autre',
}

const habitImages: Partial<Record<Habit, string>> = {
  vape: 'assets/hero_vape_insert_1900.png',
  telephone: 'assets/hero_phone_insert_1900.png',
  weed: 'assets/hero_weed_insert_1900.png',
}

function euro(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  // Calculator
  const [habit, setHabit] = useState<Habit>('vape')
  const [hoursPerDay, setHoursPerDay] = useState(1)
  const [monthlyCost, setMonthlyCost] = useState(50)

  const annualSavings = useMemo(() => clamp(monthlyCost, 0, 9999) * 12, [monthlyCost])

  useEffect(() => {
    const t = getInitialTheme()
    setTheme(t)
    applyTheme(t)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isDark = theme === 'dark'

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className={isDark ? 'min-h-screen bg-bg-950 bg-grain text-white' : 'min-h-screen bg-white text-zinc-900'}>
      {/* Top background glow (asymmetrical, subtle) */}
      <div
        className={
          isDark
            ? 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(255,179,71,0.12),transparent_60%)]'
            : 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(255,179,71,0.08),transparent_60%)]'
        }
      />

      {/* Header */}
      <header
        className={
          isDark
            ? 'sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur'
            : 'sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur'
        }
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#hero" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <LogoMark theme={isDark ? 'dark' : 'light'} />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Candena</div>
              <div className={isDark ? 'text-xs text-white/60' : 'text-xs text-zinc-500'}>Candena Master</div>
            </div>
          </a>

          <nav className={isDark ? 'hidden items-center gap-6 text-sm text-white/70 md:flex' : 'hidden items-center gap-6 text-sm text-zinc-600 md:flex'}>
            <a className="hover:text-white" href="#features">Le produit</a>
            <a className="hover:text-white" href="#test">Calculateur</a>
            <a className="hover:text-white" href="#science">La science</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
            <a className="hover:text-white" href="#pricing">Réserver</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={() => setTheme(isDark ? 'light' : 'dark')} />

            <button
              className={
                isDark
                  ? 'md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 hover:bg-white/10'
                  : 'md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-black/5 text-zinc-900 hover:bg-black/10'
              }
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
            >
              <motion.div animate={menuOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.18 }} className="text-lg">
                <Menu size={18} strokeWidth={1.5} />
              </motion.div>
            </button>

            <a
              href="#pricing"
              className={
                isDark
                  ? 'hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-glow hover:opacity-95 md:inline-flex'
                  : 'hidden rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-95 md:inline-flex'
              }
            >
              Réserver — 99€
            </a>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero */}
      <section id="hero" className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={isDark ? 'text-4xl font-semibold tracking-tight text-white md:text-6xl' : 'text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl'}
>
              Candena verrouille vos tentations
            </motion.h1>
            <div className={isDark ? 'mt-4 max-w-xl text-base italic text-white/65' : 'mt-4 max-w-xl text-base italic text-zinc-500'}>
              Pas parce que vous manquez de volonté. Parce que personne ne peut négocier avec lui-même et gagner.
            </div>

            <h2 className={isDark ? 'mt-4 max-w-xl text-2xl font-semibold tracking-tight text-white md:text-3xl' : 'mt-4 max-w-xl text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl'}>
              Vous fixez le prix. Vous gardez le contrôle.
            </h2>

            <p className={isDark ? 'mt-3 max-w-xl text-lg text-white/70' : 'mt-3 max-w-xl text-lg text-zinc-600'}>
              Chaque écart a un prix que vous avez choisi vous-même, dont la moitié part à une cause qui le mérite.
              Une façon de vous tenir à vos propres règles, même quand l’envie est là.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#test"
                className={
                  isDark
                    ? 'inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-glow hover:opacity-95'
                    : 'inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-95'
                }
              >
                Calculer ce que me coûtent mes habitudes
              </a>
              <a
                href="#pricing"
                className={
                  isDark
                    ? 'inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10'
                    : 'inline-flex items-center justify-center rounded-full border border-black/15 bg-black/5 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-black/10'
                }
              >
                Réserver mon exemplaire — 99€
              </a>
            </div>

            <div className={isDark ? 'mt-8 flex flex-wrap gap-3 text-xs text-white/60' : 'mt-8 flex flex-wrap gap-3 text-xs text-zinc-500'}>
              <span className={isDark ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-black/10 bg-black/5 px-3 py-1'}>Early Bird : 99€ au lieu de 149€</span>
              <span className={isDark ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-black/10 bg-black/5 px-3 py-1'}>Livraison Q4 2026</span>
              <span className={isDark ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-black/10 bg-black/5 px-3 py-1'}>Une partie reversée à une association anti-addictions</span>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,179,71,0.35),rgba(0,0,0,0)_60%)]" />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className={isDark ? 'relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.06] p-4 shadow-2xl' : 'relative overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-2xl'}
            >
              <img
                src={asset('assets/hero_packshot_closed_1900_v2.png')}
                alt="Boîtier Candena"
                className="h-[360px] w-full rounded-xl object-cover md:h-[460px]"
              />

              {/* Hero header visuals (use cases) */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className={isDark ? 'group relative overflow-hidden rounded-lg border border-white/[0.10] bg-white/[0.03]' : 'group relative overflow-hidden rounded-lg border border-black/10 bg-black/[0.02]'}>
                  <img
                    src={asset('assets/hero_vape_insert_1900.png')}
                    alt="Candena, cas d’usage vape"
                    className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 py-2">
                    <div className="text-xs text-white/90">Vape</div>
                  </div>
                </div>
                <div className={isDark ? 'group relative overflow-hidden rounded-lg border border-white/[0.10] bg-white/[0.03]' : 'group relative overflow-hidden rounded-lg border border-black/10 bg-black/[0.02]'}>
                  <img
                    src={asset('assets/hero_phone_insert_1900.png')}
                    alt="Candena, cas d’usage téléphone"
                    className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 py-2">
                    <div className="text-xs text-white/90">Téléphone</div>
                  </div>
                </div>
                <div className={isDark ? 'group relative overflow-hidden rounded-lg border border-white/[0.10] bg-white/[0.03]' : 'group relative overflow-hidden rounded-lg border border-black/10 bg-black/[0.02]'}>
                  <img
                    src={asset('assets/hero_weed_insert_1900.png')}
                    alt="Candena, cas d’usage weed ou CBD"
                    className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 py-2">
                    <div className="text-xs text-white/90">Weed / CBD</div>
                  </div>
                </div>
              </div>

              <div className={isDark ? 'mt-4 text-sm text-white/70' : 'mt-4 text-sm text-zinc-600'}>
                Candena : acier renforcé, finition premium, format 15×10 cm.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Test / Lead magnet */}
      <section id="test" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>Combien vous coûtent vos habitudes ?</h2>
            <p className={isDark ? 'mt-3 text-white/70' : 'mt-3 text-zinc-600'}>
              Pas encore décidé ? Calculez d&apos;abord ce que vos habitudes vous coûtent chaque année. Ensuite, recevez gratuitement
              <span className="font-semibold"> « Le Protocole Candena »</span> — notre guide pour reprendre le contrôle, étape par étape.
            </p>

            <div className={isDark ? 'mt-6 rounded-xl border border-white/[0.10] bg-white/[0.06] p-5' : 'mt-6 rounded-xl border border-black/10 bg-black/[0.04] p-5'}>
              {/* (preuve sociale retirée) */}
              <form
                className="mt-4 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  const email = String(fd.get('email') || '').trim()
                  if (!/.+@.+\..+/.test(email)) return
                  // Soft gate: store locally, then open the guide
                  localStorage.setItem('candena_guide_access', JSON.stringify({ email, at: Date.now() }))
                  window.location.href = `${import.meta.env.BASE_URL}guide.html`
                }}
              >
                <input
                  name="email"
                  placeholder="votre@email.com"
                  inputMode="email"
                  className={
                    isDark
                      ? 'h-11 w-full rounded-lg border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                      : 'h-11 w-full rounded-lg border border-black/10 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                  }
                />
                <button
                  type="submit"
                  className={
                    isDark
                      ? 'h-11 rounded-lg bg-[#ffb347] px-5 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a]'
                      : 'h-11 rounded-lg bg-[#ffb347] px-5 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a]'
                  }
                >
                  Recevoir le guide
                </button>
              </form>
              <div className={isDark ? 'mt-3 text-xs text-white/50' : 'mt-3 text-xs text-zinc-500'}>
                Coulisses du projet + techniques de discipline. Zéro spam, désinscription en 1 clic.
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className={isDark ? 'rounded-xl border border-white/[0.10] bg-white/[0.06] p-6' : 'rounded-xl border border-black/10 bg-black/[0.04] p-6'}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className={isDark ? 'text-sm text-white/60' : 'text-sm text-zinc-500'}>Calculateur</div>
                <div className={isDark ? 'mt-1 text-xl font-semibold text-white' : 'mt-1 text-xl font-semibold text-zinc-900'}>Vos économies potentielles</div>
              </div>

              <div className="flex items-center gap-3">
                {habitImages[habit] ? (
                  <div className={isDark ? 'group relative h-9 w-12 overflow-hidden rounded-lg border border-white/[0.10] bg-white/[0.03]' : 'group relative h-9 w-12 overflow-hidden rounded-lg border border-black/10 bg-black/[0.02]'}>
                    <img
                      src={asset(habitImages[habit] as string)}
                      alt="Illustration de l’habitude sélectionnée"
                      className="h-9 w-12 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}

                <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/90' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 text-zinc-900'}>
                  <Calculator size={18} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-700'}>Quelle habitude voulez-vous contrôler ?</span>
                <select
                  value={habit}
                  onChange={(e) => setHabit(e.target.value as Habit)}
                  className={
                    isDark
                      ? 'h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                      : 'h-11 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                  }
                >
                  <option value="vape">Vape / cigarettes électroniques</option>
                  <option value="telephone">Téléphone / smartphone</option>
                  <option value="snacks">Snacks / grignotage</option>
                  <option value="weed">Weed / CBD</option>
                  <option value="autre">Autre</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-2">
                  <span className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-700'}>Heures par jour</span>
                  <input
                    type="number"
                    min={0}
                    max={24}
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(clamp(Number(e.target.value || 0), 0, 24))}
                    className={
                      isDark
                        ? 'h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                        : 'h-11 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                    }
                  />
                </label>
                <label className="grid gap-2">
                  <span className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-700'}>Coût mensuel (€)</span>
                  <input
                    type="number"
                    min={0}
                    max={9999}
                    value={monthlyCost}
                    onChange={(e) => setMonthlyCost(clamp(Number(e.target.value || 0), 0, 9999))}
                    className={
                      isDark
                        ? 'h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                        : 'h-11 rounded-xl border border-black/10 bg-white px-3 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                    }
                  />
                </label>
              </div>

              <div className={isDark ? 'rounded-lg border border-white/[0.10] bg-white/[0.08] p-4' : 'rounded-lg border border-black/10 bg-black/[0.04] p-4'}>
                <div className={isDark ? 'text-sm text-white/60' : 'text-sm text-zinc-500'}>
                  {habitLabels[habit]} • {hoursPerDay}h par jour
                </div>
                <div className={isDark ? 'mt-2 text-3xl font-semibold text-white' : 'mt-2 text-3xl font-semibold text-zinc-900'}>
                  {euro(annualSavings)} / an
                </div>
                <div className={isDark ? 'mt-2 text-xs text-white/50' : 'mt-2 text-xs text-zinc-500'}>
                  Estimation basse : coût mensuel × 12. La vraie facture inclut aussi votre temps, votre énergie et votre tranquillité d&apos;esprit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>Conçu pour ne pas tricher</h2>
          <p className={isDark ? 'mt-3 max-w-2xl text-white/70' : 'mt-3 max-w-2xl text-zinc-600'}>
            Un objet physique + des règles logicielles. Quand l&apos;envie arrive, vous n&apos;avez plus à négocier avec vous-même.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto_auto]">
            {/* Inviolable (tall) */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={
                isDark
                  ? 'md:row-span-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6'
                  : 'md:row-span-2 rounded-xl border border-black/10 bg-black/[0.02] p-6'
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>Inviolable</div>
                  <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                    Acier renforcé. En pratique, vous n’avez pas “une petite marge”. Soit vous respectez vos règles, soit vous payez l’ouverture anticipée.
                  </div>
                </div>
                <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                  <Shield size={18} strokeWidth={1.5} />
                </div>
              </div>

              <div className={isDark ? 'mt-5 rounded-lg border border-white/[0.10] bg-white/[0.06] p-4 text-sm text-white/70' : 'mt-5 rounded-lg border border-black/10 bg-black/[0.04] p-4 text-sm text-zinc-700'}>
                Le but n’est pas de vous punir. C’est de rendre l’écart suffisamment réel pour qu’il ne soit plus automatique.
              </div>
            </motion.div>

            {/* Planning */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={isDark ? 'rounded-xl border border-white/[0.06] bg-white/[0.03] p-6' : 'rounded-xl border border-black/10 bg-black/[0.02] p-6'}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>Planification intelligente</div>
                  <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                    Définissez vos plages, comme « tous les soirs de 21h à 7h » ou « en semaine pendant le travail ». Candena applique.
                  </div>
                </div>
                <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                  <CalendarClock size={18} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Urgence */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={isDark ? 'rounded-xl border border-white/[0.06] bg-white/[0.03] p-6' : 'rounded-xl border border-black/10 bg-black/[0.02] p-6'}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>Déverrouillage d’urgence</div>
                  <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                    Toujours accessible, au prix que vous avez fixé. Une partie est reversée à une association de lutte contre les addictions, choisie par vous.
                  </div>
                </div>
                <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                  <AlertTriangle size={18} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Autonomie */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={isDark ? 'rounded-xl border border-white/[0.06] bg-white/[0.03] p-6' : 'rounded-xl border border-black/10 bg-black/[0.02] p-6'}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>3 mois d’autonomie</div>
                  <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                    Une charge USB-C, puis vous n’y pensez plus pendant un trimestre.
                  </div>
                </div>
                <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                  <BatteryFull size={18} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Format compact (span-2 with real photo) */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={
                isDark
                  ? 'md:col-span-2 flex items-center gap-5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6'
                  : 'md:col-span-2 flex items-center gap-5 rounded-xl border border-black/10 bg-black/[0.02] p-6'
              }
            >
              <img
                src={asset('assets/lifestyle_phone_insert.jpg')}
                alt="Un téléphone dans le boîtier Candena"
                className="h-24 w-24 flex-none rounded-lg object-cover md:h-28 md:w-28"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>Format compact</div>
                    <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                      15×10 cm. Votre téléphone, vape, cartes bancaires, snacks, tout rentre.
                    </div>
                  </div>
                  <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                    <Box size={18} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Finition premium (full width, horizontal) */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={
                isDark
                  ? 'md:col-span-3 flex items-center justify-between gap-6 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6'
                  : 'md:col-span-3 flex items-center justify-between gap-6 rounded-xl border border-black/10 bg-black/[0.02] p-6'
              }
            >
              <div className="flex items-start gap-4">
                <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                  <Gem size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>Finition premium</div>
                  <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                    Un objet que vous n’aurez pas envie de cacher. Pensé pour rester sur votre bureau, et vous rappeler votre décision.
                  </div>
                </div>
              </div>
              <div className={isDark ? 'hidden text-sm text-white/60 md:block' : 'hidden text-sm text-zinc-500 md:block'}>
                Minimal. Durable. Clair.
              </div>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className={isDark ? 'group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]' : 'group relative overflow-hidden rounded-xl border border-black/10 bg-black/[0.02]'}>
              <img
                src={asset('assets/side_angle_specs.jpg')}
                alt="Candena — specs"
                className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[340px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <div className="text-sm text-white/90">Candena sous tous les angles, acier brossé, mécanisme anti-effraction.</div>
              </div>
            </div>
            <div className={isDark ? 'group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]' : 'group relative overflow-hidden rounded-xl border border-black/10 bg-black/[0.02]'}>
              <img
                src={asset('assets/detail_screen_1900.jpg')}
                alt="App Candena"
                className="h-[300px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[340px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
                <div className="text-sm text-white/90">L’app compagnon, programmez vos plages, suivez vos progrès, gérez les urgences.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science */}
      <section id="science" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>La science derrière Candena</h2>
          <p className={isDark ? 'mt-3 max-w-3xl text-white/70' : 'mt-3 max-w-3xl text-zinc-600'}>
            Candena est un <span className="font-semibold">pre-commitment device</span>, un outil d’engagement anticipé. Vous définissez vos règles à tête reposée.
            Quand l’envie arrive, la décision est déjà prise. Pas de négociation. Pas de « juste cette fois ».
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className={isDark ? 'rounded-xl border border-white/[0.06] bg-white/[0.03] p-6' : 'rounded-xl border border-black/10 bg-black/[0.02] p-6'}>
              <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                <RefreshCcw size={18} strokeWidth={1.5} />
              </div>
              <div className={isDark ? 'mt-4 text-base font-semibold text-white' : 'mt-4 text-base font-semibold text-zinc-900'}>Moi d’aujourd’hui vs moi de demain</div>
              <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                Votre moi lucide fixe les règles. Votre moi impulsif ne peut que les suivre, ou payer.
              </div>
            </div>

            <div className={isDark ? 'rounded-xl border border-white/[0.06] bg-white/[0.03] p-6' : 'rounded-xl border border-black/10 bg-black/[0.02] p-6'}>
              <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                <BrainCircuit size={18} strokeWidth={1.5} />
              </div>
              <div className={isDark ? 'mt-4 text-base font-semibold text-white' : 'mt-4 text-base font-semibold text-zinc-900'}>Fatigue décisionnelle</div>
              <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                Le soir, votre volonté est au plus bas. Candena prend le relais quand vous ne pouvez plus.
              </div>
            </div>

            <div className={isDark ? 'rounded-xl border border-white/[0.06] bg-white/[0.03] p-6' : 'rounded-xl border border-black/10 bg-black/[0.02] p-6'}>
              <div className={isDark ? 'flex h-9 w-9 items-center justify-center rounded-lg bg-white/10' : 'flex h-9 w-9 items-center justify-center rounded-lg bg-black/5'}>
                <TrendingUp size={18} strokeWidth={1.5} />
              </div>
              <div className={isDark ? 'mt-4 text-base font-semibold text-white' : 'mt-4 text-base font-semibold text-zinc-900'}>Effet cumulatif</div>
              <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                Chaque soir où la boîte reste fermée renforce votre confiance. En quelques semaines, vous changez votre standard.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>Questions fréquentes</h2>
          {(() => {
            const faqs = [
              {
                q: 'Et si j’ai une vraie urgence ?',
                a: 'Vous pouvez toujours ouvrir la boîte via l’app. Cela déclenche le montant que vous avez choisi, par exemple 5€, 10€, 50€ ou 100€. Une partie est reversée à une association de lutte contre les addictions, choisie par vous. C’est votre engagement, votre prix.',
              },
              {
                q: 'Pourquoi faut-il attendre fin 2026 ?',
                a: 'On finalise l’ingénierie pour garantir un boîtier véritablement inviolable et durable. Précommander maintenant, c’est financer la production et économiser 50€.',
              },
              {
                q: 'Pourquoi 99€ et pas moins ?',
                a: '99€ est le prix Early Bird. Le prix final sera 149€. Vous financez la première série de 500 unités et vous sécurisez votre exemplaire à tarif réduit.',
              },
              {
                q: 'Où va l’argent des pénalités ?',
                a: 'Quand vous déverrouillez avant l’heure, le montant que vous avez fixé est débité. Une partie est reversée à une association de lutte contre les addictions, choisie par vous. Le reste couvre les frais de transaction et d’opération.',
              },
            ]

            return (
              <div className={isDark ? 'mt-8 divide-y divide-white/[0.06] rounded-xl border border-white/[0.06] bg-white/[0.03] px-5' : 'mt-8 divide-y divide-black/10 rounded-xl border border-black/10 bg-black/[0.02] px-5'}>
                {faqs.map((faq, i) => (
                  <div key={faq.q} className="py-5">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-6 text-left"
                    >
                      <span className={isDark ? 'text-base font-medium text-white' : 'text-base font-medium text-zinc-900'}>{faq.q}</span>
                      <ChevronDown
                        size={18}
                        strokeWidth={1.5}
                        className={
                          (isDark ? 'text-white/70 ' : 'text-zinc-500 ') +
                          'transition-transform duration-200 ' +
                          (openFaq === i ? 'rotate-180' : '')
                        }
                      />
                    </button>
                    {openFaq === i ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className={isDark ? 'mt-3 text-sm text-white/70' : 'mt-3 text-sm text-zinc-600'}>{faq.a}</p>
                      </motion.div>
                    ) : null}
                  </div>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className={isDark ? 'rounded-2xl border border-[#ffb347]/30 bg-white/[0.06] p-8 md:p-10' : 'rounded-2xl border border-[#ffb347]/25 bg-black/[0.04] p-8 md:p-10'}>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className={isDark ? 'text-sm text-white/60' : 'text-sm text-zinc-500'}>Édition Early Bird • 500 exemplaires</div>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className={isDark ? 'text-4xl font-semibold text-white' : 'text-4xl font-semibold text-zinc-900'}>99€</span>
                  <span className={isDark ? 'text-lg text-white/40 line-through' : 'text-lg text-zinc-400 line-through'}>149€</span>
                </div>
                <div className={isDark ? 'mt-2 text-white/70' : 'mt-2 text-zinc-600'}>
                  Production limitée à 500 unités • Livraison prévue Q4 2026
                </div>
              </div>
              <div className="w-full max-w-md">
                <div className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-600'}>20% des 500 exemplaires déjà réservés</div>
                <div className={isDark ? 'mt-2 h-3 w-full rounded-full bg-white/10' : 'mt-2 h-3 w-full rounded-full bg-black/10'}>
                  <div className="h-3 w-[20%] rounded-full bg-[#ffb347]" />
                </div>
                <form
                  className="mt-5 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const fd = new FormData(e.currentTarget)
                    const email = String(fd.get('email') || '').trim()
                    if (!/.+@.+\..+/.test(email)) return
                    localStorage.setItem('candena_guide_access', JSON.stringify({ email, at: Date.now() }))
                    window.location.href = `${import.meta.env.BASE_URL}confirmation.html`
                  }}
                >
                  <input
                    name="email"
                    placeholder="votre@email.com"
                    inputMode="email"
                    className={
                      isDark
                        ? 'h-11 w-full rounded-lg border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                        : 'h-11 w-full rounded-lg border border-black/10 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                    }
                  />
                  <button
                    type="submit"
                    className={
                      isDark
                        ? 'inline-flex w-full items-center justify-center rounded-xl bg-[#ffb347] px-6 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a]'
                        : 'inline-flex w-full items-center justify-center rounded-xl bg-[#ffb347] px-6 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a]'
                    }
                  >
                    Réserver mon exemplaire
                  </button>
                </form>
                <div className={isDark ? 'mt-3 text-xs text-white/50' : 'mt-3 text-xs text-zinc-500'}>
                  C&apos;est une précommande, un vrai pari sur vous-même.
                  <span className="ml-1 opacity-90">Un pari sur vous-même, à 99€.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className={isDark ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-zinc-900'}>Produit</div>
              <div className={isDark ? 'mt-3 grid gap-2 text-sm text-white/70' : 'mt-3 grid gap-2 text-sm text-zinc-600'}>
                <a href="#features" className="hover:underline">Fonctionnalités</a>
                <a href="#pricing" className="hover:underline">Pricing</a>
                <a href="#faq" className="hover:underline">FAQ</a>
              </div>
            </div>
            <div>
              <div className={isDark ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-zinc-900'}>Entreprise</div>
              <div className={isDark ? 'mt-3 grid gap-2 text-sm text-white/70' : 'mt-3 grid gap-2 text-sm text-zinc-600'}>
                <a href="#" className="hover:underline">À propos</a>
                <a href="#" className="hover:underline">Contact</a>
                <a href="#" className="hover:underline">Presse</a>
              </div>
            </div>
            <div>
              <div className={isDark ? 'text-sm font-semibold text-white' : 'text-sm font-semibold text-zinc-900'}>Légal</div>
              <div className={isDark ? 'mt-3 grid gap-2 text-sm text-white/70' : 'mt-3 grid gap-2 text-sm text-zinc-600'}>
                <a href="#" className="hover:underline">Conditions</a>
                <a href="#" className="hover:underline">Confidentialité</a>
                <a href="#" className="hover:underline">Cookies</a>
              </div>
            </div>
          </div>
          <div className={isDark ? 'mt-10 text-xs text-white/50' : 'mt-10 text-xs text-zinc-500'}>
            © {new Date().getFullYear()} Candena. Tous droits réservés.
            <span className="ml-2">Un projet conçu en France</span>
          </div>
        </div>
      </footer>

      {/* Sticky CTA (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className={isDark ? 'border-t border-white/10 bg-black/70 px-4 py-3 backdrop-blur' : 'border-t border-black/10 bg-white/70 px-4 py-3 backdrop-blur'}>
          <a
            href="#pricing"
            className={
              isDark
                ? 'inline-flex w-full items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-glow'
                : 'inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white'
            }
          >
            Réserver — 99€
          </a>
        </div>
      </div>

      {/* Smooth scroll */}
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  )
}
