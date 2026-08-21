import { type CSSProperties } from 'react'
import SEO from '../components/SEO'

export default function Nosotros() {
  return (
    <>
      <SEO titulo="Nosotros" descripcion="K+A Mármoles es la división de K+A Design especializada en la fabricación de mobiliario de mármol de extraordinaria calidad." />
      <section className="cabecera-pagina"
        style={{ '--imagen-cabecera': "url('/heroes/hero-vertical-1.jpg')", '--posicion-cabecera': 'center 32%' } as CSSProperties}>
        <div className="container">
          <span className="eyebrow">Nosotros</span>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 0', maxWidth: '18ch' }}>
            Una división de K+A Design dedicada a la piedra.
          </h2>
        </div>
      </section>
      <section className="seccion">
        <div className="container">
          <div className="prosa">
            <p>
              <strong>K+A Mármoles</strong> es, ante todo, una casa de piedra: más de 15 años
              seleccionando y trabajando mármoles nacionales e importados, granitos, canteras y
              basaltos, disponibles en láminas y parquet para proyectos de arquitectura e interiorismo.
            </p>
            <p>
              De esa experiencia nace nuestra línea de mobiliario: la expresión de atelier de la casa.
              Cada pieza parte de una losa única. Seleccionamos la piedra, estudiamos su veta y la
              transformamos en mesas, escritorios y estanterías que llevan la naturaleza al interior.
            </p>
            <p>
              Trabajamos con arquitectos, interioristas y clientes particulares en proyectos a la
              medida desde Huixquilucan, Estado de México, para toda la República.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
