export function asset(path: string) {
  const p = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${p}`
}
