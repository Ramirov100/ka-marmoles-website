import { useEffect, useState } from 'react'

// Visibilidad del footer compartida por los widgets flotantes de las esquinas
// (tab de newsletter, pill de cookies): ambos se retiran mientras el footer
// está a la vista y regresan al salir, con la misma transición.
export function useFooterVisible() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('.footer')
    if (!footer) return
    const observador = new IntersectionObserver(
      ([entrada]) => setVisible(entrada.isIntersecting),
      { threshold: 0 },
    )
    observador.observe(footer)
    return () => observador.disconnect()
  }, [])

  return visible
}
