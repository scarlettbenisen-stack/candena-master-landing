const KEY = 'candena_guide_access'

export function grantGuideAccess(email: string) {
  const value = JSON.stringify({ email, at: Date.now() })
  localStorage.setItem(KEY, value)
}

export function hasGuideAccess(): boolean {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return typeof parsed?.email === 'string' && parsed.email.includes('@')
  } catch {
    return false
  }
}

export function getGuideEmail(): string | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return typeof parsed?.email === 'string' ? parsed.email : null
  } catch {
    return null
  }
}
