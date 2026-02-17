import { asset } from '../assets'

export function LogoMark({ theme, className = '' }: { theme: 'light' | 'dark'; className?: string }) {
  const src = theme === 'dark' ? asset('assets/logo-dark.svg') : asset('assets/logo-light.svg')
  return (
    <img
      src={src}
      alt="Candena"
      className={"h-8 w-8 rounded-[8px] " + className}
      width={32}
      height={32}
      decoding="async"
    />
  )
}
