import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [dark, setDark] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        setMounted(true);
        const html = document.documentElement;
        html.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setDark(!dark)}
            aria-label="Cambiar tema"
            className="p-2 rounded-xl border text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-600 grid place-items-center transition-colors"
        >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
    );
}
