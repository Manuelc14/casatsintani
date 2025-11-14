import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";
import {
    Wine,
    Leaf,
    Activity,
    Pill,
    Gamepad2,
    Brain,
    Sparkles,
    HeartPulse,
} from "lucide-react";

type Treatment = {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const treatments: Treatment[] = [
    {
        title: "Alcohol",
        description:
            "Evaluación clínica, desintoxicación y acompañamiento para restablecer el equilibrio físico y emocional.",
        icon: Wine,
    },
    {
        title: "Marihuana",
        description:
            "Plan personalizado para consumo problemático, regulación emocional y prevención de recaídas.",
        icon: Leaf,
    },
    {
        title: "Cocaína y estimulantes",
        description: "Abordaje médico y terapéutico para dependencia a estimulantes.",
        icon: Activity,
    },
    {
        title: "Benzodiacepinas",
        description:
            "Supervisión médica en el retiro gradual y contención para ansiedad e insomnio.",
        icon: Pill,
    },
    {
        title: "Medicamentos prescritos",
        description: "Uso compulsivo de fármacos controlados con enfoque integral.",
        icon: Sparkles,
    },
    {
        title: "Opioides",
        description:
            "Tratamiento para dependencia, dolor crónico y manejo de abstinencia.",
        icon: HeartPulse,
    },
    {
        title: "Adicciones conductuales",
        description:
            "Juego, apuestas, compras, pantallas y otras conductas adictivas.",
        icon: Gamepad2,
    },
    {
        title: "Trastornos duales",
        description:
            "Atención a adicciones + depresión, ansiedad, bipolaridad u otros diagnósticos.",
        icon: Brain,
    },
];

const BASE_SPEED = 0.8;
const HOVER_SPEED = 0.2;

export default function Carousel() {
    const items = [...treatments, ...treatments];

    const containerRef = useRef<HTMLDivElement | null>(null);
    const isDragging = useRef(false);
    const isInteracting = useRef(false);
    const isHovering = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let frameId: number;

        const step = () => {
            const el = containerRef.current;
            if (!el) return;

            if (!isInteracting.current && el.scrollWidth > el.clientWidth) {
                const speed = isHovering.current ? HOVER_SPEED : BASE_SPEED;
                el.scrollLeft += speed;

                const maxScroll = el.scrollWidth - el.clientWidth;
                if (el.scrollLeft >= maxScroll - 1) {
                    el.scrollLeft = 0;
                }
            }

            frameId = window.requestAnimationFrame(step);
        };

        frameId = window.requestAnimationFrame(step);
        return () => window.cancelAnimationFrame(frameId);
    }, []);

    const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        isDragging.current = true;
        isInteracting.current = true;
        startX.current = e.clientX;
        startScrollLeft.current = container.scrollLeft;
        container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container || !isDragging.current) return;

        const dx = e.clientX - startX.current;
        container.scrollLeft = startScrollLeft.current - dx;
    };

    const endInteraction = (e: PointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (container) {
            try {
                container.releasePointerCapture(e.pointerId);
            } catch { }
        }
        isDragging.current = false;
        isInteracting.current = false;
    };

    const handleMouseEnter = () => {
        isHovering.current = true;
    };

    const handleMouseLeave = () => {
        isHovering.current = false;
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-x-scroll no-scrollbar cursor-grab active:cursor-grabbing coverflow-perspective"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endInteraction}
            onPointerLeave={(e) => {
                endInteraction(e);
                handleMouseLeave();
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex gap-4 py-3 px-2 sm:px-4 md:px-6">
                {items.map(({ title, description, icon: Icon }, index) => (
                    <article
                        key={`${title}-${index}`}
                        className="shadow-soft min-w-[260px] sm:min-w-[320px] max-w-sm flex-shrink-0 rounded-2xl border border-zinc-200 bg-white p-5 text-left ring-1 ring-zinc-100 transition-all duration-300 card-appear card-3d dark:border-zinc-800 dark:bg-zinc-900/70"
                        style={{ animationDelay: `${index * 70}ms` }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-500 shadow-sm dark:bg-accent-500/20 dark:text-accent-300">
                                <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                {title}
                            </h3>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {description}
                        </p>
                    </article>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-surface-50/95 to-transparent dark:from-brand-900/95" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-surface-50/95 to-transparent dark:from-brand-900/95" />
        </div>
    );
}
