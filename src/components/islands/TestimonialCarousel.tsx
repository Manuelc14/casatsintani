import { useEffect, useState } from "react";

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
    useEffect(() => {
        const id = setInterval(() => setI((v) => (v + 1) % items.length), 5000);
        return () => clearInterval(id);
    }, []);
    const { quote, author } = items[i];

    return (
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-6 shadow-soft backdrop-blur transition-colors duration-300">
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('/noise.png')] bg-cover"></div>
            <svg
                viewBox="0 0 24 24"
                className="absolute -top-4 -left-4 h-12 w-12 text-amber-400/40 dark:text-amber-300/20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M9.17 6A6 6 0 0 0 3 12v6h8v-6H7.83A4 4 0 0 1 9.17 6zm10 0A6 6 0 0 0 13 12v6h8v-6h-3.17A4 4 0 0 1 19.17 6z" />
            </svg>

            <p className="relative italic text-lg text-zinc-800 dark:text-zinc-100 transition-opacity duration-700 ease-out animate-fade">
                “{quote}”
            </p>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">— {author}</p>

            <div className="mt-4 flex justify-center gap-2">
                {items.map((_, j) => (
                    <button
                        key={j}
                        onClick={() => setI(j)}
                        aria-label={`Ir al testimonio ${j + 1}`}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${j === i
                                ? "bg-amber-500 dark:bg-amber-400 scale-110"
                                : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
