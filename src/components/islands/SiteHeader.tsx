import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type Link = { href: string; label: string };
const links: Link[] = [
    { href: "/nosotros", label: "Nosotros" },
    { href: "/programas", label: "Programas" },
    { href: "/equipo", label: "Equipo" },
    { href: "/instalaciones", label: "Instalaciones" },
    { href: "/familia", label: "Familia" },
    { href: "/educacion", label: "Educación" },
    { href: "/contacto", label: "Contacto" },
];

const isActive = (href: string) => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/";
    return path === href || (href !== "/" && path.startsWith(href + "/"));
};

export default function SiteHeader({
    brand = "Casa Tsíntani",
    logoSrc = "/icono_logo_oscuro.svg",
    logoAlt = "Logo",
}: {
    brand?: string;
    logoSrc?: string;
    logoAlt?: string;
}) {
    const [hidden, setHidden] = useState(false);
    const [solid, setSolid] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [lang, setLang] = useState(
        typeof window !== "undefined" && /^\/en(\/|$)/.test(window.location.pathname) ? "en" : "es"
    );
    const lastY = useRef(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setSolid(y > 12);
            setHidden(y > lastY.current && y > 120);
            lastY.current = y <= 0 ? 0 : y;
            const h = document.documentElement;
            const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight) || 0;
            setProgress(scrolled);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const toggleLang = () => {
        const next = lang === "es" ? "en" : "es";
        setLang(next);
        const url = window.location.pathname.replace(/^\/(es|en)/, "");
        window.location.href = `/${next}${url}`;
    };

    return (
        <>
            {/* Barra de progreso de scroll */}
            <div
                aria-hidden
                className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand-500 transition-transform duration-200"
                style={{ transform: `scaleX(${progress})` }}
            />

            <header
                data-hidden={hidden ? "y" : "n"}
                data-solid={solid ? "y" : "n"}
                className={[
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[--ease-out-smooth]",
                    "will-change-transform",
                    "data-[hidden=y]:-translate-y-full",
                    "data-[solid=y]:bg-white/80 data-[solid=y]:backdrop-blur",
                    "data-[solid=y]:shadow-[0_8px_30px_rgb(0_0_0/0.06)]",
                    "dark:data-[solid=y]:bg-zinc-900/70",
                    "border-b border-transparent data-[solid=y]:border-zinc-200 dark:data-[solid=y]:border-zinc-700",
                ].join(" ")}
            >
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Brand con logo */}
                        <a
                            href="/"
                            className="group inline-flex items-center gap-3 rounded-xl px-1.5 py-1 text-[15px] font-semibold tracking-tight text-zinc-900 outline-none transition dark:text-white focus-visible:ring-2 focus-visible:ring-brand-500/60"
                            aria-label={brand}
                        >
                            <span
                                className={[
                                    "relative inline-grid place-content-center shrink-0",
                                    "h-14 w-14 md:h-11 md:w-11 rounded-xl",
                                    "bg-white/90 ring-1 ring-inset ring-zinc-200 shadow-sm backdrop-blur",
                                    "text-brand-600 dark:text-brand-400 dark:ring-zinc-700",
                                    "dark:bg-white/90",
                                ].join(" ")}
                            >
                                <img
                                    src={logoSrc}
                                    alt={logoAlt}
                                    className="h-12 w-12 md:h-12 md:w-12 object-contain"
                                    loading="eager"
                                    decoding="async"
                                />
                                <span className="pointer-events-none absolute -inset-1 -z-10 rounded-2xl bg-brand-500/0 blur-xl transition group-hover:bg-brand-500/10" />
                            </span>

                            <span className="relative">
                                {brand}
                                <span className="absolute -right-2 -top-1 block h-2 w-2 rounded-full bg-brand-500 opacity-80 animate-pulse" />
                            </span>
                        </a>


                        {/* Nav desktop */}
                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-1">
                                {links.map((l) => {
                                    const active = isActive(l.href);
                                    return (
                                        <li key={l.href}>
                                            <a
                                                href={l.href}
                                                aria-current={active ? "page" : undefined}
                                                className={[
                                                    "group relative block rounded-xl px-3 py-2 text-sm transition-colors",
                                                    active
                                                        ? "text-zinc-900 dark:text-white"
                                                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                                                ].join(" ")}
                                            >
                                                {l.label}
                                                <span
                                                    className={[
                                                        "pointer-events-none absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-brand-400 to-brand-600",
                                                        "transition-[opacity,transform] duration-300",
                                                        active ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100",
                                                    ].join(" ")}
                                                />
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Acciones desktop */}
                        <div className="hidden md:flex items-center gap-3">
                            <button
                                onClick={toggleLang}
                                className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                            >
                                {lang === "es" ? "ES" : "EN"}
                            </button>
                            <ThemeToggle />
                            <a
                                href="/contacto"
                                className="btn-primary shadow-soft hover:translate-y-[-2px] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                            >
                                Agendar
                            </a>
                        </div>

                        {/* Acciones móvil */}
                        <div className="md:hidden flex items-center gap-2">
                            <button
                                onClick={toggleLang}
                                className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                            >
                                {lang === "es" ? "ES" : "EN"}
                            </button>
                            <ThemeToggle />
                            <button
                                onClick={() => setMenuOpen(true)}
                                aria-label="Abrir menú"
                                className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-200 active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                            >
                                Menú
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Menú móvil */}
            <div
                className={[
                    "fixed inset-0 z-[70] md:hidden transition-[visibility,opacity] duration-300",
                    menuOpen ? "visible opacity-100" : "invisible opacity-0",
                ].join(" ")}
                role="dialog"
                aria-modal="true"
            >
                <button
                    aria-label="Cerrar menú"
                    onClick={() => setMenuOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />
                <nav
                    className={[
                        "absolute inset-x-0 top-0 origin-top rounded-b-2xl",
                        "bg-white/95 dark:bg-zinc-900/95 border-b border-zinc-200 dark:border-zinc-700",
                        "shadow-[0_32px_60px_rgba(0,0,0,0.25)]",
                        "transition-transform duration-300 ease-[--ease-out-smooth]",
                        menuOpen ? "translate-y-0" : "-translate-y-full",
                    ].join(" ")}
                >
                    <div className="px-5 pt-4 pb-3 flex items-center justify-between">
                        <a href="/" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2.5">
                            <span className="inline-grid place-content-center h-8 w-8 rounded-xl bg-white/70 ring-1 ring-inset ring-zinc-200 shadow-sm dark:bg-zinc-800/70 dark:ring-zinc-700">
                                <img src={logoSrc} alt={logoAlt} className="h-5 w-5" />
                            </span>
                            <span className="text-sm font-semibold">{brand}</span>
                        </a>
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm"
                        >
                            Cerrar
                        </button>
                    </div>

                    <ul className="px-3 pb-6 grid gap-1 [counter-reset:item]">
                        {links.map((l, i) => {
                            const active = isActive(l.href);
                            return (
                                <li
                                    key={l.href}
                                    style={{ animationDelay: `${i * 30}ms` }}
                                    className="animate-in slide-in-from-top fade-in duration-300 rounded-xl overflow-hidden"
                                >
                                    <a
                                        href={l.href}
                                        onClick={() => setMenuOpen(false)}
                                        className={[
                                            "flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-700",
                                            "bg-white/60 dark:bg-zinc-900/60 px-3 py-3 backdrop-blur",
                                            active ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300",
                                        ].join(" ")}
                                    >
                                        <span className="inline-grid place-content-center h-6 w-6 rounded-lg bg-brand-100 text-brand-700 text-xs">
                                            {i + 1}
                                        </span>
                                        <span className="text-[15px]">{l.label}</span>
                                        <span className="ml-auto text-xs text-zinc-500">→</span>
                                    </a>
                                </li>
                            );
                        })}
                        <li className="pt-2">
                            <a href="/contacto" className="btn-primary w-full justify-center">
                                Agendar
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
