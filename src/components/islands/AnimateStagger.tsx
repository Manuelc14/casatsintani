import { useEffect, useRef, useState } from 'react'

export default function AnimateStagger({
  as: Tag = 'div',
  children,
  className = '',
  threshold = 0.14,
  gap = 40, // ms entre hijos
}: any) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true)
            io.disconnect()
          }
        })
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return (
    <Tag ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((ch, i) => (
            <div
              key={i}
              style={{ animationDelay: `${i * gap}ms` }}
              className={[
                'will-change-transform',
                'transition-all duration-500 ease-[--ease-out-smooth]',
                seen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
              ].join(' ')}
            >
              {ch}
            </div>
          ))
        : children}
    </Tag>
  )
}
