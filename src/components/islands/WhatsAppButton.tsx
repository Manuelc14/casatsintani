export default function WhatsAppButton({
  phone = '+520000000000',
  text = 'Hola, me gustaría recibir información.',
}) {
  const href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="fixed bottom-5 left-5 rounded-full bg-green-500 px-5 py-3 font-medium text-white shadow-lg"
      aria-label="WhatsApp"
    >
      WhatsApp
    </a>
  )
}
