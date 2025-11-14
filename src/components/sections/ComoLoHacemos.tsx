
import { Stethoscope, PencilLine, Handshake } from 'lucide-react'
import AnimateOnView from '../islands/AnimateOnView'
import Stagger from '../islands/Stagger'

const pasos = [
  {
    num: '01',
    title: 'Evaluamos tu caso',
    desc: 'Comenzamos con una valoración integral física, psicológica y familiar para entender tus necesidades reales.',
    img: '/assets/evaluamos2.jpg',
    icon: Stethoscope,
  },
  {
    num: '02',
    title: 'Diseñamos tu plan',
    desc: 'Creamos un programa de tratamiento personalizado, equilibrando evidencia científica y acompañamiento humano.',
    img: '/assets/evaluamos1.jpg',
    icon: PencilLine,
  },
  {
    num: '03',
    title: 'Acompañamos tu proceso',
    desc: 'Nuestro equipo interdisciplinario te acompaña durante la rehabilitación y seguimiento posterior de 12 meses.',
    img: '/assets/evaluamos4.jpg',
    icon: Handshake,
  },
]

export default function ComoLoHacemos() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6 text-center xl:max-w-7xl">
        <h2 className="mb-12 text-3xl font-semibold font-display text-brand-900 dark:text-surface-50 md:text-4xl">
          Cómo lo hacemos
        </h2>

        <AnimateOnView>
          <Stagger className="grid gap-6 text-left md:grid-cols-3 xl:gap-8">
            {pasos.map((p) => {
              const Icon = p.icon
              return (
                <article
                  key={p.num}
                  className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-[--dur-md] ease-[--ease-out-smooth] hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/60"
                >
                  <figure className="overflow-hidden">
                    <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] 2xl:aspect-[32/9]">
                      <img
                        src={p.img}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                        width={1600}
                        height={900}
                      />
                    </div>
                  </figure>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-700 shadow-sm dark:bg-brand-900/40 dark:text-brand-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="select-none font-display text-3xl font-bold text-brand-300 dark:text-brand-400/80">
                        {p.num}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold text-brand-800 dark:text-brand-200 md:text-xl">
                      {p.title}
                    </h3>
                    <p className="leading-relaxed text-brand-700/90 dark:text-brand-300">
                      {p.desc}
                    </p>
                  </div>
                </article>
              )
            })}
          </Stagger>
        </AnimateOnView>
      </div>
    </section>
  )
}
