import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const items = [
  {
    quote: 'Aquí no solo dejé de consumir, volví a vivir. Acompañamiento real y humano.',
    author: 'J.L., egresado',
  },
  {
    quote: 'Aprendimos a entender la adicción y a sanar juntos como familia.',
    author: 'M.C., madre',
  },
  {
    quote: 'Equipo interdisciplinario que se involucra de verdad. Recuperé mi dignidad.',
    author: 'A.R., en seguimiento',
  },
]

export default function TestimonialCarousel() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(0)
  const touchStart = useRef(null)

  useEffect(() => {
    const id = setInterval(() => handleNext(1), 6000)
    return () => clearInterval(id)
  }, [])

  const handleNext = (step) => {
    setDir(step)
    setI((v) => (v + step + items.length) % items.length)
  }

  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 60) handleNext(delta > 0 ? -1 : 1)
    touchStart.current = null
  }

  return (
    <div
      className="shadow-soft relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/80 p-10 backdrop-blur-md transition-all duration-500 dark:border-zinc-800 dark:bg-brand-900/70 hover:shadow-xl"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        key={i}
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${dir > 0 ? 'animate-slide-left' : dir < 0 ? 'animate-slide-right' : ''
          }`}
      >
        <Quote className="absolute -top-6 -left-4 h-12 w-12 text-accent-500 dark:text-accent-300" />

        <p className="relative text-lg italic text-zinc-800 md:text-xl dark:text-zinc-100">
          “{items[i].quote}”
        </p>

        <p className="mt-4 text-sm font-medium text-brand-700 dark:text-brand-300">
          — {items[i].author}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">

        <button
          onClick={() => handleNext(-1)}
          aria-label="Anterior"
          className="rounded-full bg-brand-50 p-2 text-brand-700 transition hover:bg-brand-100 dark:bg-brand-800/40 dark:text-brand-200 dark:hover:bg-brand-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2">
          {items.map((_, j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              aria-label={`Ir al testimonio ${j + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${j === i
                  ? 'scale-125 bg-accent-500 dark:bg-accent-300'
                  : 'bg-brand-200 dark:bg-brand-800 hover:bg-brand-300 dark:hover:bg-brand-700'
                }`}
            />
          ))}
        </div>

        <button
          onClick={() => handleNext(1)}
          aria-label="Siguiente"
          className="rounded-full bg-brand-50 p-2 text-brand-700 transition hover:bg-brand-100 dark:bg-brand-800/40 dark:text-brand-200 dark:hover:bg-brand-800"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

      </div>
    </div>
  )
}
