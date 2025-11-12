import { motion } from "framer-motion";
import React, { Children } from "react";
import type { ReactNode } from "react";

type Props = {
    children?: ReactNode;
    className?: string;
    step?: number;
    delay?: number;
};

export default function Stagger({
    children,
    className,
    step = 0.06,
    delay = 0,
}: Props) {
    const items = Children.toArray(children);

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
                hidden: { opacity: 1 },
                show: {
                    opacity: 1,
                    transition: { staggerChildren: step, delayChildren: delay },
                },
            }}
        >
            {items.map((child, i) => (
                <motion.div
                    key={i}
                    variants={{
                        hidden: { opacity: 0, y: 14 },
                        show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
                        },
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}
