import { useEffect, useState } from "react";

const items = [
    {
        quote:
            "Aquí no solo dejé de consumir, volví a vivir. Acompañamiento real y humano.",
        author: "J.L., egresado",
    },
    {
        quote:
            "Aprendimos a entender la adicción y a sanar juntos como familia.",
        author: "M.C., madre",
    },
    {
        quote:
            "Equipo interdisciplinario que se involucra de verdad. Recuperé mi dignidad.",
        author: "A.R., en seguimiento",
    },
];

export default function TestimonialCarousel() {
    const [i, setI] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setI((v) => (v + 1) % items.length), 4000);
        return () => clearInterval(id);
    }, []);
    const { quote, author } = items[i];

    return (
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow relative overflow-hidden">
            <p className="italic text-lg">“{quote}”</p>
            <p className="mt-3 text-sm text-zinc-600">— {author}</p>
        </div>
    );
}
