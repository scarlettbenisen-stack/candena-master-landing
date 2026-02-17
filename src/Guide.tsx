import { useEffect, useState } from 'react'
import { hasGuideAccess } from './gate'
import { GuideGate } from './components/GuideGate'
import { motion } from 'framer-motion'
import './index.css'
import { applyTheme, getInitialTheme, type Theme } from './theme'
import { ThemeToggle } from './components/ThemeToggle'
import { MobileMenu } from './components/MobileMenu'
import { LogoMark } from './components/LogoMark'
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
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    setAllowed(hasGuideAccess())
  }, [])

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
            <LogoMark theme={isDark ? 'dark' : 'light'} />
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
          {!allowed ? (
            <div className="grid gap-4">
              <div className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-600'}>
                Pour accéder au guide complet, merci de saisir votre email.
              </div>
              <GuideGate
                isDark={isDark}
                onSuccess={() => {
                  setAllowed(true)
                  // Jump to content
                  setTimeout(() => {
                    document.getElementById('contenu')?.scrollIntoView({ behavior: 'smooth' })
                  }, 50)
                }}
              />
            </div>
          ) : (
          <article className={isDark ? 'text-white/85' : 'text-zinc-800'}>

            <h2 className={isDark ? 'text-2xl font-semibold text-white' : 'text-2xl font-semibold text-zinc-900'}>
              Candena : l’ultime outil pour en finir avec vos mauvaises habitudes
            </h2>
            <p className={isDark ? 'mt-2 text-sm text-white/60' : 'mt-2 text-sm text-zinc-500'}>
              Basé sur l’économie comportementale et le principe d’engagement anticipé.
            </p>

            <div className="mt-8 grid gap-6 leading-relaxed">
              {/* Key callouts */}
              <div className={isDark ? 'rounded-xl border border-[#ffb347]/25 bg-white/[0.06] p-5' : 'rounded-xl border border-[#ffb347]/25 bg-black/[0.04] p-5'}>
                <div className={isDark ? 'text-sm font-medium text-white' : 'text-sm font-medium text-zinc-900'}>À retenir</div>
                <div className={isDark ? 'mt-2 grid gap-2 text-sm text-white/75' : 'mt-2 grid gap-2 text-sm text-zinc-700'}>
                  <div>• Le problème n’est pas votre “force mentale”. C’est le moment où la décision est prise.</div>
                  <div>• Un bon système réduit les négociations, surtout quand vous êtes fatigué.</div>
                  <div>• L’engagement anticipé transforme une impulsion en décision consciente.</div>
                </div>
              </div>
              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Pourquoi trahissez-vous vos meilleures intentions ?
                </h3>
                <p>
                  Chaque fois que vous promettez « c’est la dernière fois » puis cédez à nouveau, vous ne manquez pas de volonté. Vous vivez un conflit cognitif bien documenté par la recherche en économie comportementale.
                </p>
                <p>
                  Les travaux universitaires (souvent présentés sous l’angle du <span className="font-medium">biais du présent</span>) montrent que votre cerveau a tendance à surévaluer les bénéfices immédiats et à sous-estimer les bénéfices futurs. Sur le moment, l’envie est simple, concrète, presque physique. Le bénéfice à long terme, lui, est abstrait.
                </p>
                <div className={isDark ? 'rounded-xl border border-white/[0.10] bg-white/[0.04] p-5 text-sm text-white/70' : 'rounded-xl border border-black/10 bg-black/[0.03] p-5 text-sm text-zinc-700'}>
                  <div className={isDark ? 'font-medium text-white' : 'font-medium text-zinc-900'}>Insight clé</div>
                  <p className="mt-2">
                    Quand une tentation “gagne”, ce n’est pas parce qu’elle est plus importante. C’est parce qu’elle est plus proche. Un système efficace rapproche vos bonnes décisions.
                  </p>
                </div>
                <p>
                  C’est la raison pour laquelle tant de personnes échouent rapidement lorsqu’elles tentent de changer. Une donnée souvent citée (2023) évoque <span className="font-medium">78%</span> d’échec dans les trois premiers mois. Prenez-la comme un signal, pas comme une fatalité : ce n’est pas une question de valeur personnelle. C’est une question de système.
                </p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Le coût réel de vos promesses brisées
                </h3>
                <p>
                  Au-delà du temps et de l’argent, il y a un coût plus discret : la confiance en vous. Chaque promesse rompue envoie un message simple à votre cerveau : « je ne peux pas compter sur moi ».
                </p>
                <p>
                  Ce coût d’intégrité est cumulatif. Un écart isolé n’est pas dramatique. Mais des écarts répétés construisent une identité involontaire : vous finissez par vous voir comme quelqu’un qui « craque toujours ». Et ce regard sur vous-même peut déborder sur le sommeil, le travail, les relations.
                </p>
                <p>
                  Les données comportementales agrégées (2024) suggèrent une idée utile : les personnes qui changent durablement ne sont pas forcément plus disciplinées. Elles sont meilleures pour <span className="font-medium">designer leur environnement</span>. Autrement dit, elles réduisent la friction vers les bonnes décisions et augmentent la friction vers les mauvaises.
                </p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  La limite cognitive de la volonté
                </h3>
                <p>
                  Votre volonté fonctionne comme un muscle : elle se fatigue avec l’usage. Les travaux sur la <span className="font-medium">fatigue décisionnelle</span> (Baumeister, 2022) décrivent un mécanisme simple : après une journée pleine de choix, votre capacité à résister diminue.
                </p>
                <p>
                  Dans ces moments, le cortex préfrontal (pilotage rationnel, contrôle inhibiteur) est moins disponible. Et votre cerveau bascule vers des circuits plus rapides, orientés récompense. C’est là que surgissent les phrases que vous connaissez déjà : « juste cette fois », « je le mérite », « ça ne compte pas ».
                </p>
                <p>
                  Compter uniquement sur « plus de volonté » revient donc à miser sur une ressource limitée, au moment où vous en avez le moins. Ce n’est pas une faute. C’est une contrainte.
                </p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  La solution : externaliser la discipline
                </h3>
                <p>
                  Candena agit comme un allié externe. Vous prenez les décisions quand vous êtes lucide. Ensuite, Candena applique vos règles à votre place, précisément au moment où l’envie arrive.
                </p>
                <p>
                  Le principe est connu en économie comportementale : le <span className="font-medium">pre-commitment</span> (engagement préalable). Vous vous engagez maintenant pour protéger votre décision future. En pratique, vous réduisez les négociations avec vous-même et vous libérez de l’énergie mentale pour le reste.
                </p>
                <p>
                  Une formulation utile pour comprendre Candena : vous ne vous empêchez pas d’ouvrir. Vous rendez l’ouverture anticipée <span className="font-medium">consciente</span>. Si vous choisissez un montant (par exemple 5€, 10€, 50€ ou 100€), l’écart devient une décision, pas un réflexe. Et une partie est reversée à une association de lutte contre les addictions que vous aurez choisie.
                </p>
                <p>
                  L’intérêt de ce mécanisme n’est pas de vous mettre la pression. C’est de créer une micro-pause entre l’impulsion et l’action. Cette pause est souvent suffisante pour que votre décision “à tête reposée” reprenne de la place. Dans beaucoup de cas, vous n’avez pas besoin d’un mur. Vous avez besoin d’une seconde chance.
                </p>
                <p>
                  Concrètement, vous pouvez calibrer votre engagement : un montant bas pour commencer, puis plus élevé si vous voyez que “l’ouverture facile” devient un automatisme. L’important est que le choix vous appartienne. Candena n’impose pas une morale. Il rend votre règle exécutable.
                </p>
                <p>
                  Des études rapportent que les personnes utilisant des dispositifs d’engagement préalable sont significativement plus susceptibles de tenir leurs objectifs à long terme que celles qui comptent uniquement sur leur volonté. Là encore, gardez l’idée centrale : ce qui marche n’est pas la culpabilité, c’est la structure.
                </p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Votre plan d’action en 3 étapes concrètes
                </h3>
                <ol className={isDark ? 'list-decimal pl-5 text-white/85' : 'list-decimal pl-5 text-zinc-800'}>
                  <li className="mt-2">
                    <span className="font-medium">Identifiez votre habitude principale.</span> Commencez par une habitude spécifique plutôt qu’une intention vague. « Réduire mon temps sur mon téléphone » est flou. « Verrouiller mon téléphone de 21h à 7h » est mesurable.
                  </li>
                  <li className="mt-2">
                    <span className="font-medium">Définissez des règles claires et précises.</span> Les règles doivent éliminer l’ambiguïté. Au lieu de « moins de vapotage », essayez « pas de vape avant 18h en semaine ». Vous n’avez pas besoin de règles parfaites, vous avez besoin de règles nettes.
                  </li>
                  <li className="mt-2">
                    <span className="font-medium">Préparez votre environnement pour le succès.</span> Rendez les bonnes habitudes faciles et les mauvaises difficiles. Placez votre téléphone dans Candena avant de vous coucher, plutôt que de le garder à portée de main.
                  </li>
                </ol>

                <div className={isDark ? 'mt-4 rounded-xl border border-white/[0.10] bg-white/[0.04] p-5 text-sm text-white/70' : 'mt-4 rounded-xl border border-black/10 bg-black/[0.03] p-5 text-sm text-zinc-700'}>
                  <div className={isDark ? 'font-medium text-white' : 'font-medium text-zinc-900'}>Mini exercice (2 minutes)</div>
                  <p className="mt-2">
                    Notez une seule règle qui vous ferait gagner demain soir. Une règle, pas une résolution. Exemple : « Pas de téléphone après 22h ». Puis décidez quand vous la mettez en place (ce soir, avant de dîner).
                  </p>
                </div>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Stratégies de suivi et d’ajustement
                </h3>
                <p>
                  La constance dans le suivi est cruciale. Regardez les patterns plutôt que les “erreurs”. À quelles heures craquez-vous le plus souvent ? Quand vous êtes fatigué ? Quand vous êtes seul ? Après une journée stressante ?
                </p>
                <p>
                  Ajustez ensuite vos règles. Si vous remarquez que vous ouvrez systématiquement à 23h, ne concluez pas « je suis nul ». Concluez : « la règle est trop ambitieuse pour mon niveau d’énergie à 23h ». Vous pouvez déplacer la plage, ajouter un délai, ou ajuster le montant de l’ouverture anticipée.
                </p>
                <p>
                  Vous pouvez aussi vous créer un filet de sécurité : une règle “normale” et une règle “journée difficile”. Exemple : en semaine, verrouillage à 22h. Les jours de surcharge, verrouillage à 21h. L’idée n’est pas d’être plus dur. C’est d’être plus réaliste.
                </p>
                <p>
                  Enfin, mesurez un indicateur simple, une fois par semaine. Pas dix. Un seul. Par exemple : nombre d’ouvertures anticipées, ou nombre de soirées sans téléphone après 22h. Un indicateur clair vous aide à progresser sans vous perdre.
                </p>
                <p>
                  L’objectif n’est pas la perfection. C’est le progrès. Chaque semaine où la boîte reste fermée un peu plus souvent reconstruit la confiance, et rend la prochaine décision plus facile.
                </p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Conclusion : reprendre le contrôle de façon durable
                </h3>
                <p>
                  Candena n’est pas une solution magique. C’est un outil qui vous aide à aligner vos actions avec vos intentions profondes. En externalisant une partie de la discipline, vous créez l’espace nécessaire pour que votre moi futur prenne le dessus sur l’impulsion du moment.
                </p>
                <p>
                  Commencez dès aujourd’hui avec une seule habitude. Chaque petit succès construit la confiance nécessaire pour aborder des changements plus ambitieux. Votre futur vous remerciera, non pas pour une performance parfaite, mais pour un système simple qui tient quand vous êtes fatigué.
                </p>
                <p>
                  Si vous deviez retenir une seule idée, ce serait celle-ci : vous n’avez pas besoin d’être “plus fort”. Vous avez besoin de décisions prises au bon moment, et d’un environnement qui les respecte. C’est exactement ce que fait un bon système.
                </p>
              </section>

              <section className="grid gap-3">
                <h3 className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-zinc-900'}>
                  Sources et études (liens)
                </h3>
                <p className={isDark ? 'text-sm text-white/70' : 'text-sm text-zinc-600'}>
                  Pour éviter les références vagues, voici des liens vers des synthèses lisibles et vers des articles académiques (via Google Scholar).
                </p>

                <div className={isDark ? 'rounded-xl border border-white/[0.10] bg-white/[0.04] p-5' : 'rounded-xl border border-black/10 bg-black/[0.03] p-5'}>
                  <div className={isDark ? 'text-sm font-medium text-white' : 'text-sm font-medium text-zinc-900'}>Synthèses accessibles</div>
                  <ul className={isDark ? 'mt-3 list-disc pl-5 text-sm text-white/80' : 'mt-3 list-disc pl-5 text-sm text-zinc-700'}>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/" target="_blank" rel="noreferrer">
                        BehavioralEconomics.com (mini-encyclopédie)
                      </a>
                    </li>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://en.wikipedia.org/wiki/Present_bias" target="_blank" rel="noreferrer">
                        Biais du présent (présentation)
                      </a>
                    </li>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://en.wikipedia.org/wiki/Decision_fatigue" target="_blank" rel="noreferrer">
                        Fatigue décisionnelle (présentation)
                      </a>
                    </li>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://en.wikipedia.org/wiki/Commitment_device" target="_blank" rel="noreferrer">
                        Dispositifs d’engagement (présentation)
                      </a>
                    </li>
                  </ul>
                </div>

                <div className={isDark ? 'rounded-xl border border-white/[0.10] bg-white/[0.04] p-5' : 'rounded-xl border border-black/10 bg-black/[0.03] p-5'}>
                  <div className={isDark ? 'text-sm font-medium text-white' : 'text-sm font-medium text-zinc-900'}>Études (Google Scholar)</div>
                  <ul className={isDark ? 'mt-3 list-disc pl-5 text-sm text-white/80' : 'mt-3 list-disc pl-5 text-sm text-zinc-700'}>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://scholar.google.com/scholar?q=Laibson+Golden+Eggs+and+Hyperbolic+Discounting" target="_blank" rel="noreferrer">
                        Laibson (1997) — Golden Eggs and Hyperbolic Discounting
                      </a>
                      <span className={isDark ? 'text-white/60' : 'text-zinc-500'}> (biais du présent / hyperbolic discounting)</span>
                    </li>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://scholar.google.com/scholar?q=O%27Donoghue+Rabin+Doing+It+Now+or+Later" target="_blank" rel="noreferrer">
                        O’Donoghue & Rabin (1999) — Doing It Now or Later
                      </a>
                      <span className={isDark ? 'text-white/60' : 'text-zinc-500'}> (present bias / procrastination)</span>
                    </li>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://scholar.google.com/scholar?q=Ariely+Wertenbroch+Procrastination+Deadlines+and+Performance" target="_blank" rel="noreferrer">
                        Ariely & Wertenbroch (2002) — Procrastination, Deadlines, and Performance
                      </a>
                      <span className={isDark ? 'text-white/60' : 'text-zinc-500'}> (engagement par contraintes / pré-commitment)</span>
                    </li>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://scholar.google.com/scholar?q=Vohs+Baumeister+Schmeichel+Making+Choices+Impairs+Subsequent+Self-Control" target="_blank" rel="noreferrer">
                        Vohs et al. (2008) — Making Choices Impairs Subsequent Self-Control
                      </a>
                      <span className={isDark ? 'text-white/60' : 'text-zinc-500'}> (fatigue décisionnelle)</span>
                    </li>
                    <li className="mt-2">
                      <a className={isDark ? 'underline decoration-white/20 underline-offset-4 hover:decoration-white/40' : 'underline decoration-black/20 underline-offset-4 hover:decoration-black/40'} href="https://scholar.google.com/scholar?q=Gine+Karlan+Zinman+Put+Your+Money+Where+Your+Butt+Is" target="_blank" rel="noreferrer">
                        Giné, Karlan & Zinman (2010) — Put Your Money Where Your Butt Is
                      </a>
                      <span className={isDark ? 'text-white/60' : 'text-zinc-500'}> (contrats d’engagement / addictions)</span>
                    </li>
                  </ul>
                </div>

                <div className={isDark ? 'rounded-xl border border-white/[0.10] bg-white/[0.04] p-5 text-sm text-white/70' : 'rounded-xl border border-black/10 bg-black/[0.03] p-5 text-sm text-zinc-700'}>
                  <div className={isDark ? 'font-medium text-white' : 'font-medium text-zinc-900'}>Note</div>
                  <p className="mt-2">
                    Les chiffres précis peuvent varier selon les études et les définitions. Le mécanisme, lui, est constant : le timing des décisions et l’environnement pèsent souvent plus que la motivation.
                  </p>
                </div>
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
          )}
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
