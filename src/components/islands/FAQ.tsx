import { useId, useState } from "react";

type FAQItem = { q: string; a: string };
type Props = {
    items?: FAQItem[];
    multipleOpen?: boolean;
    className?: string;
};

const defaultItems: FAQItem[] = [
    {
        q: "¿Debo internarme o puedo iniciar de forma ambulatoria?",
        a: "Depende de la severidad, riesgos y soporte familiar. Tras la evaluación definimos la mejor modalidad y el plan individual.",
    },
    {
        q: "¿Cuánto dura el programa residencial?",
        a: "Se estructura por fases en un horizonte de 12 meses incluyendo seguimiento post egreso.",
    },
    {
        q: "¿Cuál es el rol de la familia?",
        a: "Participa desde el inicio en psicoeducación, talleres y sesiones clínicas; es clave en la prevención de recaídas.",
    },
    {
        q: "¿Trabajan con patología dual?",
        a: "Sí. Coordinamos abordaje médico/psiquiátrico y psicológico para condiciones concomitantes como ansiedad, depresión o bipolaridad.",
    },
];

export default function FAQ({
    items = defaultItems,
    multipleOpen = false,
    className = "",
}: Props) {
    const [open, setOpen] = useState<number[]>([]);
    const toggle = (idx: number) =>
        setOpen((prev) =>
            prev.includes(idx)
                ? prev.filter((i) => i !== idx)
                : multipleOpen
                    ? [...prev, idx]
                    : [idx]
        );

    const secId = useId();

    return (
        <div className={["grid gap-2", className].join(" ")}>
            {items.map((it, i) => {
                const isOpen = open.includes(i);
                const panelId = `${secId}-panel-${i}`;
                const btnId = `${secId}-button-${i}`;
                return (
                    <div
                        key={i}
                        data-open={isOpen ? "y" : "n"}
                        className={[
                            "rounded-2xl border",
                            "border-zinc-200 dark:border-zinc-800",
                            "bg-white/60 dark:bg-zinc-900/60",
                            "transition-shadow hover:shadow-sm",
                        ].join(" ")}
                    >
                        <button
                            id={btnId}
                            aria-controls={panelId}
                            aria-expanded={isOpen}
                            onClick={() => toggle(i)}
                            className={[
                                "w-full px-4 md:px-5 py-4 md:py-5",
                                "flex items-start gap-3 text-left",
                                "text-brand-800 dark:text-brand-200",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "mt-0.5 inline-grid h-7 w-7 shrink-0 place-content-center rounded-lg",
                                    "bg-brand-100 dark:bg-brand-900/40",
                                    "text-brand-700 dark:text-brand-300",
                                ].join(" ")}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className={[
                                        "h-4 w-4 transition-transform duration-300",
                                        isOpen ? "rotate-180" : "rotate-0",
                                    ].join(" ")}
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
                            <span className="text-[15px] md:text-base font-medium">
                                {it.q}
                            </span>
                        </button>

                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={btnId}
                            data-open={isOpen ? "y" : "n"}
                            className={[
                                "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(.2,.6,.2,1)]",
                                "px-4 md:px-5",
                                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-90",
                            ].join(" ")}
                        >
                            <div className="overflow-hidden">
                                <div className="pb-4 md:pb-5 text-sm md:text-[15px] leading-relaxed text-brand-600 dark:text-brand-300">
                                    {it.a}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
