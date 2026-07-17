import SEO from '../components/SEO'

export default function Nosotros() {
  return (
    <section className="seccion" style={{ paddingTop: 140 }}>
      <SEO titulo="Nosotros" descripcion="K+A Mármoles es la división de K+A Design especializada en la fabricación de mobiliario de mármol de extraordinaria calidad." />
      <div className="container">
        <span className="eyebrow">Nosotros</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 40px', maxWidth: '18ch' }}>
          Una división de K+A Design dedicada a la piedra.
        </h2>
        <div className="prosa">
          <p>
            <strong>K+A Mármoles</strong> nace como la división de K+A Design especializada en la
            fabricación de mobiliario de mármol de extraordinaria calidad y diseño de vanguardia.
          </p>
          <p>
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
  )
}
