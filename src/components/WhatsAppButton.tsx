// Actualizar con el número real del cliente antes de lanzar.
// La burbuja flotante se retiró en favor del tab de newsletter; este helper
// sigue alimentando los enlaces de WhatsApp en Contacto, Home y el detalle de producto.
const NUMERO = '52XXXXXXXXXX'

export function urlWhatsApp(mensaje: string) {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensaje)}`
}
