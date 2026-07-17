// Actualizar con el número real del cliente antes de lanzar.
const NUMERO = '52XXXXXXXXXX'

export function urlWhatsApp(mensaje: string) {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensaje)}`
}

export default function WhatsAppButton() {
  return (
    <a
      className="wa-flotante"
      href={urlWhatsApp('Hola K+A Mármoles, me interesa cotizar una pieza.')}
      target="_blank" rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.66 15L2 22l5.16-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.78.8-2.98-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.13c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.16-.28.18-.53.06a6.7 6.7 0 0 1-3.35-2.93c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.16 1.73 2.64 4.2 3.7.59.26 1.05.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.57.2-1.06.15-1.17-.06-.1-.23-.16-.48-.28Z"/>
      </svg>
    </a>
  )
}
