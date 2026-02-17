import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import { applyTheme, getInitialTheme, type Theme } from './theme'
import { ThemeToggle } from './components/ThemeToggle'
import { MobileMenu } from './components/MobileMenu'

type Habit = 'vape' | 'telephone' | 'snacks' | 'autre'

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

  return (
    <div
      className={
        isDark
          ? 'min-h-screen bg-bg-950 text-white'
          : 'min-h-screen bg-white text-zinc-900'
      }
    >
      {/* Top background glow */}
      <div
        className={
          isDark
            ? 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(255,179,71,0.20),rgba(0,0,0,0)_60%)]'
            : 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(255,179,71,0.18),rgba(255,255,255,0)_60%)]'
        }
      />

      {/* Header */}
      <header className={isDark ? 'sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur' : 'sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur'}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#hero" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className={isDark ? 'h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/10' : 'h-8 w-8 rounded-xl bg-black/5 ring-1 ring-black/10'} />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Candena</div>
              <div className={isDark ? 'text-xs text-white/60' : 'text-xs text-zinc-500'}>Candena Master</div>
            </div>
          </a>

          <nav className={isDark ? 'hidden items-center gap-6 text-sm text-white/70 md:flex' : 'hidden items-center gap-6 text-sm text-zinc-600 md:flex'}>
            <a className="hover:text-white" href="#features">Fonctionnalités</a>
            <a className="hover:text-white" href="#test">Test de volonté</a>
            <a className="hover:text-white" href="#science">Science</a>
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
              <motion.div
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.18 }}
                className="text-lg"
              >
                ☰
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={
                isDark
                  ? 'text-4xl font-semibold tracking-tight text-white md:text-6xl'
                  : 'text-4xl font-semibold tracking-tight text-zinc-900 md:text-6xl'
              }
            >
              L’outil ultime pour vos habitudes.
            </motion.h1>
            <p className={isDark ? 'mt-4 max-w-xl text-lg text-white/70' : 'mt-4 max-w-xl text-lg text-zinc-600'}>
              Une boîte intelligente qui verrouille vos tentations (vape, téléphone, snacks) selon vos propres règles.
              Reprenez le contrôle.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#pricing"
                className={
                  isDark
                    ? 'inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-glow hover:opacity-95'
                    : 'inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-95'
                }
              >
                Réserver mon exemplaire — 99€
              </a>
              <a
                href="#test"
                className={
                  isDark
                    ? 'inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10'
                    : 'inline-flex items-center justify-center rounded-full border border-black/15 bg-black/5 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-black/10'
                }
              >
                Faire le test de volonté
              </a>
            </div>

            <div className={isDark ? 'mt-8 flex flex-wrap gap-3 text-xs text-white/60' : 'mt-8 flex flex-wrap gap-3 text-xs text-zinc-500'}>
              <span className={isDark ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-black/10 bg-black/5 px-3 py-1'}>Précommande Early Bird</span>
              <span className={isDark ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-black/10 bg-black/5 px-3 py-1'}>Livraison Q4 2026</span>
              <span className={isDark ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1' : 'rounded-full border border-black/10 bg-black/5 px-3 py-1'}>50% à une association</span>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,179,71,0.35),rgba(0,0,0,0)_60%)]" />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className={isDark ? 'relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl' : 'relative overflow-hidden rounded-3xl border border-black/10 bg-white p-4 shadow-2xl'}
            >
              <img
                src="/assets/hero_packshot_closed.jpg"
                alt="Boîtier Candena"
                className="h-[360px] w-full rounded-2xl object-cover md:h-[460px]"
              />
              <div className={isDark ? 'mt-4 text-sm text-white/70' : 'mt-4 text-sm text-zinc-600'}>
                Rendu produit — intégration fluide sur fond noir (glow subtil).
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Test / Lead magnet */}
      <section id="test" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2">
          <div>
            <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>Le Test de Volonté</h2>
            <p className={isDark ? 'mt-3 text-white/70' : 'mt-3 text-zinc-600'}>
              Pas encore prêt à commander ? Calcule combien ces habitudes te coûtent par an — puis reçois le guide
              <span className="font-semibold"> « Le Protocole Candena »</span>.
            </p>

            <div className={isDark ? 'mt-6 rounded-2xl border border-white/10 bg-white/5 p-5' : 'mt-6 rounded-2xl border border-black/10 bg-black/5 p-5'}>
              <div className={isDark ? 'text-sm text-white/60' : 'text-sm text-zinc-500'}>Rejoignez les 1200+ personnes qui ont choisi de ne plus subir.</div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  placeholder="Votre email"
                  className={
                    isDark
                      ? 'h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                      : 'h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#ffb347]/40'
                  }
                />
                <button
                  className={
                    isDark
                      ? 'h-11 rounded-xl bg-white px-5 text-sm font-semibold text-black hover:opacity-95'
                      : 'h-11 rounded-xl bg-black px-5 text-sm font-semibold text-white hover:opacity-95'
                  }
                >
                  Recevoir le guide
                </button>
              </div>
              <div className={isDark ? 'mt-3 text-xs text-white/50' : 'mt-3 text-xs text-zinc-500'}>
                Coulisses de la production + hacks de discipline. (Pas de spam.)
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className={isDark ? 'rounded-3xl border border-white/10 bg-white/5 p-6' : 'rounded-3xl border border-black/10 bg-black/5 p-6'}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className={isDark ? 'text-sm text-white/60' : 'text-sm text-zinc-500'}>Calculateur interactif</div>
                <div className={isDark ? 'mt-1 text-xl font-semibold text-white' : 'mt-1 text-xl font-semibold text-zinc-900'}>Économies annuelles</div>
              </div>
              <div className={isDark ? 'text-2xl' : 'text-2xl'}>🧮</div>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2">
                <span className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-700'}>Type d’habitude</span>
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
                  <option value="telephone">Téléphone</option>
                  <option value="snacks">Snacks</option>
                  <option value="autre">Autre</option>
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-2">
                  <span className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-700'}>Temps quotidien (h)</span>
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

              <div className={isDark ? 'rounded-2xl bg-white/5 p-4' : 'rounded-2xl bg-white p-4'}>
                <div className={isDark ? 'text-sm text-white/60' : 'text-sm text-zinc-500'}>
                  Habitude : <span className="font-semibold text-white">{habit}</span> • Temps : {hoursPerDay}h/j
                </div>
                <div className={isDark ? 'mt-2 text-3xl font-semibold text-white' : 'mt-2 text-3xl font-semibold text-zinc-900'}>
                  {euro(annualSavings)} / an
                </div>
                <div className={isDark ? 'mt-2 text-xs text-white/50' : 'mt-2 text-xs text-zinc-500'}>
                  Calcul simplifié : coût mensuel × 12 (la vraie valeur = argent + temps + énergie mentale).
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features bento */}
      <section id="features" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>
            Science & Tech — en version “bento”
          </h2>
          <p className={isDark ? 'mt-3 max-w-2xl text-white/70' : 'mt-3 max-w-2xl text-zinc-600'}>
            Un objet physique + des règles logicielles. Quand l’envie arrive, tu n’as plus à négocier.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Inviolable',
                desc: 'Mécanisme de verrouillage en acier renforcé.',
                emoji: '🛡️',
              },
              {
                title: 'Smart App',
                desc: 'Planification récurrente (ex: tous les soirs 21h → 7h).',
                emoji: '📱',
              },
              {
                title: 'Urgence',
                desc: 'Mode déverrouillage sécurisé (anti-panique).',
                emoji: '🚨',
              },
              {
                title: 'Autonomie',
                desc: '3 mois de batterie, charge USB‑C.',
                emoji: '🔋',
              },
              {
                title: 'Form factor',
                desc: 'Tout ce qui tient dans 15×10cm (téléphone, vape, cartes).',
                emoji: '📦',
              },
              {
                title: 'Design premium',
                desc: 'Glows subtils, contrastes nets, finition “event”.',
                emoji: '✨',
              },
            ].map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className={
                  isDark
                    ? 'group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_0_rgba(255,179,71,0)] hover:shadow-[0_0_0_1px_rgba(255,179,71,0.35),0_20px_80px_rgba(255,179,71,0.12)]'
                    : 'group rounded-3xl border border-black/10 bg-white p-6 shadow-sm hover:shadow-[0_0_0_1px_rgba(255,179,71,0.35),0_20px_80px_rgba(255,179,71,0.12)]'
                }
              >
                <div className="flex items-center justify-between">
                  <div className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>{f.title}</div>
                  <div className="text-xl">{f.emoji}</div>
                </div>
                <div className={isDark ? 'mt-3 text-sm text-white/70' : 'mt-3 text-sm text-zinc-600'}>{f.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className={isDark ? 'overflow-hidden rounded-3xl border border-white/10 bg-white/5' : 'overflow-hidden rounded-3xl border border-black/10 bg-white'}>
              <img src="/assets/side_angle_specs.jpg" alt="Candena — specs" className="h-[260px] w-full object-cover" />
              <div className={isDark ? 'p-5 text-sm text-white/70' : 'p-5 text-sm text-zinc-600'}>
                Détails & spécifications — rendu “Stellar”.
              </div>
            </div>
            <div className={isDark ? 'overflow-hidden rounded-3xl border border-white/10 bg-white/5' : 'overflow-hidden rounded-3xl border border-black/10 bg-white'}>
              <img src="/assets/detail_screen_1900.jpg" alt="App Candena" className="h-[260px] w-full object-cover" />
              <div className={isDark ? 'p-5 text-sm text-white/70' : 'p-5 text-sm text-zinc-600'}>
                L’app : règles, planning, mode urgence.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science / social proof */}
      <section id="science" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>Pourquoi ça marche</h2>
          <p className={isDark ? 'mt-3 max-w-3xl text-white/70' : 'mt-3 max-w-3xl text-zinc-600'}>
            Candena est un <span className="font-semibold">pre‑commitment device</span> : tu définis tes règles quand tu es lucide.
            Quand l’impulsion arrive, la décision est déjà prise.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Conflit interne', desc: 'Moi présent vs moi futur : Candena donne un avantage au “moi futur”.', emoji: '🔄' },
              { title: 'Épuisement décisionnel', desc: 'Le soir, la volonté baisse : on automatise les règles.', emoji: '⚡' },
              { title: 'Coût d’intégrité', desc: 'Chaque promesse tenue renforce la confiance en soi.', emoji: '💸' },
            ].map((c) => (
              <div key={c.title} className={isDark ? 'rounded-3xl border border-white/10 bg-white/5 p-6' : 'rounded-3xl border border-black/10 bg-black/5 p-6'}>
                <div className="text-xl">{c.emoji}</div>
                <div className={isDark ? 'mt-3 text-lg font-semibold text-white' : 'mt-3 text-lg font-semibold text-zinc-900'}>{c.title}</div>
                <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className={isDark ? 'text-3xl font-semibold text-white' : 'text-3xl font-semibold text-zinc-900'}>FAQ (anti‑friction)</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[{
              q: 'Et si j’ai une urgence ?',
              a: 'Mode urgence via l’app : déverrouillage sécurisé + délai + logs (anti-panique).',
            },{
              q: 'Pourquoi livraison Q4 2026 ?',
              a: 'On privilégie la qualité industrielle (mécanisme, sécurité, batterie) et la production en série.',
            },{
              q: 'Pourquoi 99€ ?',
              a: 'Early bird : tu finances le premier batch et tu économises 50€ vs le prix final.',
            },{
              q: 'Qu’est-ce qui est reversé ?',
              a: 'En cas de déverrouillage anticipé, tu payes une pénalité que TU définis, dont 50% va à une association.',
            }].map((it) => (
              <div key={it.q} className={isDark ? 'rounded-3xl border border-white/10 bg-white/5 p-6' : 'rounded-3xl border border-black/10 bg-black/5 p-6'}>
                <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>{it.q}</div>
                <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>{it.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className={isDark ? 'rounded-[32px] border border-white/10 bg-white/5 p-8 md:p-10' : 'rounded-[32px] border border-black/10 bg-black/5 p-8 md:p-10'}>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className={isDark ? 'text-sm text-white/60' : 'text-sm text-zinc-500'}>Early bird • lot limité</div>
                <div className={isDark ? 'mt-2 text-4xl font-semibold text-white' : 'mt-2 text-4xl font-semibold text-zinc-900'}>99€</div>
                <div className={isDark ? 'mt-2 text-white/70' : 'mt-2 text-zinc-600'}>
                  Production limitée • Livraison Q4 2026
                </div>
              </div>
              <div className="w-full max-w-md">
                <div className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-600'}>85% du lot Early Bird réservé</div>
                <div className={isDark ? 'mt-2 h-3 w-full rounded-full bg-white/10' : 'mt-2 h-3 w-full rounded-full bg-black/10'}>
                  <div className="h-3 w-[85%] rounded-full bg-[#ffb347]" />
                </div>
                <a
                  href="#"
                  className={
                    isDark
                      ? 'mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black shadow-glow hover:opacity-95'
                      : 'mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-4 text-sm font-semibold text-white hover:opacity-95'
                  }
                >
                  Réserver à 99€
                </a>
                <div className={isDark ? 'mt-3 text-xs text-white/50' : 'mt-3 text-xs text-zinc-500'}>
                  💡 C’est un vrai pari. Mais si tu veux un outil sérieux, c’est celui-là.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-12">
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
          <div className={isDark ? 'mt-10 text-xs text-white/50' : 'mt-10 text-xs text-zinc-500'}>© {new Date().getFullYear()} Candena. Tous droits réservés.</div>
        </div>
      </footer>

      {/* Sticky CTA (mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className={isDark ? 'border-t border-white/10 bg-black/70 px-4 py-3 backdrop-blur' : 'border-t border-black/10 bg-white/70 px-4 py-3 backdrop-blur'}>
          <a
            href="#pricing"
            className={
              isDark
                ? 'inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black shadow-glow'
                : 'inline-flex w-full items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white'
            }
          >
            Réserver à 99€
          </a>
        </div>
      </div>

      {/* Smooth scroll */}
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  )
}
