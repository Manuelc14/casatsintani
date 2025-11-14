import { useId, useState } from 'react'

type FAQItem = { q: string; a: string }
type Props = {
  items?: FAQItem[]
  multipleOpen?: boolean
  className?: string
}

const defaultItems: FAQItem[] = [
  {
    q: '¿Debo internarme o puedo iniciar de forma ambulatoria?',
    a: 'Depende de la severidad, riesgos y soporte familiar. Tras la evaluación definimos la mejor modalidad y el plan individual.',
  },
  {
    q: '¿Cuánto dura el programa residencial?',
    a: 'Se estructura por fases en un horizonte de 12 meses incluyendo seguimiento post egreso.',
  },
  {
    q: '¿Cuál es el rol de la familia?',
    a: 'Participa desde el inicio en psicoeducación, talleres y sesiones clínicas; es clave en la prevención de recaídas.',
  },
  {
    q: '¿Trabajan con patología dual?',
    a: 'Sí. Coordinamos abordaje médico/psiquiátrico y psicológico para condiciones concomitantes como ansiedad, depresión o bipolaridad.',
  },
]

export default function FAQ({ items = defaultItems, multipleOpen = false, className = '' }: Props) {
  const [open, setOpen] = useState<number[]>([])
  const toggle = (idx: number) =>
    setOpen((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : multipleOpen ? [...prev, idx] : [idx],
    )

  const secId = useId()

  return (
    <div className={['grid gap-2', className].join(' ')}>
      {items.map((it, i) => {
        const isOpen = open.includes(i)
        const panelId = `${secId}-panel-${i}`
        const btnId = `${secId}-button-${i}`

        return (
          <div
            key={i}
            data-open={isOpen ? 'y' : 'n'}
            className={[
              'rounded-2xl border transition-shadow duration-200',
              'border-brand-200/80 bg-surface-50/95 dark:border-brand-800 dark:bg-brand-900/85',
              'hover:shadow-soft',
            ].join(' ')}
          >
            <button
              id={btnId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              className={[
                'flex w-full items-start gap-3 px-4 py-4 text-left md:px-5 md:py-5',
                'text-brand-900 dark:text-surface-50',
                'rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-0.5 inline-grid h-7 w-7 shrink-0 place-content-center rounded-lg',
                  'bg-brand-100 text-brand-700 dark:bg-brand-800 dark:text-surface-100',
                ].join(' ')}
              >
                <svg
                  viewBox="0 0 24 24"
                  className={[
                    'h-4 w-4 transition-transform duration-300',
                    isOpen ? 'rotate-180' : 'rotate-0',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-[15px] font-medium md:text-base">{it.q}</span>
                {/* línea/acento cuando está abierto */}
                <span
                  className={[
                    'h-0.5 w-12 rounded-full bg-gradient-to-r from-accent-500 to-brand-600',
                    'transition-all duration-300',
                    isOpen ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                />
              </div>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              data-open={isOpen ? 'y' : 'n'}
              className={[
                'grid px-4 pb-1 md:px-5',
                'transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.2,.6,.2,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-90',
              ].join(' ')}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-sm leading-relaxed text-brand-600 md:pb-5 md:text-[15px] dark:text-surface-200/80">
                  {it.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
