import { motion } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
}

export default function MicroButton({ children, className = '', ...rest }: Props) {
  return (
    <motion.button
      whileHover={{ y: -2, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className={`btn-primary rounded-2xl ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
