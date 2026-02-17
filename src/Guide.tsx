import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './index.css'
import { applyTheme, getInitialTheme, type Theme } from './theme'
import { ThemeToggle } from './components/ThemeToggle'
import { MobileMenu } from './components/MobileMenu'
import { asset } from './assets'
import { Menu } from 'lucide-react'

export default function Guide() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [menuOpen, setMenuOpen] = useState(false)

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
      {/* Subtle asymmetrical glow */}
      <div
        className={
          isDark
            ? 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(255,179,71,0.10),transparent_60%)]'
            : 'pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(255,179,71,0.07),transparent_60%)]'
        }
      />

      {/* Header */}
      <header className={isDark ? 'sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur' : 'sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur'}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href={asset('')} className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className={isDark ? 'h-8 w-8 rounded-xl bg-white/10 ring-1 ring-white/10' : 'h-8 w-8 rounded-xl bg-black/5 ring-1 ring-black/10'} />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Candena</div>
              <div className={isDark ? 'text-xs text-white/60' : 'text-xs text-zinc-500'}>Guide</div>
            </div>
          </a>

          <nav className={isDark ? 'hidden items-center gap-6 text-sm text-white/70 md:flex' : 'hidden items-center gap-6 text-sm text-zinc-600 md:flex'}>
            <a className="hover:text-white" href={asset('')}>Landing</a>
            <a className="hover:text-white" href="#contenu">Le guide</a>
            <a className="hover:text-white" href={asset('#pricing')}>Réserver</a>
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
              <motion.div animate={menuOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ duration: 0.18 }}>
                <Menu size={18} strokeWidth={1.5} />
              </motion.div>
            </button>

            <a
              href={asset('#pricing')}
              className={
                isDark
                  ? 'hidden rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-glow hover:opacity-95 md:inline-flex'
                  : 'hidden rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-95 md:inline-flex'
              }
            >
              Réserver, 99€
            </a>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={isDark ? 'text-4xl font-semibold tracking-tight text-white md:text-5xl' : 'text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl'}
            >
              Le Protocole Candena
            </motion.h1>
            <p className={isDark ? 'mt-4 max-w-xl text-base leading-relaxed text-white/70' : 'mt-4 max-w-xl text-base leading-relaxed text-zinc-600'}>
              Un guide clair et pratico-pratique pour reprendre le contrôle de vos habitudes. Pas de culpabilisation, pas de morale. Des mécanismes, des règles simples, et un plan d’action.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contenu"
                className={
                  isDark
                    ? 'inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-glow hover:opacity-95'
                    : 'inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:opacity-95'
                }
              >
                Lire le guide
              </a>
              <a
                href={asset('')}
                className={
                  isDark
                    ? 'inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10'
                    : 'inline-flex items-center justify-center rounded-full border border-black/15 bg-black/5 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-black/10'
                }
              >
                Revenir à la landing
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,179,71,0.22),rgba(0,0,0,0)_60%)]" />
            <div className={isDark ? 'relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.06] p-4 shadow-2xl' : 'relative overflow-hidden rounded-2xl border border-black/10 bg-white p-4 shadow-2xl'}>
              <img
                src={asset('assets/hero_packshot_closed_1900_v2.png')}
                alt="Candena"
                className="h-[280px] w-full rounded-xl object-cover md:h-[340px]"
              />
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[{
                  src: 'assets/hero_vape_insert_1900.png',
                  label: 'Vape',
                },{
                  src: 'assets/hero_phone_insert_1900.png',
                  label: 'Téléphone',
                },{
                  src: 'assets/hero_weed_insert_1900.png',
                  label: 'Weed / CBD',
                }].map((it) => (
                  <div key={it.label} className={isDark ? 'group relative overflow-hidden rounded-lg border border-white/[0.10] bg-white/[0.03]' : 'group relative overflow-hidden rounded-lg border border-black/10 bg-black/[0.02]'}>
                    <img
                      src={asset(it.src)}
                      alt={it.label}
                      className="h-20 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 py-2">
                      <div className="text-xs text-white/90">{it.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section id="contenu" className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-3xl px-4 py-14 md:py-20">
          <article className={isDark ? 'text-white/85' : 'text-zinc-800'}>
            <h2 className={isDark ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-zinc-900'}>
              Candena : l’ultime outil pour en finir avec vos mauvaises habitudes
            </h2>
            <p className={isDark ? 'mt-2 text-sm text-white/60' : 'mt-2 text-sm text-zinc-500'}>
              Basé sur l’économie comportementale et le principe d’engagement anticipé.
            </p>

            <div className="mt-8 grid gap-6 leading-relaxed">
              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Pourquoi trahissez-vous vos meilleures intentions ?
                </h3>
                <p>Chaque fois que vous promettez « c’est la dernière fois » puis cédez à nouveau, vous ne manquez pas de volonté. Vous êtes face à un conflit cognitif bien documenté : nous privilégions les récompenses immédiates aux bénéfices à long terme.</p>
                <p>Ce biais du présent vous pousse vers la gratification instantanée, même lorsque vous savez rationnellement que cela va à l’encontre de vos objectifs. Et si 78% des tentatives échouent dans les premiers mois, ce n’est pas une question de motivation. C’est une question de système.</p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Le coût réel de vos promesses brisées
                </h3>
                <p>Au-delà du temps et de l’argent, il y a un coût moins visible : la confiance en vous. Chaque promesse rompue envoie un message simple à votre cerveau : « je ne peux pas compter sur moi ».</p>
                <p>Les personnes qui changent durablement ne sont pas forcément plus disciplinées. Elles conçoivent leur environnement pour réduire la friction vers les bonnes décisions et augmenter la friction vers les mauvaises.</p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  La limite cognitive de la volonté
                </h3>
                <p>La volonté se fatigue. Après une journée de décisions, votre capacité à résister diminue. Votre cerveau bascule vers des mécanismes plus automatiques : « juste cette fois », « je le mérite », « ça ne compte pas ».</p>
                <p>Compter uniquement sur « plus de volonté » revient à miser sur une ressource limitée, au moment où vous en avez le moins.</p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  La solution : externaliser la discipline
                </h3>
                <p>Candena agit comme un allié externe. Vous prenez les décisions quand vous êtes lucide. Ensuite, Candena applique vos règles à votre place, au moment où l’envie arrive.</p>
                <p>C’est le principe d’engagement anticipé : vous vous engagez maintenant pour protéger votre décision future. Vous libérez de l’énergie mentale, et vous réduisez les négociations avec vous-même.</p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Votre plan d’action en 3 étapes
                </h3>
                <ol className={isDark ? 'list-decimal pl-5 text-white/85' : 'list-decimal pl-5 text-zinc-800'}>
                  <li className="mt-2"><span className="font-medium">Identifiez une habitude précise.</span> Une règle concrète bat toujours une intention vague.</li>
                  <li className="mt-2"><span className="font-medium">Définissez des règles claires.</span> Moins d’ambiguïté, moins de négociation.</li>
                  <li className="mt-2"><span className="font-medium">Préparez votre environnement.</span> Placez l’objet dans Candena avant le moment critique.</li>
                </ol>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Stratégies de suivi et d’ajustement
                </h3>
                <p>Suivez vos progrès. Cherchez les patterns (heures, lieux, fatigue). Ajustez vos règles au lieu de vous juger. L’objectif n’est pas la perfection. C’est la trajectoire.</p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Conclusion
                </h3>
                <p>Candena n’est pas une solution magique. C’est un outil qui aligne vos actions avec vos intentions. Commencez avec une seule règle. Puis laissez les petites victoires faire leur travail : reconstruire votre confiance.</p>
              </section>
            </div>

            <div className={isDark ? 'mt-10 rounded-2xl border border-[#ffb347]/30 bg-white/[0.06] p-6' : 'mt-10 rounded-2xl border border-[#ffb347]/25 bg-black/[0.04] p-6'}>
              <div className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-600'}>Prêt à passer du guide au système ?</div>
              <div className={isDark ? 'mt-1 text-xl font-semibold text-white' : 'mt-1 text-xl font-semibold text-zinc-900'}>Réserver Candena</div>
              <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>
                Vous gardez votre autonomie. Vous fixez vos règles. Et si vous ouvrez avant l’heure, vous payez le prix que vous avez choisi.
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a href={asset('#pricing')} className="inline-flex items-center justify-center rounded-xl bg-[#ffb347] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a]">
                  Réserver, 99€
                </a>
                <a href={asset('')} className={isDark ? 'inline-flex items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/[0.06]' : 'inline-flex items-center justify-center rounded-xl border border-black/10 bg-black/[0.02] px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-black/[0.05]'}>
                  Voir la landing
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className={isDark ? 'border-t border-white/10' : 'border-t border-black/10'}>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className={isDark ? 'text-xs text-white/50' : 'text-xs text-zinc-500'}>
            © {new Date().getFullYear()} Candena. Tous droits réservés.
          </div>
        </div>
      </footer>

      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  )
}
