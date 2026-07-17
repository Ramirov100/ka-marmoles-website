import { ReactNode } from 'react'
import SEO from './SEO'

interface Props {
  titulo: string
  descripcion?: string
  actualizacion: string
  children: ReactNode
}

export default function PaginaLegal({ titulo, descripcion, actualizacion, children }: Props) {
  return (
    <section className="seccion" style={{ paddingTop: 140 }}>
      <SEO titulo={titulo} descripcion={descripcion} />
      <div className="container">
        <span className="eyebrow">Legal</span>
        <h1 style={{ fontSize: 'clamp(34px, 5vw, 58px)', margin: '14px 0 12px', maxWidth: '20ch' }}>
          {titulo}
        </h1>
        <p className="legal-actualizado">Última actualización: {actualizacion}</p>
        <div className="prosa prosa-legal">
          {children}
        </div>
      </div>
    </section>
  )
}
