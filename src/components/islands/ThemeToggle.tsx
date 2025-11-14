import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    setMounted(true)
    const html = document.documentElement
    html.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  if (!mounted) return null

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label="Cambiar tema"
      className="grid place-items-center rounded-xl border border-zinc-200 p-2 text-zinc-700 transition-colors dark:border-zinc-600 dark:text-zinc-200"
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
