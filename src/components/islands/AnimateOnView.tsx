import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

type Props = {
  children: ReactNode
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: CSSProperties
  offsetY?: number
  duration?: number
  once?: boolean
}

export default function AnimateOnView({
  children,
  as: Tag = 'div',
  className,
  style,
  offsetY = 16,
  duration = 0.28,
  once = true,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10%' }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
      as={Tag}
    >
      {children}
    </motion.div>
  )
}
