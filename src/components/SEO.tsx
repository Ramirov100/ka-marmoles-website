import { useEffect } from 'react'

interface Props { titulo: string; descripcion?: string }

export default function SEO({ titulo, descripcion }: Props) {
  useEffect(() => {
    document.title = `${titulo} | K+A Mármoles`
    if (descripcion) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', descripcion)
    }
  }, [titulo, descripcion])
  return null
}
