export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'candena-theme'

export function getInitialTheme(): Theme {
  const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null)
  if (saved === 'light' || saved === 'dark') return saved
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
  return prefersDark ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.toggle('dark', theme === 'dark')
  localStorage.setItem(STORAGE_KEY, theme)
}
