export default function WhatsAppButton({ phone = "+520000000000", text = "Hola, me gustaría recibir información." }) {
    const href = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener"
            className="fixed bottom-5 left-5 rounded-full px-5 py-3 shadow-lg bg-green-500 text-white font-medium"
            aria-label="WhatsApp"
        >
            WhatsApp
        </a>
    );
}
