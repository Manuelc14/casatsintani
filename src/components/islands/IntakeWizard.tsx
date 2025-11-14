import { useState } from "react";
import {
    User2,
    Users,
    HeartPulse,
    Brain,
    HelpCircle,
    PhoneCall,
    MessageCircle,
    Mail,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    ShieldCheck,
    Lock,
} from "lucide-react";

type WhoNeedsHelp = "myself" | "family";
type YesNo = "yes" | "no";
type Area = "addiction" | "mental" | "both" | "unsure";
type ContactMethod = "whatsapp" | "call" | "email";

const STEPS = [
    { id: 0, label: "¿Quién necesita ayuda?", short: "Persona" },
    { id: 1, label: "Sobre la situación", short: "Situación" },
    { id: 2, label: "Área principal", short: "Área" },
    { id: 3, label: "Datos de contacto", short: "Contacto" },
];

export default function IntakeWizard() {
    const [step, setStep] = useState(0);
    const [who, setWho] = useState<WhoNeedsHelp | null>(null);
    const [willing, setWilling] = useState<YesNo | null>(null);
    const [aware, setAware] = useState<YesNo | null>(null);
    const [okToContact, setOkToContact] = useState<YesNo | null>(null);
    const [area, setArea] = useState<Area | null>(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [contactMethod, setContactMethod] = useState<ContactMethod>("whatsapp");
    const [notes, setNotes] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const totalSteps = STEPS.length;
    const progress = ((step + 1) / totalSteps) * 100;

    const canGoNext = () => {
        if (step === 0) return who !== null;
        if (step === 1) return willing !== null && aware !== null && okToContact !== null;
        if (step === 2) return area !== null;
        if (step === 3) return name.trim() !== "" && phone.trim() !== "";
        return false;
    };

    const handleNext = () => {
        if (!canGoNext()) return;
        if (step < totalSteps - 1) {
            setStep(step + 1);
        } else {
            setSubmitted(true);
        }
    };

    const handlePrev = () => {
        if (step > 0) setStep(step - 1);
    };

    const buildWhatsAppLink = () => {
        const base = "https://wa.me/521234567890"; // <- reemplaza con el número real
        const role =
            who === "myself"
                ? "Yo necesito ayuda."
                : "Necesito ayuda para un familiar o ser querido.";
        const w =
            willing === "yes"
                ? "Está dispuesto a recibir ayuda."
                : "No estoy seguro de que esté dispuesto a recibir ayuda.";
        const a =
            aware === "yes"
                ? "Sabe que estoy buscando ayuda."
                : "No sabe que estoy buscando ayuda.";
        const ok =
            okToContact === "yes"
                ? "Está bien que lo contacten."
                : "Quiero hablar primero sobre cómo manejar el contacto.";

        let areaText = "";
        if (area === "addiction") areaText = "Principalmente adicciones.";
        else if (area === "mental") areaText = "Principalmente salud mental.";
        else if (area === "both") areaText = "Adicciones y salud mental.";
        else if (area === "unsure")
            areaText = "Aún no tengo claro si es adicción o salud mental.";

        const text = `Hola Casa Tsíntani, me gustaría iniciar el proceso de valoración.\n\n${role}\n${w}\n${a}\n${ok}\n${areaText}\n\nNombre: ${name}\nTeléfono: ${phone}\nMedio de contacto preferido: ${contactMethod}\nInformación adicional: ${notes}`;
        const encoded = encodeURIComponent(text);
        return `${base}?text=${encoded}`;
    };

    if (submitted) {
        const waHref = buildWhatsAppLink();
        return (
            <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white/90 p-7 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Gracias, ya tenemos tu información inicial. 💚
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                            Un miembro del equipo puede ayudarte a dar el siguiente paso. Puedes
                            escribirnos ahora mismo por WhatsApp o, si prefieres, esperar a que
                            nos comuniquemos contigo.
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <a
                        href={waHref}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-[#1EB656]"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Hablar por WhatsApp
                    </a>
                    <a
                        href="/contacto"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white/60 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100 dark:hover:bg-zinc-800/70"
                    >
                        <PhoneCall className="h-4 w-4" />
                        Prefiero que me llamen
                    </a>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800/70 dark:text-zinc-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Tus datos se tratan con estricta confidencialidad.
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-lg shadow-zinc-900/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-8">
            {/* Header */}
            <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500">
                    <HeartPulse className="h-5 w-5" />
                </div>
                <div className="flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
                        Proceso de ingreso
                    </p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
                        Comienza tu proceso de valoración en menos de 2 minutos.
                    </h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                        Responde estas preguntas breves para entender mejor tu situación y
                        ofrecerte la ayuda adecuada.
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800/70 dark:text-zinc-300">
                        <Lock className="h-3.5 w-3.5" />
                        Tus respuestas son confidenciales y seguras.
                    </div>
                </div>
            </div>

            {/* Step pills (desktop) */}
            <div className="mt-5 hidden items-center justify-between gap-2 rounded-2xl bg-zinc-50/80 p-2 text-[11px] text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400 sm:flex">
                {STEPS.map((s, index) => {
                    const isActive = step === index;
                    const isDone = step > index;
                    return (
                        <div
                            key={s.id}
                            className={`flex flex-1 items-center gap-2 rounded-xl px-2 py-1 transition ${isActive
                                    ? "bg-white shadow-sm shadow-zinc-200 dark:bg-zinc-900"
                                    : isDone
                                        ? "opacity-80"
                                        : "opacity-60"
                                }`}
                        >
                            <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${isDone
                                        ? "border-emerald-500 bg-emerald-500 text-white"
                                        : isActive
                                            ? "border-accent-500 bg-accent-500/10 text-accent-500"
                                            : "border-zinc-300 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800"
                                    }`}
                            >
                                {isDone ? "✓" : index + 1}
                            </div>
                            <span className="truncate font-medium">{s.short}</span>
                        </div>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-emerald-400 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Paso {step + 1} de {totalSteps}
                </p>
            </div>

            {/* Step content */}
            <div className="mt-6 space-y-5">
                {step === 0 && (
                    <>
                        <div className="flex items-center gap-2">
                            <User2 className="h-4 w-4 text-accent-500" />
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                ¿Quién necesita ayuda?
                            </p>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            Esto nos ayuda a adaptar la orientación inicial.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => setWho("myself")}
                                className={`flex flex-col items-start gap-1 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${who === "myself"
                                        ? "border-accent-500 bg-accent-500 text-white shadow-sm"
                                        : "border-zinc-300 bg-white/80 text-zinc-800 hover:border-accent-500/50 hover:bg-accent-50/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                    }`}
                            >
                                <span className="inline-flex items-center gap-2">
                                    <User2 className="h-4 w-4" />
                                    Yo
                                </span>
                                <span
                                    className={`text-xs ${who === "myself"
                                            ? "text-accent-100/90"
                                            : "text-zinc-500 dark:text-zinc-400"
                                        }`}
                                >
                                    Estoy buscando ayuda para mí.
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setWho("family")}
                                className={`flex flex-col items-start gap-1 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${who === "family"
                                        ? "border-accent-500 bg-accent-500 text-white shadow-sm"
                                        : "border-zinc-300 bg-white/80 text-zinc-800 hover:border-accent-500/50 hover:bg-accent-50/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                    }`}
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Un familiar o ser querido
                                </span>
                                <span
                                    className={`text-xs ${who === "family"
                                            ? "text-accent-100/90"
                                            : "text-zinc-500 dark:text-zinc-400"
                                        }`}
                                >
                                    Estoy apoyando a alguien cercano.
                                </span>
                            </button>
                        </div>
                    </>
                )}

                {step === 1 && (
                    <>
                        <div className="flex items-center gap-2">
                            <HelpCircle className="h-4 w-4 text-accent-500" />
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                Algunas preguntas rápidas sobre la situación.
                            </p>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-zinc-800 dark:text-zinc-100">
                                    ¿Crees que la persona estaría dispuesta a recibir ayuda si está
                                    disponible?
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <SmallChoiceButton
                                        label="Sí"
                                        active={willing === "yes"}
                                        onClick={() => setWilling("yes")}
                                    />
                                    <SmallChoiceButton
                                        label="No / No estoy seguro"
                                        active={willing === "no"}
                                        onClick={() => setWilling("no")}
                                    />
                                </div>
                            </div>

                            <div>
                                <p className="text-zinc-800 dark:text-zinc-100">
                                    ¿La persona sabe que estás buscando ayuda?
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <SmallChoiceButton
                                        label="Sí"
                                        active={aware === "yes"}
                                        onClick={() => setAware("yes")}
                                    />
                                    <SmallChoiceButton
                                        label="No"
                                        active={aware === "no"}
                                        onClick={() => setAware("no")}
                                    />
                                </div>
                            </div>

                            <div>
                                <p className="text-zinc-800 dark:text-zinc-100">
                                    ¿Está bien que nos comuniquemos directamente con la persona?
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <SmallChoiceButton
                                        label="Sí"
                                        active={okToContact === "yes"}
                                        onClick={() => setOkToContact("yes")}
                                    />
                                    <SmallChoiceButton
                                        label="Prefiero hablarlo primero"
                                        active={okToContact === "no"}
                                        onClick={() => setOkToContact("no")}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-accent-500" />
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                ¿Con qué está batallando principalmente la persona?
                            </p>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            No tienes que tener un diagnóstico, solo una idea general.
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <AreaButton
                                label="Adicciones"
                                description="Alcohol, sustancias u otras conductas compulsivas."
                                icon={<HeartPulse className="h-4 w-4" />}
                                active={area === "addiction"}
                                onClick={() => setArea("addiction")}
                            />
                            <AreaButton
                                label="Salud mental"
                                description="Ansiedad, depresión, crisis emocionales, etc."
                                icon={<Brain className="h-4 w-4" />}
                                active={area === "mental"}
                                onClick={() => setArea("mental")}
                            />
                            <AreaButton
                                label="Ambas"
                                description="Hay temas de adicción y de salud mental."
                                icon={<HeartPulse className="h-4 w-4" />}
                                active={area === "both"}
                                onClick={() => setArea("both")}
                            />
                            <AreaButton
                                label="Aún no lo sé"
                                description="Necesito orientación para entender mejor."
                                icon={<HelpCircle className="h-4 w-4" />}
                                active={area === "unsure"}
                                onClick={() => setArea("unsure")}
                            />
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="flex items-center gap-2">
                            <PhoneCall className="h-4 w-4 text-accent-500" />
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                                Datos de contacto para poder ayudarte.
                            </p>
                        </div>
                        <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                            Usaremos estos datos únicamente para responder a tu solicitud.
                        </div>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 w-full rounded-2xl border border-zinc-300 bg-white/80 px-3.5 py-2.5 text-sm text-zinc-900 outline-none ring-0 transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Teléfono o WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="mt-1 w-full rounded-2xl border border-zinc-300 bg-white/80 px-3.5 py-2.5 text-sm text-zinc-900 outline-none ring-0 transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Medio de contacto preferido
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                    <ContactChip
                                        label="WhatsApp"
                                        icon={<MessageCircle className="h-3.5 w-3.5" />}
                                        active={contactMethod === "whatsapp"}
                                        onClick={() => setContactMethod("whatsapp")}
                                    />
                                    <ContactChip
                                        label="Llamada"
                                        icon={<PhoneCall className="h-3.5 w-3.5" />}
                                        active={contactMethod === "call"}
                                        onClick={() => setContactMethod("call")}
                                    />
                                    <ContactChip
                                        label="Correo electrónico"
                                        icon={<Mail className="h-3.5 w-3.5" />}
                                        active={contactMethod === "email"}
                                        onClick={() => setContactMethod("email")}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                                    Información adicional que quieras compartir (opcional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    className="mt-1 w-full rounded-2xl border border-zinc-300 bg-white/80 px-3.5 py-2.5 text-sm text-zinc-900 outline-none ring-0 transition focus:border-accent-500 focus:ring-2 focus:ring-accent-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Navigation */}
            <div className="mt-7 flex items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={handlePrev}
                    disabled={step === 0}
                    className={`inline-flex items-center gap-1.5 rounded-2xl px-4 py-2 text-sm font-medium transition ${step === 0
                            ? "cursor-not-allowed border border-zinc-200 text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"
                            : "border border-zinc-300 bg-white/70 text-zinc-700 hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-100 dark:hover:bg-zinc-800/60"
                        }`}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext()}
                    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold text-white transition ${canGoNext()
                            ? "bg-accent-500 shadow-lg shadow-accent-500/30 hover:-translate-y-0.5 hover:brightness-110"
                            : "cursor-not-allowed bg-zinc-400"
                        }`}
                >
                    {step === totalSteps - 1 ? "Enviar" : "Siguiente"}
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

/* --- Subcomponentes pequeños para mantener limpio el componente principal --- */

type SmallChoiceButtonProps = {
    label: string;
    active: boolean;
    onClick: () => void;
};

function SmallChoiceButton({ label, active, onClick }: SmallChoiceButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${active
                    ? "border-accent-500 bg-accent-500 text-white shadow-sm"
                    : "border-zinc-300 bg-white/80 text-zinc-800 hover:border-accent-500/50 hover:bg-accent-50/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                }`}
        >
            {label}
        </button>
    );
}

type AreaButtonProps = {
    label: string;
    description: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
};

function AreaButton({ label, description, icon, active, onClick }: AreaButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex h-full flex-col items-start gap-1 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${active
                    ? "border-accent-500 bg-accent-500 text-white shadow-sm"
                    : "border-zinc-300 bg-white/80 text-zinc-800 hover:border-accent-500/50 hover:bg-accent-50/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                }`}
        >
            <span className="inline-flex items-center gap-2">
                {icon}
                {label}
            </span>
            <span
                className={`text-xs ${active ? "text-accent-100/90" : "text-zinc-500 dark:text-zinc-400"
                    }`}
            >
                {description}
            </span>
        </button>
    );
}

type ContactChipProps = {
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
};

function ContactChip({ label, icon, active, onClick }: ContactChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${active
                    ? "border-accent-500 bg-accent-500 text-white shadow-sm"
                    : "border-zinc-300 bg-white/80 text-zinc-800 hover:border-accent-500/50 hover:bg-accent-50/70 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                }`}
        >
            {icon}
            {label}
        </button>
    );
}
