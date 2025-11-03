import { useState } from "react";

const faqs = [
    { q: "¿Cómo es el ingreso?", a: "Valoración inicial, criterios clínicos y plan personalizado." },
    { q: "¿Cuánto dura el proceso?", a: "Depende de la modalidad. Residencial por fases + seguimiento 12 meses." },
    { q: "¿La familia participa?", a: "Sí: charlas, talleres y terapia bajo solicitud; fase psicosocial con participación activa." },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <div className="mt-6 divide-y rounded-2xl border bg-white">
            {faqs.map((f, idx) => (
                <details
                    key={idx}
                    open={open === idx}
                    onToggle={(e) => (e.currentTarget.open ? setOpen(idx) : setOpen(null))}
                    className="group p-4"
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                        <span className="font-medium">{f.q}</span>
                        <span className="text-zinc-400 group-open:rotate-180 transition">⌄</span>
                    </summary>
                    <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
                </details>
            ))}
        </div>
    );
}
