import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ProductCard from '../components/ProductCard'
import MarbleSwatch from '../components/MarbleSwatch'
import { useProductos } from '../lib/useProductos'
import { urlWhatsApp } from '../components/WhatsAppButton'

const PASOS = [
  {
    numero: '01',
    titulo: 'Selección de la losa',
    texto: 'Todo comienza en el banco de mármol. Elegimos cada losa por su veta, su tono y su carácter: la piedra decide el punto de partida de la pieza.',
  },
  {
    numero: '02',
    titulo: 'Corte y fabricación',
    texto: 'Cortamos y calibramos con precisión milimétrica, respetando la dirección de la veta para que cada superficie cuente una sola historia continua.',
  },
  {
    numero: '03',
    titulo: 'Acabado artesanal',
    texto: 'Manos expertas pulen, matizan y sellan la piedra. El resultado: superficies que se sienten tan extraordinarias como se ven.',
  },
]

const MATERIALES = [
  { tono: 'blanco', nombre: 'Calacatta', seed: 7 },
  { tono: 'negro', nombre: 'Negro Marquina', seed: 11 },
  { tono: 'travertino', nombre: 'Travertino', seed: 5 },
  { tono: 'verde', nombre: 'Verde Tikal', seed: 9 },
  { tono: 'gris', nombre: 'Gris Oriental', seed: 13 },
] as const

export default function Home() {
  const { productos } = useProductos()
  const destacados = productos.filter(p => p.destacado).slice(0, 4)

  return (
    <>
      <SEO titulo="Mobiliario de mármol de diseño" descripcion="K+A Mármoles: mesas de comedor, mesas de centro, escritorios y estanterías en mármol. Fabricación de extraordinaria calidad y diseño de vanguardia." />

      <section className="hero hero-con-fondo">
        <div className="hero-fondo" aria-hidden="true" />
        <svg className="hero-veta" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M -50 780 C 250 700, 380 520, 520 460 S 820 420, 960 300 S 1250 180, 1500 120"
            fill="none" stroke="#C8A55A" strokeWidth="1.4" opacity="0.55" />
          <path d="M -50 830 C 300 760, 460 600, 610 540 S 900 480, 1040 370 S 1300 240, 1500 190"
            fill="none" stroke="#8A8A86" strokeWidth="0.8" opacity="0.35" />
        </svg>
        <div className="container hero-contenido">
          <span className="eyebrow">K+A Design · Ciudad de México</span>
          <h1>La piedra, hecha <em>mueble</em>.</h1>
          <p>
            Fabricamos mobiliario de mármol de extraordinaria calidad y diseño de vanguardia.
            Cada pieza nace de una losa única, seleccionada y trabajada por nuestros artesanos.
          </p>
          <div className="hero-acciones">
            <Link to="/coleccion" className="btn">Ver colección</Link>
            <a className="btn oro" href={urlWhatsApp('Hola K+A Mármoles, quiero cotizar una pieza.')} target="_blank" rel="noopener noreferrer">
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="container">
          <div className="seccion-cabecera">
            <div>
              <span className="eyebrow">Selección</span>
              <h2>Piezas destacadas</h2>
            </div>
            <Link to="/coleccion" className="ver-todo">Ver toda la colección</Link>
          </div>
          <div className="grid-productos">
            {destacados.map(p => <ProductCard key={p.id} producto={p} />)}
          </div>
        </div>
      </section>

      <section className="seccion proceso">
        <div className="container">
          <span className="eyebrow">El proceso</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', margin: '14px 0 56px', maxWidth: '20ch' }}>
            De la cantera a tu espacio.
          </h2>
          <ol className="proceso-pasos">
            {PASOS.map(paso => (
              <li key={paso.numero} className="proceso-paso">
                <span className="proceso-numero">{paso.numero}</span>
                <h3>{paso.titulo}</h3>
                <p>{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="interludio" aria-label="Mesa de centro giratoria en mármol">
        <blockquote>
          <p>«El mármol no se fabrica. Se descubre, y se le da forma.»</p>
          <cite>— Taller K+A</cite>
        </blockquote>
      </section>

      <section className="seccion">
        <div className="container">
          <span className="eyebrow">Materiales</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', margin: '14px 0 24px', maxWidth: '22ch' }}>
            Ninguna veta se repite. Ninguna pieza tampoco.
          </h2>
          <p className="prosa" style={{ color: 'var(--veta)', maxWidth: '58ch', marginBottom: 56 }}>
            Trabajamos Calacatta, Negro Marquina, travertinos y mármoles nacionales.
            Cada proyecto puede fabricarse a la medida: dimensiones, acabado y piedra a elección.
          </p>
          <ul className="materiales">
            {MATERIALES.map(m => (
              <li key={m.nombre} className="material">
                <div className="material-swatch">
                  <MarbleSwatch tono={m.tono} seed={m.seed} titulo={`Mármol ${m.nombre}`} />
                </div>
                <span className="material-nombre">{m.nombre}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-banda">
        <div className="container cta-banda-inner">
          <span className="eyebrow">A la medida</span>
          <h2>Cotiza tu pieza a la medida.</h2>
          <p>Cuéntanos qué imaginas: dimensiones, piedra y acabado. Te respondemos el mismo día.</p>
          <a className="btn oro" href={urlWhatsApp('Hola K+A Mármoles, quiero cotizar una pieza a la medida.')} target="_blank" rel="noopener noreferrer">
            Cotizar por WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
