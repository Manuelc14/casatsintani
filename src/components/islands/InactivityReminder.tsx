import { useEffect, useState } from "react";
import { MessageCircle, FileText, X } from "lucide-react";

const INACTIVITY_MS = 45_000;

export default function InactivityReminder() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (dismissed) return;

        let timeout: ReturnType<typeof setTimeout>;

        const resetTimer = () => {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                setVisible(true);
            }, INACTIVITY_MS);
        };

        const events = ["mousemove", "keydown", "scroll", "touchstart"];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        resetTimer();

        return () => {
            window.clearTimeout(timeout);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, [dismissed]);

    if (!visible || dismissed) return null;

    const whatsappHref =
        "https://wa.me/521234567890?text=Hola%20Casa%20Ts%C3%ADntani%2C%20quisiera%20hablar%20con%20alguien%20sobre%20tratamiento%20y%20opciones%20de%20ingreso.";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-900/70 px-4 pb-6 pt-10 backdrop-blur-sm dark:bg-brand-950/80">

            <div
                role="dialog"
                aria-modal="true"
                className="card-appear relative w-full max-w-lg overflow-hidden rounded-2xl border border-brand-200/70 bg-surface-50/95 shadow-soft ring-1 ring-surface-200/80 animate-in slide-in-from-top dark:border-brand-800 dark:bg-brand-900/95 dark:ring-brand-800/80"
            >
                {/* Barra superior de acento */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500 via-brand-600 to-accent-300" />

                <div className="flex items-start gap-4 p-5 sm:p-6">
                    {/* Icono principal */}
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-800/60 dark:text-brand-200">
                        <MessageCircle className="h-5 w-5" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-500">
                            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
                            Pausa en tu recorrido
                        </p>

                        <h2 className="text-base font-semibold tracking-tight text-brand-900 sm:text-lg dark:text-surface-50">
                            A veces pedir ayuda es el paso más difícil.
                        </h2>

                        <p className="text-sm leading-relaxed text-brand-700/90 dark:text-surface-100/80">
                            Si tú o un ser querido están luchando con adicciones o trastornos
                            emocionales, podemos orientarte sin compromiso y con total
                            confidencialidad.
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-brand-500 dark:text-surface-200/70">
                            <span className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                Atención 100% confidencial
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                                Acompañamiento humano y cercano
                            </span>
                        </div>
                    </div>

                    {/* Cerrar */}
                    <button
                        type="button"
                        onClick={() => {
                            setDismissed(true);
                            setVisible(false);
                        }}
                        className="ml-1 rounded-full p-1.5 text-brand-400 transition-all duration-[--dur-sm] ease-[--ease-out-smooth] hover:bg-brand-100 hover:text-brand-700 dark:text-surface-400 dark:hover:bg-brand-800/70"
                        aria-label="Cerrar recordatorio"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="border-t border-surface-200/80 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 dark:border-brand-800">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* CTA principal – mantiene el verde WhatsApp pero con tu motion/sombra */}
                        <a
                            href={whatsappHref}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-all duration-[--dur-sm] ease-[--ease-out-smooth] hover:-translate-y-0.5 hover:bg-[#1EB656] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-50 dark:focus-visible:ring-offset-brand-900"
                        >
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp
                        </a>

                        {/* CTA secundaria alineada al sistema de botones */}
                        <a
                            href="/docs/guia-necesito-ayuda.pdf"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-200 bg-surface-50/80 px-4 py-2.5 text-xs font-medium text-brand-700 shadow-soft transition-all duration-[--dur-sm] ease-[--ease-out-smooth] hover:-translate-y-0.5 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 dark:border-brand-700 dark:bg-brand-900/60 dark:text-surface-50 dark:hover:bg-brand-800/70"
                        >
                            <FileText className="h-4 w-4" />
                            Ver guía para identificar si necesito ayuda
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
