import { useMemo, useState } from 'react'
import { grantGuideAccess } from '../gate'

export function GuideGate({
  isDark,
  onSuccess,
  title = 'Accéder au guide',
  subtitle = 'Saisissez votre email pour débloquer le guide.',
}: {
  isDark: boolean
  onSuccess: () => void
  title?: string
  subtitle?: string
}) {
  const [email, setEmail] = useState('')
  const isValid = useMemo(() => /.+@.+\..+/.test(email.trim()), [email])

  return (
    <div className={isDark ? 'rounded-xl border border-white/[0.10] bg-white/[0.06] p-5' : 'rounded-xl border border-black/10 bg-black/[0.04] p-5'}>
      <div className={isDark ? 'text-base font-semibold text-white' : 'text-base font-semibold text-zinc-900'}>{title}</div>
      <div className={isDark ? 'mt-2 text-sm text-white/70' : 'mt-2 text-sm text-zinc-600'}>{subtitle}</div>

      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault()
          if (!isValid) return
          grantGuideAccess(email.trim())
          onSuccess()
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          disabled={!isValid}
          className={
            (!isValid ? 'opacity-60 ' : '') +
            'h-11 rounded-lg bg-[#ffb347] px-5 text-sm font-semibold text-black transition-colors hover:bg-[#ffc06a]'
          }
        >
          Débloquer
        </button>
      </form>

      <div className={isDark ? 'mt-3 text-xs text-white/55' : 'mt-3 text-xs text-zinc-500'}>
        Nous n’utilisons pas votre email pour du spam. Désinscription en 1 clic.
      </div>
    </div>
  )
}
