import { useEffect, useRef, useState } from "react";

const items = [
    {
        quote: "Aquí no solo dejé de consumir, volví a vivir. Acompañamiento real y humano.",
        author: "J.L., egresado",
    },
    {
        quote: "Aprendimos a entender la adicción y a sanar juntos como familia.",
        author: "M.C., madre",
    },
    {
        quote: "Equipo interdisciplinario que se involucra de verdad. Recuperé mi dignidad.",
        author: "A.R., en seguimiento",
    },
];

export default function TestimonialCarousel() {
    const [i, setI] = useState(0);
    const [dir, setDir] = useState(0);
    const touchStart = useRef(null);

    // Auto-rotación cada 6s
    useEffect(() => {
        const id = setInterval(() => handleNext(1), 6000);
        return () => clearInterval(id);
    }, []);

    const handleNext = (step) => {
        setDir(step);
        setI((v) => (v + step + items.length) % items.length);
    };

    // Gestos táctiles / arrastre
    const handleTouchStart = (e) => {
        touchStart.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
        if (!touchStart.current) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 60) handleNext(delta > 0 ? -1 : 1);
        touchStart.current = null;
    };

    return (
        <div
            className="relative mt-8 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-soft backdrop-blur-md p-8 transition-all duration-500 hover:shadow-lg select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="absolute inset-0 pointer-events-none" />

            {/* Contenido animado */}
            <div
                key={i}
                className={`relative transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${dir > 0 ? "animate-slide-left" : dir < 0 ? "animate-slide-right" : ""
                    }`}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="absolute -top-5 -left-4 h-12 w-12 text-accent-600 dark:text-accent-500"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M9.17 6A6 6 0 0 0 3 12v6h8v-6H7.83A4 4 0 0 1 9.17 6zm10 0A6 6 0 0 0 13 12v6h8v-6h-3.17A4 4 0 0 1 19.17 6z" />
                </svg>

                <p className="relative italic text-lg md:text-xl text-zinc-800 dark:text-zinc-100">
                    “{items[i].quote}”
                </p>
                <p className="mt-4 text-sm text-brand-700 dark:text-brand-300 font-medium">
                    — {items[i].author}
                </p>
            </div>

            {/* Controles */}
            <div className="mt-6 flex justify-center items-center gap-4">
                <button
                    onClick={() => handleNext(-1)}
                    aria-label="Anterior"
                    className="rounded-full p-2 hover:bg-brand-100 dark:hover:bg-brand-900/40 transition"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-brand-600 dark:text-brand-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className="flex gap-2">
                    {items.map((_, j) => (
                        <button
                            key={j}
                            onClick={() => setI(j)}
                            aria-label={`Ir al testimonio ${j + 1}`}
                            className={`h-2.5 w-2.5 rounded-full transition-all ${j === i
                                    ? "bg-brand-600 dark:bg-brand-400 scale-125"
                                    : "bg-brand-200 dark:bg-brand-800 hover:bg-brand-300 dark:hover:bg-brand-700"
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => handleNext(1)}
                    aria-label="Siguiente"
                    className="rounded-full p-2 hover:bg-brand-100 dark:hover:bg-brand-900/40 transition"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 text-brand-600 dark:text-brand-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
